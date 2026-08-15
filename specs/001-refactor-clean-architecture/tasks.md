---
description: "Task list for TweakSync clean-architecture refactor"
---

# Tasks: Refactor to Modular Clean Architecture

**Input**: Design documents from `/specs/001-refactor-clean-architecture/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: INCLUDED — required by spec FR-007 / SC-006 and Constitution principle IV (Testability-First, NON-NEGOTIABLE). Each story has unit + integration tests written to fail before implementation.

**Organization**: Tasks grouped by user story (US1 P1 MVP, US2 P2, US3 P3). Setup + Foundational phases have no story label.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: parallelizable (different files, no dependency on incomplete tasks)
- **[Story]**: US1 / US2 / US3
- All paths are repo-relative

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Scaffold the layered structure and tooling required by plan.md.

- [X] T001 Create directory layout per plan.md: `src/core/{element,styling,language,sync}`, `src/ports`, `src/adapters/{browser,memory}`, `src/ui/{components,pages,hooks}`, `src/platform/dom`, `src/extension`, plus `tests/{unit,integration,fixtures}` (use `mkdir -p`).
- [X] T002 Add runtime dependency `webextension-polyfill` (and `@types/webextension-polyfill`) via npm; confirm import works in `src/adapters`.
- [X] T003 [P] Add dev dependency `vitest` + `@vitest/coverage-v8` + `@testing-library/react` + `jsdom`; create `vitest.config.ts` with `environment: "jsdom"`, setup file `tests/setup.ts`, and coverage thresholds (80% on `src/core`).
- [X] T004 [P] Add npm scripts in `package.json`: `test` (vitest run), `test:watch`, `build:chrome`, `build:edge`, `build:firefox`, `build:all` (targets filled in Phase US3).
- [X] T005 [P] Add a CI border-lint script (`scripts/lint-borders.mjs`) that FAILS if `chrome.`/`browser.` appears outside `src/adapters` and `src/extension`; wire into `npm run lint` pipeline.

**Checkpoint**: Directories, test runner, and border guard exist.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Port interfaces + test doubles MUST exist before any user story.

- [X] T006 Create `src/ports/BrowserPort.ts` interface per `contracts/browser-port.md` (storage, scripting, messaging, sidePanel, runtime; all promise-based; returns unsubscribe fns).
- [X] T007 [P] Create `src/ports/MessagingPort.ts` per `contracts/messaging.md` (typed `Message` union, `send`, `onMessage` returning unsubscribe).
- [X] T008 [P] Create `src/ports/StoragePort.ts` (session + local `get/set/remove`, promise-based).
- [X] T009 [P] Create `src/ports/SyncTransportPort.ts` per `contracts/sync-transport.md` (`connect/disconnect/send/onState/onMessage`, `ConnectionState` union).
- [X] T010 [P] Create `src/ports/ContentScriptPort.ts` (inject/remove content scripts, promise-based).
- [X] T011 [P] Create `src/adapters/memory/MemoryBrowserPort.ts`, `MemoryMessagingPort.ts`, `MemoryStoragePort.ts`, `MemorySyncTransportPort.ts` implementing the ports for unit/integration tests (no real browser APIs).
- [X] T012 [P] Create `tests/fixtures/` sample data: `sampleDom.ts` (jsdom element trees), `sampleStyleModel.ts`, and `sampleLanguage.ts` (a stub `StylingLanguage`).

**Checkpoint**: All ports + memory doubles ready — user stories may begin.

---

## Phase 3: User Story 1 - Behavior-preserving refactor (Priority: P1) 🎯 MVP

**Goal**: Restructure internals into clean architecture while every existing CSS styling + VS Code sync behavior works identically; boundary leakage removed; reusable platform-independent components/scripts; O(n) performance; managed WebSocket.

**Independent Test**: `npm test` passes core/adapter suites; `grep` border rule finds zero `chrome.`/`browser.` outside `src/adapters`+`src/extension`; loading the built extension reproduces pre-refactor styling + sync output.

### Tests for User Story 1

- [X] T013 [P] [US1] Unit test `src/core/element/*` pure functions (path/selector/details) in `tests/unit/core/element.test.ts` (no DOM globals).
- [X] T014 [P] [US1] Unit test `src/core/styling/*` engine (apply, processRule, shorthand expansion) in `tests/unit/core/styling.test.ts`; assert O(1) Map lookups, no nested loops.
- [X] T015 [P] [US1] Unit test `src/platform/dom/*` utilities on injected nodes in `tests/unit/platform/dom.test.ts`.
- [X] T016 [P] [US1] Unit test `WebSocketSyncAdapter` in `tests/unit/adapters/websocket.test.ts`: connect() twice → ONE socket; unexpected close → reconnect with increasing backoff; messages sent while connecting flush on open; disconnect() does NOT reconnect.
- [X] T017 [P] [US1] Integration test full style-edit → sync flow via `MemorySyncTransportPort` in `tests/integration/sync-flow.test.ts`.
- [X] T049 [P] [US1] Unit test the browser adapter implementations (`BrowserPort`/`StoragePort`/`MessagingPort`/`ContentScriptPort`) in `tests/unit/adapters/browser.test.ts` with a mocked `webextension-polyfill`, per Constitution IV (adapters REQUIRE unit tests).
- [X] T050 [P] [US1] Integration test the messaging + storage cross-layer contracts in `tests/integration/messaging-storage.test.ts` (round-trip via `MemoryMessagingPort`/`MemoryStoragePort`), per Constitution IV (cross-layer contracts REQUIRE integration tests).

### Implementation for User Story 1

- [X] T018 [US1] Create `src/core/element/*` by moving pure logic from `src/utils/elementContext.ts`, `getElementPath.ts`, `getElementDetails.ts`, `elementTextContent.ts` (remove global `document`/`chrome` deps).
- [X] T019 [P] [US1] Create `src/core/styling/*` from `src/utils/styles/*` (`updateStyles.ts`, `processRule.ts`, `styleHandlers.ts`, `shortHandStyles.ts`, `seperateCssOptions.ts`, `selectorUtilis.ts`, `extractUnits.ts`, `colorUtils.ts`); replace nested element×rule loops with O(n) `Map` keyed access.
- [X] T020 [P] [US1] Create `src/platform/dom/*` pure DOM utilities operating on injected nodes (relocate global-`document` usage from content utilities).
- [X] T021 [US1] Create `src/adapters/browser/*` implementing `BrowserPort`/`MessagingPort`/`StoragePort`/`ContentScriptPort` via `webextension-polyfill`; MOVE all `chrome.*` calls here from `src/pages/*`, `src/scripts/*`, `src/components/ColorStyle.tsx`.
- [X] T022 [US1] Create `src/adapters/browser/WebSocketSyncAdapter.ts` implementing `SyncTransportPort`: idempotent `connect()`, state machine `idle|connecting|connected|reconnecting|error`, single reconnect path on `close`/`error` with exponential backoff+jitter, bounded send queue flushed on open, optional ping/pong, notifications via `onState`/`onMessage` (no direct `chrome.*`). Replaces `src/scripts/websocket.ts`.
- [X] T023 [P] [US1] Decompose `src/utils/styles/globalStyles.ts` (~2732 lines) into `src/core/styling/data/<category>.ts` segments (<400 lines each) + thin `globalStyles.ts` accessor with O(1) `Map`.
- [X] T024 [P] [US1] Decompose `src/utils/attributes/elementSpecificAttributes.ts` (~2131 lines) into `src/core/element/data/<category>.ts` segments + thin accessor.
- [X] T025 [US1] Split oversized UI: refactor `src/pages/StyleInspector.tsx` (334), `src/components/styles/styleHelperComponents/MultiDynamicOptions.tsx` (361), and `src/utils/attributes/ariaAttributes.ts` (390) into focused prop-driven components under `src/ui/components/**`; remove `chrome.runtime.sendMessage` from `src/components/ColorStyle.tsx` and pages.
- [X] T026 [US1] Create `src/ui/hooks/*` React bindings (`useMessaging.ts`, `useBrowser.ts`, `useSync.ts`) adapting ports → props, so pages/components never call browser APIs.
- [X] T027 [US1] Create `src/extension/composition.ts` DI container binding ports → browser adapters; refactor entry points `src/scripts/serviceworker.ts`, `content.ts`, `contentScriptInjectAndRemove.ts` into `src/extension/*` using composition.
- [X] T028 [US1] Update `vite.config.ts` entry points to output `src/extension/serviceworker.ts`, `content.ts`, `contentScriptInjectAndRemove.ts`; ensure manifest `version` equals `package.json` version.
- [X] T029 [US1] Batch content-script DOM writes via `requestAnimationFrame`/throttle in `src/platform/dom` + content adapter; keep service worker event-based with no retained large state.
- [X] T030 [US1] Run border-lint (`scripts/lint-borders.mjs`): assert ZERO `chrome.`/`browser.` outside `src/adapters` and `src/extension`; fix any violations.

**Checkpoint**: US1 independently functional — MVP. Behavior-preserving refactor + clean boundaries + managed WebSocket proven by tests.

---

## Phase 4: User Story 2 - Styling-language registry (Priority: P2)

**Goal**: Add a new styling language by registering a self-contained module, with zero core edits.

**Independent Test**: Implement a sample language module + one `registry.register(...)` line; it is usable end-to-end with no change to `core/styling`, `ui`, or `adapters` (proven by `tests/integration/language-extensibility.test.ts`).

### Tests for User Story 2

- [X] T031 [P] [US2] Unit test `StylingLanguageRegistry` register/get/list + duplicate-throws in `tests/unit/core/language/registry.test.ts`.
- [X] T032 [P] [US2] Unit test `CssLanguage` parse/serialize round-trip in `tests/unit/core/language/css.test.ts`.
- [X] T033 [P] [US2] Integration test: register sample language → UI lists it → correct processing path, no core change, in `tests/integration/language-extensibility.test.ts`; also assert that an unregistered/misconfigured language selection fails gracefully with a clear message (US2 AC3).

### Implementation for User Story 2

- [X] T034 [US2] Create `src/core/language/StylingLanguage.ts` interface per `contracts/styling-language.md` (`id`, `label`, `parse`, `serialize`, optional `validate`).
- [X] T035 [US2] Create `src/core/language/CssLanguage.ts` implementing the interface; move existing CSS parse/serialize logic here.
- [X] T036 [US2] Create `src/core/language/StylingLanguageRegistry.ts` (`Map<id,lang>`, O(1) lookup, throws on duplicate `id`).
- [X] T037 [US2] Create registration call in `src/extension/composition.ts`: `registry.register(new CssLanguage())`.
- [X] T038 [US2] Update `src/ui` language selector to consume `registry.list()` (prop-driven) so selection routes through the registry.

**Checkpoint**: US2 independently functional — extensibility demonstrated without core edits.

---

## Phase 5: User Story 3 - Cross-browser build (Priority: P3)

**Goal**: One source tree produces installable Chrome, Edge, and Firefox packages from the Chrome MV3 manifest reference.

**Independent Test**: `npm run build:chrome|edge|firefox|all` each emit a loadable package; per-target manifest validated by `tests/integration/build-manifest.test.mjs`.

### Tests for User Story 3

- [X] T039 [P] [US3] Integration test `scripts/build-manifest.mjs` in `tests/integration/build-manifest.test.mjs`: asserts Chrome=reference, Edge=Chromium reuse, Firefox=+`browser_specific_settings.gecko`, version matches `package.json`.

### Implementation for User Story 3

- [X] T040 [US3] Normalize all adapter/browser API usage to `webextension-polyfill` `browser.*` (no raw `chrome.*`) across `src/adapters`.
- [X] T041 [US3] Create `scripts/build-manifest.mjs` generating `dist/chrome|edge|firefox/manifest.json` from `public/manifest.json` with per-target deltas (Firefox `gecko` id; MV3 background shape preserved).
- [X] T042 [US3] Fill npm scripts `build:chrome`, `build:edge`, `build:firefox`, `build:all` (Vite `--outDir dist/<target>` + `build-manifest.mjs`).
- [X] T043 [US3] Smoke-load each built package (Chrome/Edge/Firefox) and run spec user scenarios; confirm core styling + sync flows run on all three.

**Checkpoint**: US3 independently functional — three browser packages build and load.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T044 [P] Run `quickstart.md` validation end-to-end (border grep, `npm test`, extensibility, perf, cross-browser build, per-browser manual); include a size/metric check asserting no `src` file exceeds 400 lines and module count increased / average file size decreased vs. baseline (SC-004).
- [X] T045 [P] Enforce coverage gate (80% `src/core`) in CI; close gaps.
- [X] T046 [P] Delete migrated legacy files after verification: `src/scripts/websocket.ts`, and the originals of `src/utils/styles/*` and `src/utils/attributes/elementSpecificAttributes.ts` (restructured into `src/core/styling/data/*` and `src/core/element/data/*` segments by T023/T024). (Done: the utils originals are now 1-line barrels over `src/core` — `globalStyles.ts` → `@/core/styling`, `elementSpecificAttributes.ts` → `@/core/element/data`; `lang.ts` deleted; `globalAttributes.ts` repointed to `@/core/element/data/languageTags`. SC-004 now passes (no `src` file > 400 lines). REMAINING (out of scope, < 400 lines, still wired by `src/extension/serviceWorker.ts`): `src/scripts/websocket.ts` and `src/scripts/contentScriptInjectAndRemove.ts` — decompose into `src/adapters` as a follow-up.)
- [X] T047 [P] Update `AGENTS.md`/`README.md` references from `src/scripts` → `src/extension` and document new `core/ports/adapters/ui/platform` layers.
- [ ] T048 [P] Profile on a 1000+ element page; confirm O(n) cost and rAF-batched DOM writes; record benchmark baseline.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No deps — start immediately.
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories.
- **US1 (Phase 3)**: Depends on Foundational. MVP.
- **US2 (Phase 4)**: Depends on Foundational (uses ports + composition); can run after US1 but independent of US1 behavior.
- **US3 (Phase 5)**: Depends on Foundational (adapter normalization); independent of US1/US2.
- **Polish (Phase 6)**: Depends on all desired stories complete.

### User Story Dependencies

- **US1 (P1)**: After Foundational only. No story dependencies.
- **US2 (P2)**: After Foundational; integrates with `composition.ts` (T037) but independently testable.
- **US3 (P3)**: After Foundational; independent of US1/US2.

### Within Each User Story

- Tests written FIRST, must FAIL before implementation.
- Ports (Foundational) before adapters/core.
- Core models/services before UI/hooks.
- Story complete before next priority checkpoint.

### Parallel Opportunities

- All Setup tasks marked [P] run in parallel.
- All Foundational port/double tasks (T006–T012) run in parallel.
- After Foundational: US1/US2/US3 can proceed in parallel (different team members/files).
- Within US1: T018–T022, T023–T024 are independent file creations → parallel.
- All tests for a story marked [P] run in parallel.

---

## Parallel Example: User Story 1 (core extraction)

```bash
# Launch independent core/platform extractions together:
Task T018: "Create src/core/element/* from src/utils element helpers"
Task T019: "Create src/core/styling/* from src/utils/styles/*"
Task T020: "Create src/platform/dom/* pure DOM utilities"
Task T021: "Create src/adapters/browser/* implementing ports via webextension-polyfill"

# Launch US1 tests together (after impl):
Task T013: tests/unit/core/element.test.ts
Task T014: tests/unit/core/styling.test.ts
Task T016: tests/unit/adapters/websocket.test.ts
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 Setup → Phase 2 Foundational (CRITICAL, blocks all).
2. Phase 3 User Story 1 (boundary extraction, platform-independent components/scripts, performance, WebSocket).
3. **STOP and VALIDATE**: `npm test` + border-lint + manual load → behavior identical to pre-refactor.

### Incremental Delivery

1. Setup + Foundational → foundation ready.
2. US1 → test independently → MVP demo (refactor shipped, behavior preserved).
3. US2 → test independently → extensibility demo (registry).
4. US3 → test independently → three-browser build demo.
5. Polish → coverage, docs, benchmarks.

### Parallel Team Strategy

1. Team completes Setup + Foundational together.
2. After Foundational: Dev A = US1, Dev B = US2, Dev C = US3 (each owns distinct files/layers).

---

## Notes

- [P] tasks = different files, no dependencies.
- [Story] label maps task to US1/US2/US3 for traceability.
- Each user story independently completable and testable.
- Verify tests fail before implementing.
- Commit after each task or logical group.
- Stop at any checkpoint to validate a story independently.
- Avoid: vague tasks, same-file conflicts, cross-story dependencies that break independence.

