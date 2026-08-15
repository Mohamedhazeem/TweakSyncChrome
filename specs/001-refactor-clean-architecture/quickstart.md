# Quickstart: Validate the Refactor End-to-End

**Feature**: 001-refactor-clean-architecture
**Date**: 2026-08-16
**Goal**: Runnable checks that prove the architecture, extensibility, cross-browser, and performance goals hold before/after implementation. References [data-model.md](./data-model.md) and [contracts/](./contracts).

## Prerequisites

- Node + the existing toolchain (Vite 8, TypeScript 5.9 strict).
- `webextension-polyfill` installed (added dependency).
- Vitest installed (added for tests).
- A Chromium browser (Chrome/Edge) and Firefox for load tests.

## 1. Boundary / architecture check (FR-002, Constitution I)

```bash
# Must return ZERO matches outside src/adapters and src/extension
grep -rnE "(^|[^.])chrome\.|(^|[^.])browser\." src --include=*.ts --include=*.tsx \
  | grep -v "src/adapters/" | grep -v "src/extension/"
```
**Expected**: no output (all browser API use is confined to `adapters`/`extension`).

## 2. Unit tests — core isolation (FR-007, SC-006)

```bash
npm run test            # Vitest, uses memory adapters
```
**Expected**: all `tests/unit` + `tests/integration` pass; `src/core` coverage ≥ 80%.

## 3. Extensibility — add a language without core edits (FR-003, SC-002)

- Implement a sample `StylingLanguage` (e.g., JSON wrapper) and add ONE `registry.register(...)` line in `src/extension/composition.ts`.
- Run a unit test that resolves it via `registry.get("sample")` and round-trips `parse`/`serialize`.
**Expected**: passes with **no modification** to `core/styling`, `ui`, or `adapters`.

## 4. Performance — linear cost on large DOM (FR-006, FR-008, SC-005)

- A Vitest benchmark/applied test on a synthetic 1,000-element document asserts style application is O(n) (single pass, Map lookups) and that DOM writes are flushed once per frame (rAF batch).
**Expected**: no nested element×rule loop; timing scales linearly with element count.

## 5. Cross-browser build (FR-004, SC-003)

```bash
npm run build:chrome    # dist/chrome/manifest.json  (Chrome reference, unchanged)
npm run build:edge      # dist/edge/manifest.json    (Chromium reuse)
npm run build:firefox   # dist/firefox/manifest.json (+ browser_specific_settings.gecko)
npm run build:all       # all three
```
**Expected**: each target produces a loadable, unpacked extension under `dist/<target>/`.

## 6. Manual acceptance per browser (SC-001, SC-003)

For Chrome, Edge, and Firefox:
1. Load unpacked from `dist/<target>`.
2. Open a page, select an element, edit CSS, sync to the editor.
**Expected**: behavior and synced output are identical to the pre-refactor version (zero regression).

## 7. WebSocket consistency & efficiency (contract: sync-transport)

- Unit test `WebSocketSyncAdapter` with a mock socket: calling `connect()` twice rapidly results in ONE socket; an unexpected `close` triggers reconnect with increasing delay (backoff); messages sent while `connecting` are delivered after `open`; a `disconnect()` does NOT reconnect.
- Integration test: simulate a socket drop and assert `onState` transitions `connected → reconnecting → connected` and the send queue flushes.
**Expected**: one consistent lifecycle, no duplicate sockets, no lost messages, bounded reconnect.

## Notes

- Items 1, 2, 3, 4 are automated (CI). Items 5, 6 verify packaging and behavior per target.
- No implementation code is included here; see `/speckit.tasks` → `tasks.md` for the build order.
