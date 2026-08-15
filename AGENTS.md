# AGENTS.md

Guidance for AI coding agents working in the **TweakSync** Chrome extension repo.
The Constitution (`.specify/memory/constitution.md`) defines non-negotiable principles;
this file explains day-to-day organization. When they conflict, the Constitution wins.

> Agent/command catalog (the Spec Kit SDD pipeline): see [`agents.md`](agents.md).

---

## What This Project Is

TweakSync is a **Manifest V3 Chrome extension** that lets a user style any DOM element
on a live page in real time and sync those CSS changes to VS Code over a WebSocket.

- Browser surface: Chrome/Edge (extension runtime, side panel, content scripts, service worker).
- Sync surface: a WebSocket connection to a local VS Code extension.
- UI: a React 19 side panel for selecting elements and editing attributes/styles.

## Tech Stack

| Concern | Choice |
|---------|--------|
| Language | TypeScript (strict, `target: ES2020`) |
| Bundler | Vite 8 (`vite.config.ts`) |
| UI | React 19 + React Router 7 |
| Styling | Tailwind CSS 3 + `tailwindcss-animate`, Radix UI primitives |
| Extension APIs | `chrome.*` (Manifest V3): `sidePanel`, `activeTab`, `scripting`, `storage` |
| Utilities | `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react` |

**Path alias:** `@/*` → `./src/*` (configured in both `tsconfig.json` and `vite.config.ts`).
Always import with `@/...`, never relative `../../` chains.

## Commands

Run from the repo root:

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc` typecheck + production Vite build (`--sourcemap false`) |
| `npm run watch` | Development build with `--watch` |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint over `ts,tsx` with `--max-warnings 0` |

**Gate rules:**
- Builds MUST fail on type errors and on any lint warning (`--max-warnings 0`).
- TypeScript **strict mode** is on (`strict`, `noUnusedLocals`, `noUnusedParameters`).
- Keep the service worker lightweight (event-based, lazy init, bounded memory);
  throttle/debounce content-script DOM writes to avoid layout thrash.
- The manifest `version` MUST match the `package.json` version (SemVer).

After `npm run build`, the loadable extension lives in `dist/`. Output entry files:
`scripts/serviceworker.js`, `scripts/content.js`, `scripts/contentcss.js`, plus hashed UI chunks.

## Source Layout

The codebase follows a layered clean architecture. Browser APIs live **only** in
`adapters`/`extension`; `core` and `ui` stay framework-agnostic and import via `@/...`.

| Layer | Path | Responsibility |
|-------|------|----------------|
| Domain / core | `src/core` (`element`, `styling`, `language`, `sync`) | Pure domain logic + use cases. No React, no `chrome.*`. |
| Contracts | `src/ports` | TypeScript interfaces: `BrowserPort`, `MessagingPort`, `StoragePort`, `ContentScriptPort`, `SyncTransportPort`. |
| Adapters | `src/adapters/browser`, `src/adapters/memory` | Only place browser APIs are used (via `webextension-polyfill`); `memory` holds in-memory test doubles. |
| UI | `src/ui` (`components`, `pages`, `hooks`) | Platform-independent React; receives capabilities via injected ports, never calls browser APIs directly. |
| Platform scripts | `src/platform` (`dom`) | Reusable pure script modules (e.g. DOM utilities that operate on injected nodes). |
| Composition root | `src/extension` (`composition.ts`) | Wires ports → adapters and binds the side-panel / service-worker runtime. |

**CI gates (enforced by `npm run lint` and `npm test`):**
- `scripts/lint-borders.mjs` fails the build if `chrome.`/`browser.` appears outside `src/adapters` and `src/extension`.
- Vitest enforces an 80% coverage threshold on `src/core`.

## Detailed Instructions

- [Architecture & Layering](.kilo/instructions/architecture.md)
- [Code Conventions](.kilo/instructions/code-conventions.md)
- [Spec Kit Workflow](.kilo/instructions/workflow.md)
