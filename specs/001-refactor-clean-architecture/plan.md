# Implementation Plan: Refactor to Modular Clean Architecture

**Branch**: `001-refactor-clean-architecture` | **Date**: 2026-08-16 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-refactor-clean-architecture/spec.md`, refined to require platform-independent reusable component and script files.

## Summary

Refactor the TweakSync extension into a layered clean architecture where framework-agnostic
core logic, platform-independent reusable components/scripts, and browser-runtime access are
strictly separated. `chrome.*`/`browser.*` calls are confined to adapter modules; UI components
and utility/script modules are platform-independent and receive browser capabilities via injected
ports. A `StylingLanguage` registry makes new styling languages pluggable without core edits. One
source tree builds Chrome, Edge, and Firefox packages from the existing Chrome (MV3) manifest as the
reference. Performance is bounded by analyzed Big O complexity and throttled DOM writes.

## Technical Context

**Language/Version**: TypeScript 5.9 (strict, `noUnusedLocals`, `noUnusedParameters`), target ES2020.

**Primary Dependencies**:
- Runtime: React 19, React Router 7, Radix UI primitives, Tailwind CSS 3 (`@/` alias).
- Browser abstraction: `webextension-polyfill` (added) — unifies `chrome.*`/`browser.*` behind one API.
- Build: Vite 8 (existing), plus a manifest-generator script (new, Node/ESM).
- Testing (added — see research.md decision): **Vitest** + jsdom + `@testing-library/react`; ports mocked in unit tests.

**Storage**: `chrome.storage` (session + local) accessed ONLY through a `StoragePort` adapter; never referenced directly in core or UI.

**Testing**: Vitest unit/integration (jsdom, mocked ports). Acceptance = load each per-browser build and run the spec's user scenarios; no automated e2e harness in initial scope (deferred per plan).

**Target Platform**: Chromium (Chrome/Edge) MV3 and Firefox MV3 (WebExtensions). Edge reuses the Chromium manifest.

**Project Type**: Browser extension (Manifest V3).

**Performance Goals**:
- Style application / element iteration: O(n) where n = matched-element or rule count; NO nested element×rule loops (quadratic) without benchmark justification.
- In-page DOM writes: batched via `requestAnimationFrame` / throttle; single style flush per frame.
- Background service worker: event-based, lazy, bounded memory (no retained large state).
- Per-target bundle produced; tree-shaking enabled.

**Constraints**:
- Manifest V3; the existing `public/manifest.json` (Chrome) is the single reference; per-target deltas generated, not hand-duplicated.
- Any source file exceeding **400 lines** MUST be split into focused modules. The two data tables (`globalStyles.ts` ~2,732 lines, `elementSpecificAttributes.ts` ~2,131 lines) are decomposed into per-category data modules + a thin accessor (exempt from 400-line rule only as generated/segmented data, each segment < 400 lines).
- `chrome.*`/`browser.*` references permitted ONLY in `src/adapters/**` and `src/extension/**` (composition root). Violations fail CI lint rule.

**Scale/Scope**: Pages with 1,000+ elements; initial styling language = CSS; Sass/Less/Tailwind are future, enabled by the registry (not built now).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Constitution Principle | Plan Satisfies? | Evidence |
|---|---|---|
| I. Clean Architecture & Layered Boundaries | PASS | `chrome.*` confined to `src/adapters/**` + `src/extension/**`; core/UI never import browser APIs. |
| II. SOLID Design | PASS | Interfaces in `src/ports/**`; DI at composition root; OCP via registry/factory. |
| III. Design Patterns for Extensibility | PASS | `StylingLanguage` registry + factory; `BrowserPort` adapter; no core edits for new languages/browsers. |
| IV. Testability-First (NON-NEGOTIABLE) | PASS | Vitest; core unit-tested with mocked ports; coverage gate on `src/core`. |
| V. Cross-Browser Compatibility | PASS | `webextension-polyfill` + per-target manifest generation from Chrome reference. |
| Performance & Efficiency Standards | PASS | O(n) algorithms, rAF-batched DOM writes, lightweight worker, file-size budget. |
| Build & Release Processes | PASS | Single pipeline; `build:chrome|edge|firefox|all`; lint `--max-warnings 0`; SemVer; manifest version = package version. |

All gates PASS. No constitution violations; no Complexity Tracking entries required.

## Project Structure

### Documentation (this feature)

```text
specs/001-refactor-clean-architecture/
├── plan.md              # This file
├── research.md          # Phase 0 decisions
├── data-model.md        # Phase 1 entities
├── quickstart.md        # Phase 1 validation guide
├── contracts/           # Phase 1 interface contracts
│   ├── browser-port.md
│   ├── styling-language.md
│   ├── sync-transport.md
│   └── messaging.md
└── tasks.md             # Phase 2 (/speckit.tasks) — NOT created here
```

### Source Code (repository root)

```text
src/
├── core/                      # Framework-agnostic domain + use cases (NO React, NO chrome)
│   ├── element/               # Element model, path/selector, details (pure functions)
│   ├── styling/               # Style engine: apply, process rule, shorthand (pure)
│   ├── language/              # StylingLanguage interface, CssLanguage, Registry
│   └── sync/                  # Sync orchestration use case (depends on ports only)
├── ports/                     # TypeScript interfaces (platform-independent contracts)
│   ├── BrowserPort.ts
│   ├── MessagingPort.ts
│   ├── StoragePort.ts
│   ├── SyncTransportPort.ts
│   └── ContentScriptPort.ts
├── adapters/                  # ONLY place browser APIs are used (webextension-polyfill)
│   ├── browser/               # Chromium/Firefox via polyfill (chrome.* + gecko deltas)
│   └── memory/                # Test doubles / mock adapters for unit tests
├── ui/                        # Platform-independent React components (props/context only)
│   ├── components/            # Reusable presentational components (split < 400 lines)
│   ├── pages/                 # Route pages, composed from ui/components + core via hooks
│   └── hooks/                 # React bindings that adapt ports -> props (no chrome import)
├── platform/                  # Platform-independent reusable SCRIPT modules
│   └── dom/                   # Pure DOM utilities operating on injected nodes (no global document)
├── extension/                 # Composition root (entry points); wires core+adapters+ui
│   ├── serviceworker.ts
│   ├── content.ts
│   ├── contentScriptInjectAndRemove.ts
│   └── composition.ts         # DI container: binds ports -> adapters
└── types/                     # Shared TS types (unchanged location)

tests/
├── unit/                      # Vitest, core + ports + ui (mocked adapters)
├── integration/               # Port contract tests, sync flow with memory adapters
└── fixtures/                  # Sample DOM, style states, language modules
```

**Structure Decision**: Concentric clean architecture. `core` (innermost) has zero dependencies on
`ui`, `adapters`, or browser APIs. `ports` are interfaces consumed by `core` and implemented by
`adapters`. `ui` and `platform` script modules are platform-independent: they import only `core`
and `ports`, never `chrome`/`browser` or global `window`/`document`. `adapters` and `extension`
are the only layers permitted browser-API access. This directly satisfies the requirement for
**separate, reusable, platform-independent component and script files**.

### Entity → Module Naming Map

To avoid terminology drift between the spec's Key Entities and the source layout, the following mapping is authoritative:

| Spec Entity | Plan Module / Interface |
|-------------|-------------------------|
| Styling Language Module | `src/core/language/StylingLanguage` + `CssLanguage` + `StylingLanguageRegistry` |
| Element Style State | `src/core/element/*` (element model, path/selector, details) |
| Sync Channel | `src/ports/SyncTransportPort.ts` + `src/adapters/browser/WebSocketSyncAdapter.ts` |
| Browser Adapter | `src/ports/BrowserPort.ts` + `src/adapters/browser/*` (via `webextension-polyfill`) |

## Complexity Tracking

No constitution violations to justify. (Table omitted — N/A.)

## Phase 0 / 1 Workstreams (derived from spec + refinement)

1. **Boundary extraction** — Move all `chrome.*`/`browser.*` calls out of `pages/*`, `ui/components/*`,
   `scripts/*`, and `ColorStyle.tsx` into `adapters/browser/**` + `ports/**`. Add a CI lint rule forbidding `chrome.`/`browser.` outside `adapters`/`extension`.
2. **Platform-independent reusable components** — Split oversized UI (e.g., `StyleInspector.tsx` 334,
   `MultiDynamicOptions.tsx` 361, `ariaAttributes.ts` 390) into focused, reusable, prop-driven
   components under `ui/components/**`; none import browser APIs.
3. **Platform-independent reusable scripts** — Extract pure logic from `utils/**` into `core/**` and
   `platform/dom/**` (operate on injected nodes). Decompose `globalStyles.ts` and
   `elementSpecificAttributes.ts` into per-category data modules + thin accessors with O(1) map lookups.
4. **Styling-language registry** — Define `StylingLanguage` contract; implement `CssLanguage`; register
   at composition root; UI selects language via the registry (proves extensibility, FR-003/SC-002).
5. **Cross-browser build** — Adopt `webextension-polyfill`; add `scripts/build-manifest.mjs` generating
   `dist/chrome|edge|firefox/manifest.json` from the Chrome reference; add `build:chrome|edge|firefox|all`.
6. **Performance hardening** — Replace any nested element×rule loops with O(n) maps; batch DOM writes via
   rAF/throttle; keep service worker event-based.
7. **Test suite** — Stand up Vitest; unit-test `core` with memory adapters; add port-contract tests;
   enforce coverage gate on `src/core`.
8. **Managed, consistent & efficient WebSocket sync transport** — Replace legacy `src/scripts/websocket.ts`
   with `WebSocketSyncAdapter` implementing `SyncTransportPort`: idempotent `connect()` (no duplicate
   sockets), explicit state machine (`idle|connecting|connected|reconnecting|error`), single reconnect
   path on `close`/`error` with exponential backoff + jitter, bounded send queue flushed on `open`,
   optional ping/pong liveness, and UI/toast notifications via `onState`/`onMessage` (no direct `chrome.*`).
   Eliminates the existing duplicated-reconnect and boundary-leakage defects.
