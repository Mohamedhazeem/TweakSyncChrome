# Code Conventions

## Imports
- Prefer the `@/` alias; one import group per file (external, then `@/`).

## Components
- Function components only; colocate small components with their feature.

## Styling
- Tailwind utility classes via the `cn()` helper in `src/lib/utils.ts`.

## Factories
- Add new attribute/style editors through the Factory + facade pattern,
  not by branching in existing renderers.

## Layering
- Domain types and rules belong in `src/core/`.
- Never place browser/extension imports inside `src/core/` or feature `components/`.
- Use `src/ports/` interfaces and `src/adapters/` implementations instead.

## Secrets
- Never hardcode tokens/keys; VS Code sync uses a local WebSocket.
