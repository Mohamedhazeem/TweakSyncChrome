# AGENTS.md

Guidance for AI coding agents working in the **TweakSync** Chrome extension repo.
This file is the "runtime development guidance" companion referenced by the project
Constitution (`.specify/memory/constitution.md`). The Constitution defines the
**non-negotiable** principles; this file explains how the codebase is actually
organized and how to work in it day to day. When they conflict, the Constitution wins.

> Agent/command catalog (the Spec Kit SDD pipeline): see [`agents.md`](agents.md).

---

## 1. What This Project Is

TweakSync is a **Manifest V3 Chrome extension** that lets a user style any DOM element
on a live page in real time and sync those CSS changes to VS Code over a WebSocket.

- Browser surface: Chrome/Edge (extension runtime, side panel, content scripts, service worker).
- Sync surface: a WebSocket connection to a local VS Code extension.
- UI: a React 19 side panel for selecting elements and editing attributes/styles.

---

## 2. Tech Stack

| Concern | Choice |
|---------|--------|
| Language | TypeScript (strict, `target: ES2020`) |
| Bundler | Vite 8 (`vite.config.ts`) |
| UI | React 19 + React Router 7 |
| Styling | Tailwind CSS 3 + `tailwindcss-animate`, Radix UI primitives |
| Components | `shadcn`-style UI in `src/components/ui` (see `components.json`) |
| Extension APIs | `chrome.*` (Manifest V3): `sidePanel`, `activeTab`, `scripting`, `storage` |
| Utilities | `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react` |

**Path alias:** `@/*` → `./src/*` (configured in both `tsconfig.json` and `vite.config.ts`).
Always import with `@/...`, never relative `../../` chains.

---

## 3. Architecture & Layering

Follow the Constitution's **Clean Architecture / SOLID** rules. Concrete layout:

```
src/
  scripts/                 # Extension runtime entry points (outer layer)
    serviceworker.ts       # MV3 service worker: commands, WebSocket, messaging
    content.ts             # Content script injected into the host page
    contentScriptInjectAndRemove.ts
    websocket.ts           # VS Code sync transport
    UpdateElementOutlineAtContent.ts
    content.css            # Injected content-script styles
  components/              # React UI (side panel)
    attributes/            # Element attribute editing (Factory + components)
    styles/                # CSS style editing (Factory + grouped properties)
    ui/                    # Shared primitives (button, dialog, popover, ...)
    Icons/                 # Inline SVG icons
  pages/                   # Route pages (Home, ElementInspector, StyleInspector, ...)
  lib/utils.ts             # `cn()` className helper
  types/                   # Shared TS types (attributes, styles, elements, ...)
  utils/                   # Domain helpers (attributes, styles, element context)
  main.tsx, main.css       # React entry + global styles
public/manifest.json       # MV3 manifest (copied to dist/)
```

**Boundaries (enforced by Constitution):**
- `chrome.*`, DOM, and messaging access MUST stay in `src/scripts/*` or behind injected
  ports/adapters — business/domain logic in `components/` and `utils/` MUST NOT call
  `chrome.*` directly.
- New variation points (attribute types, style groups) MUST use the existing
  `Factory` + `facade` pattern (e.g. `AttributeFactory`, `StyleFactory`) — register a
  new component, don't edit core control flow.
- Cross-browser portability: keep browser-specific APIs behind a normalized abstraction;
  use feature detection, never user-agent sniffing.

---

## 4. Build, Dev & Quality Commands

Run from the repo root:

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev server (also enables `vite-plugin-inspect` → `.vite-inspect`) |
| `npm run build` | `tsc` typecheck + production Vite build (`--sourcemap false`) |
| `npm run watch` | Development build with `--watch` |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint over `ts,tsx` with `--max-warnings 0` |

**Gate rules (from Constitution):**
- Builds MUST fail on type errors and on any lint warning (`--max-warnings 0`).
- TypeScript **strict mode** is on (`strict`, `noUnusedLocals`, `noUnusedParameters`).
- Keep the service worker lightweight (event-based, lazy init, bounded memory);
  throttle/debounce content-script DOM writes to avoid layout thrash.
- The manifest `version` MUST match the `package.json` version (SemVer).

After `npm run build`, the loadable extension lives in `dist/` (load unpacked in
`chrome://extensions`). Output entry files: `scripts/serviceworker.js`, `scripts/content.js`,
`scripts/contentcss.js`, plus hashed UI chunks.

---

## 5. Coding Conventions

- **Imports:** prefer the `@/` alias; one import group per file (external, then `@/`).
- **Components:** function components only; colocate small components with their feature.
- **Styling:** Tailwind utility classes via the `cn()` helper in `src/lib/utils.ts`.
- **Factories:** add new attribute/style editors through the Factory + facade pattern,
  not by branching in existing renderers.
- **Types:** keep shared types in `src/types/*`; runtime constants in `src/utils/*`.
- **No secrets:** never hardcode tokens/keys; VS Code sync uses a local WebSocket.

---

## 6. Working With the Spec Kit Agents

This repo uses a Spec Kit SDD workflow (commands in `.kilo/commands/`, catalog in
[`agents.md`](agents.md)). Quick guidance for agents:

- New feature → `/speckit.specify` → (optional `/speckit.clarify`) → `/speckit.plan`
  → `/speckit.tasks` → `/speckit.analyze` (read-only gate) → `/speckit.implement`.
- Small change (1–5 files) → `/speckit.tinyspec.classify` to route to tinyspec vs. full SDD.
- Every agent loads `.specify/memory/constitution.md`; a constitution conflict is a
  **CRITICAL** finding in `/speckit.analyze` and must be resolved by changing the code,
  not the principle.
- Don't run hooks' `condition` expressions yourself; mandatory `before_*`/`after_*`
  extension hooks are handled by the HookExecutor.

---

## 7. References

- Constitution: `.specify/memory/constitution.md` (authoritative standards)
- Agent/command catalog: [`agents.md`](agents.md)
- App metadata: `public/manifest.json`, `package.json`, `vite.config.ts`, `tsconfig.json`
- App entry: `index.html`, `src/main.tsx`
