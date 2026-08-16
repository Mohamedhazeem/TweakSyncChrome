# Coding Conventions

## Imports

- Always use the `@/` path alias (`@/core/...`, `@/adapters/...`). Never use relative `../../` chains.
- One import group per file: external packages first, then `@/` imports.

## TypeScript

- Strict mode: `strict`, `noUnusedLocals`, `noUnusedParameters` are all on.
- Types must be explicit at module boundaries; avoid `any`.
- Use `readonly` for data that should not mutate after creation.

## Components

- Function components only; colocate small components with their feature.
- Use Tailwind utility classes via the `cn()` helper in `src/lib/utils.ts`.
- New UI primitives go in `src/components/ui/` (Radix-based).
- Feature-specific components live in `src/components/` (e.g., `styles/`, `attributes/`).

## Factories and Extensibility

- Add new attribute editors through `AttributeFactory.tsx` + `attributeFacade.ts`.
- Add new style property groups through `StyleFactory.tsx` + `styleFacade.ts`.
- Never branch inside existing renderers to support a new type.

## Layering

- Domain types and rules belong in `src/core/`.
- Never place browser/extension imports inside `src/core/` or feature `components/`.
- Use `src/ports/` interfaces and `src/adapters/` implementations instead.

## Performance

- Algorithms over user-driven input MUST be analyzed for Big O complexity.
- Quadratic-or-worse behavior on matched-element counts or synced rule sets MUST be
  avoided or justified with benchmarks.
- Content-script DOM writes MUST be throttled/debounced and batched via
  `createFrameScheduler()` to avoid layout thrash.
- Service worker MUST stay lightweight: event-based, lazy init, bounded memory.

## Naming

- Files: `camelCase.ts` / `PascalCase.tsx`
- Types/interfaces: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Functions: `camelCase`
- React components: `PascalCase`
