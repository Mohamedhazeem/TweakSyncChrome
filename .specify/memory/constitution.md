<!--
Sync Impact Report
==================
Version change: 1.0.0 -> 1.1.0
Modified principles: none renamed
Expanded guidance:
  - Performance & Efficiency Standards: added algorithmic-complexity (Big O notation)
    rule requiring complexity-aware algorithm/data-structure selection and benchmarks
    for quadratic-or-worse behavior on user-driven input sizes.
Added sections: none
Removed sections: none
Deferred TODOs: none
Rationale: MINOR bump. User input "big o notation" added material, testable performance
guidance (algorithmic complexity analysis) to the existing Performance & Efficiency
Standards section. No principles removed or redefined.
-->

# TweakSync Constitution

## Core Principles

### I. Clean Architecture & Layered Boundaries

Source code MUST be organized into concentric layers (domain/entities, use cases/application, adapters/interface, frameworks/drivers) that obey the Dependency Rule: source dependencies point strictly inward, and inner layers MUST NOT depend on outer layers.

- Browser-specific surfaces (`chrome.*`, `browser.*`, DOM, storage, messaging, service worker) MUST be isolated behind adapter/port interfaces so business logic stays framework-agnostic.
- Feature and domain logic MUST NOT import UI, extension-runtime, or third-party framework modules directly.
- Cross-layer communication MUST flow through explicit, typed boundaries.

Rationale: Decoupling the core from the extension runtime keeps logic testable, portable across browsers, and resilient to API churn.

### II. SOLID Design

Every module MUST honor the SOLID principles as non-negotiable design constraints.

- Single Responsibility: each module/class has exactly one reason to change.
- Open/Closed: components are open for extension (interfaces, composition, plugins) and closed for modification.
- Liskov Substitution: subtypes MUST preserve the behavioral contracts of their abstractions.
- Interface Segregation: clients MUST NOT depend on interfaces they do not use; prefer small, focused interfaces.
- Dependency Inversion: high-level policy depends on abstractions, not concrete browser/extension details; dependencies are injected at boundaries.

Rationale: SOLID yields cohesive, loosely coupled modules, reducing regression risk and easing future extension.

### III. Design Patterns for Extensibility

Proven, reusable patterns MUST be the default toolkit at every variation point to keep the codebase easily extendable.

- Use Factory, Strategy, Observer, Adapter, Command, Repository, and Dependency Injection where behavior varies.
- New capabilities MUST be added by composing or registering modules (e.g., a feature/plugin registry), NOT by editing core control flow.
- Shared extension contracts (message protocols, ports, storage schemas) MUST be defined as typed interfaces.

Rationale: Pattern-based variation points allow growth without destabilizing existing behavior.

### IV. Testability-First (NON-NEGOTIABLE)

Testability is a design outcome enforced from the start, not an afterthought.

- Business logic MUST be unit-testable in isolation from browser runtimes; `chrome.*`/`browser.*` access MUST be mocked via injected ports.
- Tests MUST be written before implementation for new behavior; the Red-Green-Refactor cycle is strictly enforced.
- Unit tests are REQUIRED for use cases and adapters; integration tests are REQUIRED for cross-layer contracts (messaging, storage, VS Code sync).
- Coverage and quality gates MUST run in CI; the build MUST fail on regression or policy violation.

Rationale: Enforcing testability proves the architecture is honored and guarantees a reliable extension.

### V. Cross-Browser Compatibility

The extension MUST be standards-based and portable across browsers.

- Target Manifest V3 and the WebExtensions standard; support Chromium (Chrome/Edge) and Firefox, with Safari/others where feasible.
- Browser-specific APIs MUST be accessed through a normalized abstraction; proprietary APIs MUST NOT leak into core logic.
- Use feature detection (never user-agent sniffing) to handle capability differences.
- A single source MUST produce consistent behavior across supported browsers; per-browser deviations MUST be documented and justified.

Rationale: A normalized, standards-based approach maximizes reach while minimizing maintenance cost.

## Performance & Efficiency Standards

- Service worker MUST stay lightweight: event-based activation, lazy initialization, no long-running tasks, bounded memory.
- Content-script DOM operations MUST be throttled/debounced and batched to avoid layout thrash.
- Network and storage calls MUST be minimized and cached; payloads kept small and compressed where possible.
- Bundle size MUST be monitored; tree-shaking enabled, unused code removed, heavy dependencies lazy-loaded.
- Algorithms and data structures MUST be selected by analyzed time and space complexity (Big O notation); quadratic-or-worse behavior on user-driven input sizes (e.g., matched-element counts, synced rule sets) MUST be avoided or justified with benchmarks.
- CPU and heap MUST be profiled on representative pages before and after changes; complexity regressions MUST be caught by the performance gates.

Rationale: Extensions share the host page's resources; inefficiency directly degrades the user's browsing experience.

## Build & Release Processes

- A single reproducible pipeline (Vite + TypeScript) MUST produce production artifacts with source maps disabled and minification enabled.
- TypeScript strict mode MUST be enabled; builds MUST fail on type errors and on lint warnings (`--max-warnings 0`).
- Cross-browser bundles MUST be generated from one source via build flags/config, never via duplicated code.
- CI MUST run lint, type-check, tests, and a production build on every pull request.
- Releases MUST follow SemVer; the manifest version MUST match the package version.

Rationale: Automated, strict, reproducible builds guarantee consistent, shippable, cross-browser artifacts.

## Governance

This constitution supersedes all ad-hoc practices. All pull requests and code reviews MUST verify compliance with every principle above.

- Amendment procedure: changes require documented rationale, a SemVer version bump (MAJOR for principle removals/redefinitions, MINOR for new or materially expanded guidance, PATCH for clarifications/wording), and a migration note where behavior changes.
- Compliance review: architecture and code-review gates in CI enforce these principles; added complexity MUST be justified against them.
- Runtime development guidance lives in `AGENTS.md` and project docs; this constitution defines the non-negotiable standards they must respect.

**Version**: 1.1.0 | **Ratified**: 2026-08-15 | **Last Amended**: 2026-08-15
