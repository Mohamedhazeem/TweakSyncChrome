import { beforeEach, describe, expect, it, vi } from "vitest";
import { WebSocketSyncAdapter } from "@/adapters/browser/WebSocketSyncAdapter";
import type { ConnectionState } from "@/ports/SyncTransportPort";
import type { SocketLike } from "@/adapters/browser/WebSocketSyncAdapter";

class FakeSocket implements SocketLike {
  static instances: FakeSocket[] = [];

  readyState = 0;
  sent: string[] = [];
  closed: { code?: number } | null = null;
  onopen: (() => void) | null = null;
  onclose: ((event: { code?: number }) => void) | null = null;
  onerror: (() => void) | null = null;
  onmessage: ((event: { data: string }) => void) | null = null;

  constructor(readonly url: string) {
    FakeSocket.instances.push(this);
  }

  send(data: string): void {
    this.sent.push(data);
  }

  close(code?: number): void {
    this.closed = { code };
    this.readyState = 3;
  }

  open(): void {
    this.readyState = 1;
    this.onopen?.();
  }

  fail(): void {
    this.onerror?.();
  }

  drop(code = 1006): void {
    this.readyState = 3;
    this.onclose?.({ code });
  }

  receive(payload: unknown): void {
    this.onmessage?.({ data: JSON.stringify(payload) });
  }
}

function createAdapter(overrides: Record<string, unknown> = {}) {
  return new WebSocketSyncAdapter({
    url: "ws://127.0.0.1:16016",
    createSocket: (url: string) => new FakeSocket(url),
    baseDelayMs: 100,
    maxDelayMs: 5000,
    jitterMs: 0,
    maxReconnectAttempts: 5,
    random: () => 0,
    ...overrides,
  });
}

beforeEach(() => {
  FakeSocket.instances = [];
  vi.useFakeTimers();
});

describe("WebSocketSyncAdapter connection lifecycle", () => {
  it("creates only ONE socket when connect() is called twice", async () => {
    const adapter = createAdapter();

    const first = adapter.connect();
    const second = adapter.connect();

    expect(FakeSocket.instances).toHaveLength(1);

    FakeSocket.instances[0].open();
    await expect(first).resolves.toBeUndefined();
    await expect(second).resolves.toBeUndefined();
    expect(FakeSocket.instances).toHaveLength(1);

    await adapter.connect();
    expect(FakeSocket.instances).toHaveLength(1);
  });

  it("publishes the state machine transitions", async () => {
    const adapter = createAdapter();
    const states: ConnectionState[] = [];
    adapter.onState((state) => states.push(state));

    const connecting = adapter.connect();
    FakeSocket.instances[0].open();
    await connecting;

    expect(states).toEqual(["idle", "connecting", "connected"]);
  });

  it("reconnects on an unexpected close with increasing backoff", async () => {
    const adapter = createAdapter();
    const states: ConnectionState[] = [];
    adapter.onState((state) => states.push(state));

    const connecting = adapter.connect();
    FakeSocket.instances[0].open();
    await connecting;

    FakeSocket.instances[0].drop();
    expect(states).toContain("reconnecting");
    expect(FakeSocket.instances).toHaveLength(1);

    vi.advanceTimersByTime(99);
    expect(FakeSocket.instances).toHaveLength(1);
    vi.advanceTimersByTime(1);
    expect(FakeSocket.instances).toHaveLength(2);

    FakeSocket.instances[1].drop();
    vi.advanceTimersByTime(199);
    expect(FakeSocket.instances).toHaveLength(2);
    vi.advanceTimersByTime(1);
    expect(FakeSocket.instances).toHaveLength(3);
  });

  it("uses one reconnect path for close and error", async () => {
    const adapter = createAdapter();
    const connecting = adapter.connect();
    FakeSocket.instances[0].open();
    await connecting;

    FakeSocket.instances[0].fail();
    FakeSocket.instances[0].drop();

    vi.advanceTimersByTime(1000);
    expect(FakeSocket.instances).toHaveLength(2);
  });

  it("gives up after maxReconnectAttempts and reports an error state", async () => {
    const adapter = createAdapter({ maxReconnectAttempts: 2 });
    const states: ConnectionState[] = [];
    adapter.onState((state) => states.push(state));

    const connecting = adapter.connect();
    FakeSocket.instances[0].open();
    await connecting;

    FakeSocket.instances[0].drop();
    vi.advanceTimersByTime(100);
    FakeSocket.instances[1].drop();
    vi.advanceTimersByTime(200);
    FakeSocket.instances[2].drop();
    vi.advanceTimersByTime(10000);

    expect(FakeSocket.instances).toHaveLength(3);
    expect(states).toContain("error");
  });

  it("does NOT reconnect after an intentional disconnect()", async () => {
    const adapter = createAdapter();
    const connecting = adapter.connect();
    FakeSocket.instances[0].open();
    await connecting;

    adapter.disconnect();
    expect(FakeSocket.instances[0].closed?.code).toBe(1000);

    vi.advanceTimersByTime(10000);
    expect(FakeSocket.instances).toHaveLength(1);
    expect(adapter.getState()).toBe("idle");
  });

  it("resets the backoff counter after a successful reconnect", async () => {
    const adapter = createAdapter();
    const connecting = adapter.connect();
    FakeSocket.instances[0].open();
    await connecting;

    FakeSocket.instances[0].drop();
    vi.advanceTimersByTime(100);
    FakeSocket.instances[1].open();

    FakeSocket.instances[1].drop();
    vi.advanceTimersByTime(100);
    expect(FakeSocket.instances).toHaveLength(3);
  });
});

