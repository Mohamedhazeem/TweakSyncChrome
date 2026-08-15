# Architecture & Layering

TweakSync follows **Clean Architecture / SOLID** rules. Browser/extension APIs are
isolated behind ports so domain logic stays testable and platform-agnostic.

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
  ports/                   # Abstract port interfaces
  adapters/                # Concrete port implementations
    browser/               # Chrome extension adapters
    memory/                # In-memory adapters for testing
  platform/                # Platform-specific implementations (outer layer)
    dom/                   # DOM writers, scheduler, selector sheet, outline
  extension/               # React-side wiring into ports
  ui/                      # Side-panel UI abstractions
  components/              # Feature UI (side panel)
  pages/                   # Route pages
scripts/                   # Extension runtime entry points
tests/                     # Unit, integration, and fixture tests
```

## Boundaries

- `chrome.*`, DOM, and messaging access MUST stay in `src/scripts/`, `src/adapters/browser/`,
  `src/platform/dom/`, or behind injected ports/adapters.
- Business/domain logic in `src/core/`, `src/components/`, and `src/utils/` MUST NOT call
  `chrome.*` directly.
- New variation points (attribute types, style groups) MUST use the existing
  `Factory` + `facade` pattern — register a new component, don't edit core control flow.
- Cross-browser portability: keep browser-specific APIs behind a normalized abstraction;
  use feature detection, never user-agent sniffing.
