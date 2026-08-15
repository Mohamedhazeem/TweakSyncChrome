# Data Model: Refactor to Modular Clean Architecture

**Feature**: 001-refactor-clean-architecture
**Date**: 2026-08-16
**Source**: [spec.md](./spec.md) "Key Entities" + Technical Context.

This refactor introduces no user-facing data schema change; it reorganizes code into entities
that already exist conceptually. Entities below are the architectural units the plan introduces or
formalizes. All are framework-agnostic unless noted.

---

## Entity: StylingLanguageModule

Represents one styling language (CSS now; Sass/Less/Tailwind later). Self-contained, registered, not edited into core.

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Stable identifier, e.g. `"css"`. Unique in registry. |
| `label` | `string` | Human-readable name shown in UI. |
| `parse(input)` | `(raw: string) => StyleModel` | Convert raw source → normalized style model. Pure. |
| `serialize(model)` | `(model: StyleModel) => string` | Convert model → transport/editor format. Pure. |
| `validate?` | `(model) => ValidationResult` | Optional; defaults to pass. |

- **Relationships**: consumed by `StylingLanguageRegistry`; selected via UI; output routed through `SyncChannel`.
- **State**: stateless singleton per language.
- **Validation**: `id` unique; `parse`/`serialize` mandatory; must not import browser APIs.

## Entity: ElementStyleState

The set of style edits applied to a selected page element, independent of display or transport.

| Field | Type | Notes |
|---|---|---|
| `elementId` | `string` | Stable reference to the selected element. |
| `languageId` | `string` | Which `StylingLanguageModule` produced/owns the edits. |
| `rules` | `StyleRule[]` | Applied style rules (property/value pairs). |
| `updatedAt` | `number` | Monotonic timestamp for last edit. |

- **Relationships**: produced by styling engine (`core/styling`); consumed by `SyncChannel`.
- **Validation**: `rules` non-null; each rule property/value non-empty; O(1) lookup by property via `Map`.

## Entity: SyncChannel

Abstraction over the connection delivering style changes to the external editor.

| Field | Type | Notes |
|---|---|---|
| `transport` | `SyncTransportPort` | Injected port; implementation is browser/WS-specific. |
| `state` | `"idle" \| "connecting" \| "connected" \| "error"` | Connection lifecycle. |

- **State transitions**: `idle → connecting → connected → reconnecting → connected | error → idle`. An intentional `disconnect()` returns to `idle` without reconnect; an unexpected `close`/`error` enters `reconnecting`.
- **Validation**: transport injected; never references `chrome.*` directly.

## Entity: BrowserAdapter (implements BrowserPort)

Normalized abstraction over per-browser extension APIs (storage, scripting, side panel, messaging).

| Field | Type | Notes |
|---|---|---|
| `storage` | `StoragePort` | session + local get/set/remove. |
| `scripting` | `ContentScriptPort` | inject/remove content scripts. |
| `messaging` | `MessagingPort` | send/onMessage. |
| `sidePanel` | `open(panel)` | open side panel (Chromium). |

- **Relationships**: implements `BrowserPort`; the ONLY entity permitted `chrome.*`/`browser.*`.
- **Validation**: all methods promise-based via `webextension-polyfill`; no UI/core may depend on concrete adapter.

## Entity: Port (interface family, `src/ports/**`)

Platform-independent contracts consumed by `core`/`ui` and implemented by `adapters`:

- `BrowserPort`, `StoragePort`, `MessagingPort`, `ContentScriptPort`, `SyncTransportPort`.

- **Validation**: interfaces contain zero browser-specific symbols; implementations live only in `src/adapters`.
