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

## Detailed Instructions

- [Architecture & Layering](.kilo/instructions/architecture.md)
- [Code Conventions](.kilo/instructions/code-conventions.md)
- [Spec Kit Workflow](.kilo/instructions/workflow.md)
