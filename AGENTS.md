# AGENTS.md

TweakSync is a Manifest V3 Chrome extension that styles any live DOM element in real time and syncs CSS changes to VS Code over a WebSocket.

The Constitution (`.specify/memory/constitution.md`) defines non-negotiable principles;
when they conflict, the Constitution wins.

## Commands

| Command                 | Purpose                                   |
| ----------------------- | ----------------------------------------- |
| `npm run dev`           | Vite dev server                           |
| `npm run build`         | `tsc` + production Vite build             |
| `npm run watch`         | Development build with `--watch`          |
| `npm run preview`       | Preview production build                  |
| `npm run lint`          | ESLint + border check, `--max-warnings 0` |
| `npm run test`          | Vitest unit + integration tests           |
| `npm run test:coverage` | Vitest with V8 coverage                   |

Cross-browser: `npm run build:chrome`, `npm run build:edge`, `npm run build:firefox`, `npm run build:all`.

## Detailed Instructions

- [Architecture & Source Layout](kilo/instructions/architecture.md)
- [Coding Conventions](kilo/instructions/code-style.md)
- [Testing & Coverage](kilo/instructions/testing.md)
- [CI Gates](kilo/instructions/ci-gates.md)
- [Common Pitfalls](kilo/instructions/pitfalls.md)
- [Constitution](.specify/memory/constitution.md)
