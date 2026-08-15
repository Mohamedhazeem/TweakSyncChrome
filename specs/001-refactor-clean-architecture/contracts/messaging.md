# Contract: MessagingPort

**Layer**: `src/ports/MessagingPort.ts` (interface) — implemented by `src/adapters/browser/**`.
**Consumers**: content script ⇄ service worker ⇄ side panel communication.
**Purpose**: Normalize extension messaging so `core`/`ui` never call `chrome.runtime.sendMessage` directly.

## Interface

```ts
export interface MessagingPort {
  send(message: Message): Promise<unknown>;
  onMessage(handler: (message: Message, reply?: (r: unknown) => void) => void): () => void;
  // returns unsubscribe
}

export type Message =
  | { action: "connect" }
  | { action: "injectContentScript" }
  | { action: "removeContentScript" }
  | { action: "apply"; apply: "styles" | "element" }
  | { action: "elementClicked"; details: unknown }
  | { action: "styleClicked"; styles: unknown }
  | { action: string; [key: string]: unknown };
```

## Behavior rules

- `onMessage` MUST return an unsubscribe function to prevent listener leaks (current code leaks/duplicates listeners in `pages/*`).
- All message shapes are typed; unknown actions fall through a default branch with a clear error.
- Implementations use `webextension-polyfill` messaging; never raw `chrome.runtime.*` in consumers.

## Acceptance

- After refactor, `pages/*` and `ui` send/receive messages via injected `MessagingPort`; zero `chrome.runtime.*` references remain outside `adapters`/`extension`.
