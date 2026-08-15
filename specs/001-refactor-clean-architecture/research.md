# Research: Refactor to Modular Clean Architecture

**Feature**: 001-refactor-clean-architecture
**Date**: 2026-08-16
**Purpose**: Resolve every NEEDS CLARIFICATION in the plan's Technical Context and record the decisions that the design depends on.

---

## R1. Test framework (resolved: no existing suite)

- **Decision**: Adopt **Vitest** with `jsdom` for unit/integration tests, plus `@testing-library/react` for UI tests. Browser APIs are replaced by in-repo `memory` adapters implementing the same ports.
- **Rationale**: The repo (`package.json`) has no test script or framework. Vitest runs natively with Vite/ESM/TS (no extra transpile config), is fast, and supports mocking ports so `core` is tested fully isolated from the browser — directly satisfying Constitution principle IV (Testability-First).
- **Alternatives considered**: Jest (heavier ESM/Vite integration friction); Playwright/web-ext-runner (e2e only, slower, deferred to a later phase). E2e per-browser load is kept as manual acceptance (SC-003), not automated in initial scope.

## R2. Cross-browser strategy (resolved: polyfill + manifest deltas)

- **Decision**: Standardize on **`webextension-polyfill`** (`browser.*`) for all extension APIs, and generate per-target manifests from the existing Chrome `public/manifest.json` via a `scripts/build-manifest.mjs` script.
  - `dist/chrome/manifest.json` = Chrome reference, unchanged (MV3 `service_worker`).
  - `dist/edge/manifest.json` = Chromium manifest (Edge is Chromium; reuse Chrome manifest).
  - `dist/firefox/manifest.json` = Chrome manifest + `browser_specific_settings.gecko` (id) + ensure MV3 background shape Firefox supports.
- **Rationale**: One source, one API surface; per-browser differences are data (manifest deltas), not duplicated code (Constitution principle V + FR-004). The Chrome manifest remains the single reference, as required.
- **Alternatives considered**: Hand-maintained three manifests (duplication risk, rejected); `chrome.*` + per-browser conditional code (leaks browser specifics into core, rejected).

## R3. Large-file / modularity threshold (resolved: 400-line budget + data segmentation)

- **Decision**: Enforce a **400-line maximum** per source file. The two oversized data tables are decomposed:
  - `globalStyles.ts` (~2,732 lines) → `core/styling/data/<category>.ts` segments (each < 400 lines) + a thin `globalStyles.ts` accessor using an O(1) `Map`.
  - `elementSpecificAttributes.ts` (~2,131 lines) → `core/element/data/<category>.ts` segments + a thin accessor.
- **Rationale**: Concrete, measurable threshold makes SC-004 ("no source file exceeds a defined threshold") enforceable and removes ambiguity.

## R4. Styling-language extensibility mechanism (resolved: registry + interface)

- **Decision**: Define a `StylingLanguage` interface (`id`, `label`, `parse`, `serialize`, optional `validate`) and a `StylingLanguageRegistry`. `CssLanguage` is the initial implementation. New languages are added by implementing the interface and registering at the composition root — no core edits.
- **Rationale**: Open/Closed (Constitution II) + extensibility pattern (Constitution III); directly demonstrates FR-003/SC-002.

## R5. Performance / Big O guardrails (resolved: O(n) + batching)

- **Decision**: Forbid nested element×rule iteration (O(n·m)) without a benchmark justification. Use `Map`-keyed lookups (O(1)) for style property resolution. Batch all content-script DOM mutations into a single `requestAnimationFrame` flush (throttle). Service worker stays event-based with no retained large state.
- **Rationale**: Satisfies FR-006/FR-008 and SC-005; keeps cost linear in matched-element/rule counts.

## R6. WebSocket connection consistency & efficiency (resolved: managed connection adapter)

- **Decision**: Replace the legacy `src/scripts/websocket.ts` singleton (module-level mutable `ws`, duplicated reconnect paths, `onclose` unset after the first attempt, no send queue, direct `chrome.runtime.sendMessage` for toasts) with a `WebSocketSyncAdapter` implementing `SyncTransportPort`. It uses an explicit state machine (`idle|connecting|connected|reconnecting|error`), idempotent `connect()` (no duplicate sockets), reconnect on both `close`/`error` via a single path with exponential backoff + jitter, a bounded send queue flushed on open, and optional ping/poll liveness. All UI/toast notifications flow through `onState`/`onMessage`, never direct `chrome.*`.
- **Rationale**: Makes the connection consistent (one lifecycle, predictable reconnect) and efficient (backoff avoids storms, queue avoids lost updates, heartbeat reclaims dead links); satisfies Constitution I (no `chrome.*` in transport) and IV (testable via `memory` adapter).
- **Alternatives considered**: Patching the existing singleton — rejected because global mutable state is untestable and the dual reconnect paths are inherently inconsistent.

## Open items intentionally deferred to /speckit.tasks (not blocking design)

- Concrete numeric coverage threshold set to **80% on `src/core`** (resolves SC-006 "for example 80%").
- Automated e2e harness for the three browsers (kept as manual acceptance in initial scope).
