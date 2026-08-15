# Contract: SyncTransportPort

**Layer**: `src/ports/SyncTransportPort.ts` (interface) — implemented by `src/adapters/**` (WebSocket to editor).
**Consumers**: `core/sync` orchestration use case.
**Purpose**: Hide transport (WebSocket to VS Code) from core logic (FR-002 / FR-007).

## Interface

```ts
export type ConnectionState = "idle" | "connecting" | "connected" | "error";

export interface SyncTransportPort {
  connect(): Promise<void>;
  disconnect(): void;
  send(payload: SyncPayload): Promise<void>;
  onState(cb: (s: ConnectionState) => void): () => void; // unsubscribe
  onMessage(cb: (m: SyncMessage) => void): () => void;   // unsubscribe
}

export interface SyncPayload {
  languageId: string;
  elementId: string;
  serialized: string;   // output of StylingLanguage.serialize
}
```

## Behavior rules

- `connect`/`send` return Promises; failures surface via `onState("error")` and a thrown/rejected Promise, never silent.
- Core depends only on this interface; the concrete WebSocket implementation lives in `adapters` and is injected.
- A `memory` transport double supports integration tests of the sync flow without a live editor.
- UI/toast notifications are emitted through `onState`/`onMessage` callbacks, NEVER via direct `chrome.runtime.sendMessage` inside the transport (eliminates the boundary leakage present in the legacy `src/scripts/websocket.ts`).

## Connection lifecycle, consistency & efficiency

The WebSocket adapter MUST implement a single, idempotent connection manager (replacing the legacy singleton):

- **Idempotent connect**: calling `connect()` while already `connecting`/`connected` is a no-op (returns the existing promise); a new socket is created only from `idle`/`error`/`closed`. The legacy code created duplicate sockets when called during `CONNECTING`.
- **Explicit state machine**: `idle → connecting → connected → reconnecting → connected | error → idle`. Transitions are the single source of truth for UI and send logic.
- **Consistent reconnect**: triggered by BOTH `close` (unexpected) and `error` through one path. Intentional close (`code 1000` / `disconnect()`) does NOT reconnect. The legacy code only reconnected on `error` and left `onclose` unset after the first attempt.
- **Exponential backoff with jitter**: `delay = min(base * 2^attempt, max) + random(jitter)`, capped at `maxReconnectAttempts`; counter resets on success. Avoids reconnect storms (efficiency).
- **Send queue**: outbound messages while `connecting` are buffered and flushed on `open`; if permanently down, queued messages are dropped after a bounded TTL with an `onState("error")` signal (no silent loss, no unbounded growth).
- **Liveness (heartbeat)**: optional periodic ping/pong; a missed pong closes the socket so reconnect recovers a half-dead link (efficiently detects dead connections).
- **Bounded memory**: no retained large buffers; queue size capped.

## Acceptance

- `core/sync` can be exercised end-to-end in tests using the `memory` transport; same code path drives the real WebSocket adapter in the extension.
- A unit test proves `connect()` invoked twice yields ONE socket, and an unexpected `close` triggers reconnect with increasing delay while `disconnect()` does not.
