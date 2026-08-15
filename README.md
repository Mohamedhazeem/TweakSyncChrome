# 🚀 TweakSync (Chrome Extension)

TweakSync lets you style web elements in real time inside Chrome and instantly sync those changes with VS Code for a faster and smoother front-end development workflow.

Built for front-end developers and web designers, TweakSync removes the friction between browser inspection and code editing by keeping both perfectly in sync.

---

## ✨ Features

### 🎨 Real-Time Styling
- Select any element on a live webpage
- Modify CSS properties such as color, spacing, typography, and layout
- See changes applied instantly with live preview

### 🔄 VS Code Synchronization
- Sync style changes directly to your local VS Code project
- Apply updates to your CSS files automatically
- Keep browser tweaks and source code aligned

### ⚡ Efficient Workflow
- No more manual copy-paste from DevTools
- Reduce context switching between browser and editor
- Iterate faster and focus on design and functionality

---

## 💡 Why TweakSync?

- 🚀 **Boost Productivity** – Make styling changes faster with instant feedback
- 🎯 **Improve Design Accuracy** – Test changes visually before committing
- 🧠 **Stay Focused** – Work in one smooth, uninterrupted flow

---

## 👨‍💻 Who Is It For?

- Front-end developers
- UI/UX designers
- Full-stack developers
- Anyone working with CSS and modern web interfaces

---

## 🛠️ Use Cases

- Rapid UI prototyping
- Fine-tuning layouts and responsiveness
- Debugging and fixing CSS issues
- Speeding up design iterations

---

## 🔧 How It Works

1. Open your webpage in Chrome
2. Select an element using TweakSync
3. Adjust styles in real time
4. Sync the final changes to VS Code
5. Save and continue building 🚀

---

## 🏗️ Architecture

TweakSync uses a layered clean architecture so the styling and sync logic stays
independent of the browser runtime and the UI:

- **`src/core`** — framework-agnostic domain logic and use cases (element model,
  styling engine, `SyncService`, `StylingLanguage` registry). No React, no `chrome.*`.
- **`src/ports`** — TypeScript contracts consumed by `core`/`ui` and implemented by
  adapters: `BrowserPort`, `MessagingPort`, `StoragePort`, `ContentScriptPort`, `SyncTransportPort`.
- **`src/adapters`** — the only layer that touches browser APIs:
  - `adapters/browser` — Chrome/Edge/Firefox implementations behind `webextension-polyfill`
    (including `WebSocketSyncAdapter` for VS Code sync).
  - `adapters/memory` — in-memory test doubles used by unit/integration tests.
- **`src/ui`** — platform-independent React components, pages, and hooks. They receive
  browser capabilities through injected ports and never call `chrome.*` directly.
- **`src/platform`** — platform-independent reusable script modules (e.g. pure DOM utilities).
- **`src/extension`** — the composition root (`composition.ts`) that wires ports → adapters.

Two CI gates protect these boundaries: a border-lint rule fails the build if
`chrome.`/`browser.` leaks outside `src/adapters` and `src/extension`, and the
test suite enforces an 80% coverage threshold on `src/core`.

---

## 📌 Summary

TweakSync bridges the gap between Chrome and VS Code, giving you a real-time, synchronized styling experience that feels natural, fast, and efficient.

Style. Preview. Sync. Done.

---

## 🔒 License

**Private / Proprietary Software**

© 2025 TweakSync. All rights reserved.

This software is proprietary and confidential.  
Unauthorized copying, modification, distribution, or use of this software, in whole or in part, is strictly prohibited without explicit written permission from the owner.
