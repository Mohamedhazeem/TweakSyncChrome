# Contract: StylingLanguage

**Layer**: `src/core/language/StylingLanguage.ts` (interface) + `StylingLanguageRegistry.ts`.
**Consumers**: styling engine (`core/styling`), UI language selector.
**Purpose**: Makes new styling languages pluggable with ZERO core edits (FR-003 / SC-002).

## Interface

```ts
export interface StyleModel {
  languageId: string;
  rules: StyleRule[];          // normalized property/value pairs
  metadata?: Record<string, unknown>;
}

export interface StylingLanguage {
  readonly id: string;          // stable, unique in registry
  readonly label: string;       // shown in UI
  parse(raw: string): StyleModel;
  serialize(model: StyleModel): string;   // editor/sync transport format
  validate?(model: StyleModel): { ok: boolean; errors?: string[] };
}

export interface StylingLanguageRegistry {
  register(lang: StylingLanguage): void;
  get(id: string): StylingLanguage | undefined;
  list(): StylingLanguage[];
  // O(1) lookup by id
}
```

## Behavior rules

- `parse`/`serialize` MUST be pure (no DOM, no browser APIs, deterministic).
- `id` MUST be unique; duplicate `register` throws.
- Lookup is O(1) via `Map<id, StylingLanguage>`.
- New languages are registered ONLY at the composition root (`src/extension/composition.ts`); core code references the registry interface, never a concrete language.

## Acceptance

- Adding a sample language (e.g., a `JsonLanguage` stub) requires implementing the interface + one `registry.register(...)` line, with no change to `core/styling`, `ui`, or adapters.
