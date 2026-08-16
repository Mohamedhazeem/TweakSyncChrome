# CI Gates

- `npm run lint` runs ESLint + `scripts/lint-borders.mjs` (fails if `chrome.`/`browser.`
  leaks outside `src/adapters` and `src/extension`).
- `npm run build` runs `tsc` typecheck + Vite production build. Fails on type errors.
- Vitest enforces 80% coverage on `src/core`.
- Manifest `version` in `public/manifest.json` MUST match `package.json` version.
