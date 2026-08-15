# Contract: BrowserPort

**Layer**: `src/ports/BrowserPort.ts` (interface) — implemented in `src/adapters/browser/**`.
**Consumers**: `core`, `ui` (via hooks), `extension` composition root.
**Rule**: The ONLY browser-API-bearing surface. All `chrome.*`/`browser.*` calls live behind this.

## Interface (TypeScript, platform-independent)

```ts
export interface BrowserPort {
  storage: StoragePort;
  scripting: ContentScriptPort;
  messaging: MessagingPort;
  sidePanel: { open(tabId?: number): Promise<void> };
  runtime: {
    getManifest(): Manifest;
    onCommand(cb: (command: string) => void): () => void; // returns unsubscribe
    onConnect(cb: (port: Connection) => void): () => void;
  };
}
```

## Behavior rules

- Every method returns a `Promise` (polyfill-normalized) — never a callback-only Chrome signature in consumer code.
- Implementations MUST use `webextension-polyfill` (`browser.*`), not raw `chrome.*`.
- `onCommand`/`onConnect` MUST return an unsubscribe function (avoids leak; enables clean teardown in tests).
- No method may be called directly from `core`/`ui`; only via injected `BrowserPort`.

## Acceptance

- A `memory` implementation (test double) satisfies the same interface and is used in unit/integration tests.
- Lint forbids `chrome.`/`browser.` outside `src/adapters/**` and `src/extension/**`.
