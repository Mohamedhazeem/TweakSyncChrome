import type {
  ConnectionState,
  SyncMessage,
  SyncPayload,
  SyncTransportPort,
} from "../../ports/SyncTransportPort";

export class MemorySyncTransportPort implements SyncTransportPort {
  private state: ConnectionState = "idle";
  private readonly stateCallbacks = new Set<(state: ConnectionState) => void>();
  private readonly messageCallbacks = new Set<(message: SyncMessage) => void>();
  private readonly sent: SyncPayload[] = [];

  async connect(): Promise<void> {
    this.setState("connected");
  }

  disconnect(): void {
    this.setState("idle");
  }

  async send(payload: SyncPayload): Promise<void> {
    this.sent.push(payload);
  }

  onState(cb: (state: ConnectionState) => void): () => void {
    this.stateCallbacks.add(cb);
    cb(this.state);
    return () => {
      this.stateCallbacks.delete(cb);
    };
  }

  onMessage(cb: (message: SyncMessage) => void): () => void {
    this.messageCallbacks.add(cb);
    return () => {
      this.messageCallbacks.delete(cb);
    };
  }

  getSentMessages(): readonly SyncPayload[] {
    return this.sent;
  }

  emitMessage(message: SyncMessage): void {
    for (const cb of [...this.messageCallbacks]) {
      cb(message);
    }
  }

  private setState(state: ConnectionState): void {
    this.state = state;
    for (const cb of [...this.stateCallbacks]) {
      cb(state);
    }
  }
}
