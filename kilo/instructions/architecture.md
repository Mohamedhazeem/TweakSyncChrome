# Architecture & Source Layout

The codebase follows a layered clean architecture. Browser APIs live **only** in
`adapters`/`extension` and `platform/dom`; `core` and feature `components` stay
framework-agnostic and import via `@/...`.

## Layer Map

```
src/
  core/                    # Domain layer (no browser/extension imports)
    element/               # Element contracts, data, pathing, text
      data/                # Per-element-type data definitions
      data/aria/           # ARIA attribute definitions
    language/              # Styling language registry + CSS implementation
    styling/               # Style engine, grouping, state, handlers
      data/                # Global style lists, preset colors, property groups
      data/groups/         # Per-property-group definitions
    sync/                  # SyncService, serializeStyles, syncActions
    text/                  # Pure text utilities
  ports/                   # Abstract port interfaces (BrowserPort, MessagingPort, etc.)
  adapters/                # Concrete port implementations
    browser/               # Chrome/Edge/Firefox adapters (webextension-polyfill)
    memory/                # In-memory adapters for testing
  platform/                # Platform-specific implementations (outer layer)
    dom/                   # DOM writers, scheduler, selector sheet, outline
  extension/               # Composition root: wires ports -> adapters
  ui/                      # Side-panel UI abstractions (hooks, language selector)
  components/              # Feature UI (side panel)
    styles/                # Style editor components (grouped by CSS property)
      styleGroup/          # Per-property-group components (Text, Margin, Flex, etc.)
      styleHelperComponents/  # Reusable style inputs (Number, PopOver, etc.)
    attributes/            # Attribute editor components
    Icons/                 # Lucide icon wrappers
    ui/                    # Shared Radix-based primitives (accordion, dialog, etc.)
  pages/                   # Route pages (Home, ElementInspector, StyleInspector, etc.)
  types/                   # Shared TypeScript types (elementTypes, styleTypes, atRulesTypes)
  utils/                   # Pure utility functions (capitalize, sort, split, color utils)
  lib/                     # Small helpers (cn() via clsx + tailwind-merge)
scripts/                   # Extension runtime entry points + build helpers
tests/                     # Unit, integration, perf, and fixture tests
```

## Key Contracts and Flow

1. **User clicks element in page** -> content script (`src/extension/content.ts`) captures
   the click, extracts element details via `getElementDetails()` (core), and sends
   `{ action: "elementClicked", details }` to the side panel through `BrowserPort.messaging`.

2. **Side panel receives element** -> React pages (`ElementInspector.tsx`, `StyleInspector.tsx`)
   render the element's attributes and styles using factory/facade components.

3. **User edits a style** -> UI dispatches a message through `BrowserPort.messaging` ->
   service worker (`src/extension/serviceWorker.ts`) -> forwarded to content script ->
   `applyStyleUpdate()` in `src/platform/dom/styleWriter.ts` writes to the DOM, batched
   via `createFrameScheduler()` (rAF coalescing).

4. **User syncs to VS Code** -> `SyncService.sendStyleEdit()` serializes declarations
   via `serializeStyles.ts` -> `WebSocketSyncAdapter.send()` ships the payload over
   WebSocket with bounded queue + exponential backoff reconnection.

## Important Files

| File | Role |
|------|------|
| `src/extension/composition.ts` | Single wiring point. Creates `BrowserPort`, `WebSocketSyncAdapter`, `SyncService`. |
| `src/extension/serviceWorker.ts` | Handles commands, content-script injection, tab lifecycle, sync events -> UI toasts. |
| `src/extension/content.ts` | Click handling, element/style collection, DOM writes via platform/dom. |
| `src/adapters/browser/createBrowserPort.ts` | Wires `webextension-polyfill` into `BrowserPort`. Only place browser runtime leaks in (plus `WebSocketSyncAdapter`). |
| `src/adapters/browser/WebSocketSyncAdapter.ts` | Managed WebSocket transport: connect/reconnect with capped exponential backoff + jitter, bounded send queue with TTL, `sendRaw()` for legacy VS Code protocol. |
| `src/ports/SyncTransportPort.ts` | Abstract sync transport contract consumed by `SyncService`. |
| `src/core/sync/SyncService.ts` | Sync orchestration: validates input, serializes styles, delegates to transport. |
| `src/core/styling/styleEngine.ts` | Core style application: `applyStyleUpdates()` runs in O(updates) with O(1) Map lookups. |
| `src/core/styling/processRule.ts` | Reads CSSStyleDeclaration into ordered Map, collapses longhands into shorthands. O(d + k log k). |
| `src/core/styling/styleState.ts` | Style state factories: `createEmptyElementStyles()`, `ensureBucket()`, `ensureAtRuleBucket()`. |
| `src/core/element/elementDetails.ts` | Collects element inspector payload. O(attributes). |
| `src/core/element/types.ts` | Structural element contracts (`DetailElementLike`, `PathElementLike`, etc.). Core never imports DOM globals. |
| `src/platform/dom/styleWriter.ts` | Applies style edits: inline writes to element.style.cssText; stylesheet edits use `getCachedRules()` O(1) selector index. |
| `src/platform/dom/scheduler.ts` | `createFrameScheduler()`: batches DOM writes into a single animation frame (rAF coalescing). |
| `src/platform/dom/throttle.ts` | Debounce utility for outline updates. |
| `src/ports/BrowserPort.ts` | Abstract browser API contract (storage, scripting, messaging, sidePanel, tabs, windows, action, runtime). |

## Architecture Rules

### Dependency Rule

Source dependencies point strictly inward:
- `core` depends on `ports` (interfaces only) and `types`
- `adapters` depend on `core` and `ports`
- `extension` depends on `adapters`, `core`, `ports`
- `platform/dom` depends on `core`
- `ui`, `components`, `pages` depend on `core`, `ports`, and React

**Forbidden imports:**
- `chrome.*` / `browser.*` in `src/core/`, `src/components/`, `src/ui/`, `src/utils/`
- React in `src/core/`, `src/platform/`
- DOM globals in `src/core/` (use `DetailElementLike`, `StyleWritable`, etc.)

### Clean Architecture Enforcement

- `scripts/lint-borders.mjs` fails the build if `chrome.`/`browser.` appears outside
  `src/adapters` and `src/extension`.
- New browser features MUST be added through `BrowserPort` / new port interfaces, not
  by calling `browser.*` directly in UI or core.

### SOLID Principles

- **Single Responsibility**: Each module has exactly one reason to change.
- **Open/Closed**: New attribute types, style groups, and languages are added by
  registering through factories/facades, not editing core control flow.
- **Liskov Substitution**: Test doubles in `src/adapters/memory/` must honor the same
  contracts as browser adapters.
- **Interface Segregation**: Prefer small, focused interfaces (e.g., `StoragePort`,
  `MessagingPort` instead of one monolithic browser API).
- **Dependency Inversion**: Core depends on abstractions; concrete implementations are
  injected at the composition root (`src/extension/composition.ts`).

### Design Patterns

- **Factory + Facade**: New attribute editors (`AttributeFactory.tsx`) and style editors
  (`StyleFactory.tsx`) are registered through facades; renderers stay generic.
- **Strategy**: Styling languages (`StylingLanguageRegistry`) allow pluggable CSS/Sass/Tailwind.
- **Observer**: `onState()` / `onMessage()` callback subscriptions with unsubscribe returns.
- **Adapter**: `WebSocketSyncAdapter` adapts raw WebSocket to `SyncTransportPort`.
- **Command**: Service worker switches on `browser.runtime.onCommand` strings.
