import type { ConnectionState, SyncMessage, SyncPayload } from "@/ports/SyncTransportPort";

export interface SocketLike {
  onopen: (() => void) | null;
  onclose: ((event: { code?: number; reason?: string }) => void) | null;
  onmessage: ((event: { data: unknown }) => void) | null;
  onerror: ((event: unknown) => void) | null;
  send(data: string): void;
  close(code?: number, reason?: string): void;
  readonly readyState: number;
}

export type SocketCtor = (url: string) => SocketLike;

export const SOCKET_STATES = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
} as const;

export interface WebSocketSyncAdapterOptions {
  url: string;
  createSocket?: SocketCtor;
  baseDelayMs?: number;
  maxDelayMs?: number;
  jitterMs?: number;
  maxReconnectAttempts?: number;
  random?: () => number;
  queueLimit?: number;
  queueTtlMs?: number;
  now?: () => number;
}

interface QueuedMessage {
  payload: unknown;
  queuedAt: number;
}

/**
 * `SyncTransportPort` backed by a WebSocket.
 *
 * The socket is injected via `createSocket` so the adapter is testable without
 * a real network. Outbound payloads are queued while disconnected (bounded and
 * TTL-scanned) and flushed on (re)connection. Reconnection uses capped
 * exponential backoff with jitter before reporting an `error` state.
 */
export class WebSocketSyncAdapter {
  private socket: SocketLike | null = null;
  private state: ConnectionState = "idle";
  private readonly stateListeners = new Set<(state: ConnectionState) => void>();
  private readonly messageListeners = new Set<(message: SyncMessage) => void>();
  private readonly queue: QueuedMessage[] = [];
  private reconnectAttempts = 0;
  private inFlight: Promise<void> | null = null;
  private closedByUser = false;
  private backoffTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private readonly options: WebSocketSyncAdapterOptions) {}

  private get url(): string {
    return this.options.url;
  }

  private get createSocket(): SocketCtor {
    return (
      this.options.createSocket ??
      ((u) => new WebSocket(u) as unknown as SocketLike)
    );
  }

  private setState(state: ConnectionState): void {
    this.state = state;
    for (const listener of this.stateListeners) {
      listener(state);
    }
  }

  connect(): Promise<void> {
    if (this.inFlight) {
      return this.inFlight;
    }
    this.closedByUser = false;
    this.inFlight = this.openSocket();
    return this.inFlight;
  }

  private openSocket(): Promise<void> {
    this.setState(this.reconnectAttempts === 0 ? "connecting" : "reconnecting");

    return new Promise<void>((resolve) => {
      const socket = this.createSocket(this.url);
      this.socket = socket;

      socket.onopen = () => {
        this.reconnectAttempts = 0;
        this.setState("connected");
        this.flushQueue();
        resolve();
      };

      socket.onclose = () => {
        socket.onopen = null;
        socket.onclose = null;
        socket.onmessage = null;
        socket.onerror = null;
        this.socket = null;

        if (this.closedByUser) {
          this.finish("idle");
          return;
        }

        if (this.reconnectAttempts >= (this.options.maxReconnectAttempts ?? 5)) {
          this.finish("error");
          return;
        }

        const attempt = this.reconnectAttempts;
        this.reconnectAttempts += 1;
        this.setState("reconnecting");
        this.scheduleReconnect(attempt, resolve);
      };

      socket.onmessage = (event) => {
        let parsed: unknown;
        try {
          parsed = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        } catch {
          parsed = null;
        }
        if (parsed !== null) {
          for (const listener of this.messageListeners) {
            listener(parsed as SyncMessage);
          }
        }
      };

      socket.onerror = () => {
        this.setState("error");
      };
    });
  }

  private scheduleReconnect(attempt: number, resolve: () => void): void {
    const base = this.options.baseDelayMs ?? 1000;
    const max = this.options.maxDelayMs ?? 30000;
    const jitter = this.options.jitterMs ?? 0;
    const random = this.options.random ?? Math.random;

    const capped = Math.min(base * 2 ** attempt, max);
    const delay = capped + random() * jitter;

    this.backoffTimer = setTimeout(() => {
      this.backoffTimer = null;
      void this.openSocket().then(() => resolve());
    }, delay);
  }

  private finish(state: ConnectionState): void {
    this.inFlight = null;
    this.setState(state);
  }

  disconnect(): void {
    this.closedByUser = true;
    if (this.backoffTimer !== null) {
      clearTimeout(this.backoffTimer);
      this.backoffTimer = null;
    }
    if (this.socket) {
      this.socket.close(1000);
      this.socket = null;
    }
    this.finish("idle");
  }

  private flushQueue(): void {
    if (!this.socket || this.socket.readyState !== SOCKET_STATES.OPEN) {
      return;
    }

    const now = this.options.now ? this.options.now() : Date.now();
    const ttl = this.options.queueTtlMs;

    const survivors: QueuedMessage[] = [];
    let dropped = false;
    for (const item of this.queue) {
      if (ttl !== undefined && now - item.queuedAt > ttl) {
        dropped = true;
      } else {
        survivors.push(item);
      }
    }

    this.queue.length = 0;

    if (dropped) {
      this.setState("error");
    }

    for (const item of survivors) {
      this.socket.send(JSON.stringify(item.payload));
    }
  }

  async send(payload: SyncPayload): Promise<void> {
    if (this.socket && this.socket.readyState === SOCKET_STATES.OPEN) {
      this.socket.send(JSON.stringify(payload));
      return;
    }

    const now = this.options.now ? this.options.now() : Date.now();
    if (this.queue.length >= (this.options.queueLimit ?? 1000)) {
      this.queue.shift();
    }
    this.queue.push({ payload, queuedAt: now });
  }

  /**
   * Sends an already-serialisable message object through the managed socket.
   *
   * Used by the service worker to forward the legacy VS Code wire protocol
   * (`{ action, styles | details }`) without changing the clean `SyncPayload`
   * contract used by `SyncService`. Queued while disconnected, flushed on open.
   */
  async sendRaw(message: unknown): Promise<void> {
    if (this.socket && this.socket.readyState === SOCKET_STATES.OPEN) {
      this.socket.send(JSON.stringify(message));
      return;
    }

    const now = this.options.now ? this.options.now() : Date.now();
    if (this.queue.length >= (this.options.queueLimit ?? 1000)) {
      this.queue.shift();
    }
    this.queue.push({ payload: message, queuedAt: now });
  }

  onState(cb: (state: ConnectionState) => void): () => void {
    this.stateListeners.add(cb);
    cb(this.state);
    return () => {
      this.stateListeners.delete(cb);
    };
  }

  onMessage(cb: (message: SyncMessage) => void): () => void {
    this.messageListeners.add(cb);
    return () => {
      this.messageListeners.delete(cb);
    };
  }

  getState(): ConnectionState {
    return this.state;
  }
}
