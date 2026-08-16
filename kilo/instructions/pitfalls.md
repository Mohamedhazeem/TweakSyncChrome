# Common Pitfalls

- **Do not** import `chrome.*` or `browser.*` in `src/core/`, `src/components/`, or `src/ui/`.
- **Do not** create relative import paths like `../../../core/...`. Use `@/core/...`.
- **Do not** add new language or style group logic inside `StyleInspector.tsx` or
  `ElementInspector.tsx`. Register through the factory/facade instead.
- **Do not** write DOM mutations directly in `src/extension/content.ts` without routing
  through `src/platform/dom/` helpers (they handle scheduling and caching).
- **Do not** forget to dispose listeners returned by `onState()` / `onMessage()` in
  React effects or cleanup functions.