describe("WebSocketSyncAdapter send queue", () => {
  it("buffers messages sent while connecting and flushes them on open", async () => {
    const adapter = createAdapter();
    const connecting = adapter.connect();

    await adapter.send({ languageId: "css", elementId: "a1", serialized: "color: red;" });
    expect(FakeSocket.instances[0].sent).toHaveLength(0);

    FakeSocket.instances[0].open();
    await connecting;

    expect(FakeSocket.instances[0].sent).toHaveLength(1);
    expect(JSON.parse(FakeSocket.instances[0].sent[0])).toMatchObject({
      elementId: "a1",
      serialized: "color: red;",
    });
  });

  it("sends immediately when connected", async () => {
    const adapter = createAdapter();
    const connecting = adapter.connect();
    FakeSocket.instances[0].open();
    await connecting;

    await adapter.send({ languageId: "css", elementId: "a1", serialized: "color: red;" });
    expect(FakeSocket.instances[0].sent).toHaveLength(1);
  });

  it("caps the queue so memory stays bounded", async () => {
    const adapter = createAdapter({ queueLimit: 2 });
    const connecting = adapter.connect();

    await adapter.send({ languageId: "css", elementId: "1", serialized: "a" });
    await adapter.send({ languageId: "css", elementId: "2", serialized: "b" });
    await adapter.send({ languageId: "css", elementId: "3", serialized: "c" });

    FakeSocket.instances[0].open();
    await connecting;

    expect(FakeSocket.instances[0].sent).toHaveLength(2);
    expect(JSON.parse(FakeSocket.instances[0].sent[0])).toMatchObject({ elementId: "2" });
  });

  it("drops queued messages past their TTL and reports an error", async () => {
    const clock = { value: 0 };
    const adapter = createAdapter({ queueTtlMs: 500, now: () => clock.value });
    const states: ConnectionState[] = [];
    adapter.onState((state) => states.push(state));

    const connecting = adapter.connect();
    await adapter.send({ languageId: "css", elementId: "1", serialized: "a" });

    clock.value = 1000;
    FakeSocket.instances[0].open();
    await connecting;

    expect(FakeSocket.instances[0].sent).toHaveLength(0);
    expect(states).toContain("error");
  });
});

describe("WebSocketSyncAdapter notifications", () => {
  it("forwards socket messages through onMessage without touching browser APIs", async () => {
    const adapter = createAdapter();
    const received: unknown[] = [];
    adapter.onMessage((message) => received.push(message));

    const connecting = adapter.connect();
    FakeSocket.instances[0].open();
    await connecting;

    FakeSocket.instances[0].receive({ action: "appliedStyleSucessfully", message: "done" });

    expect(received).toEqual([{ action: "appliedStyleSucessfully", message: "done" }]);
  });

  it("unsubscribes listeners", async () => {
    const adapter = createAdapter();
    const states: ConnectionState[] = [];
    const unsubscribe = adapter.onState((state) => states.push(state));
    states.length = 0;
    unsubscribe();

    const connecting = adapter.connect();
    FakeSocket.instances[0].open();
    await connecting;

    expect(states).toEqual([]);
  });

  it("ignores malformed socket payloads", async () => {
    const adapter = createAdapter();
    const received: unknown[] = [];
    adapter.onMessage((message) => received.push(message));

    const connecting = adapter.connect();
    FakeSocket.instances[0].open();
    await connecting;

    FakeSocket.instances[0].onmessage?.({ data: "{not json" });

    expect(received).toEqual([]);
  });
});
