# Testing Guidelines

## Layout

```
tests/
  setup.ts                    # Vitest setup
  fixtures/                   # Sample data (sampleDom, sampleStyleModel, sampleLanguage)
  unit/
    core/                     # Core domain tests (element, styling, language, sync, text)
    platform/                 # Platform DOM tests
    adapters/                 # Adapter tests (browser port, websocket)
  integration/
    sync-flow.test.ts         # End-to-end sync flow
    messaging-storage.test.ts # Messaging + storage contract
    language-extensibility.test.tsx # Language registry plug-in
    build-manifest.test.mjs   # Manifest version parity
  perf/
    dom-scale.perf.test.ts    # Large DOM scaling benchmarks
```

## Commands

```bash
npm run test          # once
npm run test:watch    # watch mode
npm run test:coverage # with V8 coverage report
```

## Coverage

- Threshold: **80% on `src/core`**. Build fails below this.
