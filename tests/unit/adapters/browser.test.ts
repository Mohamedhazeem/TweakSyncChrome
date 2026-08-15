import { beforeEach, describe, expect, it, vi } from "vitest";

type Listener = (...args: unknown[]) => unknown;

function createEvent() {
  const listeners = new Set<Listener>();
  return {
    listeners,
    addListener: vi.fn((cb: Listener) => listeners.add(cb)),
    removeListener: vi.fn((cb: Listener) => listeners.delete(cb)),
    emit: (...args: unknown[]) => [...listeners].map((cb) => cb(...args)),
  };
}

function createArea() {
  const store = new Map<string, unknown>();
  return {
    store,
    get: vi.fn(async (keys: string | string[] | null) => {
      if (keys === null || keys === undefined) {
        return Object.fromEntries(store);
      }
      const list = Array.isArray(keys) ? keys : [keys];
      const out: Record<string, unknown> = {};
      for (const key of list) {
        if (store.has(key)) {
          out[key] = store.get(key);
        }
      }
      return out;
    }),
    set: vi.fn(async (items: Record<string, unknown>) => {
      for (const [key, value] of Object.entries(items)) {
        store.set(key, value);
      }
    }),
    remove: vi.fn(async (keys: string | string[]) => {
      for (const key of Array.isArray(keys) ? keys : [keys]) {
        store.delete(key);
      }
    }),
  };
}

const fakeBrowser = {
  storage: { session: createArea(), local: createArea() },
  runtime: {
    sendMessage: vi.fn(async () => ({ ok: true })),
    onMessage: createEvent(),
    onConnect: createEvent(),
    getManifest: vi.fn(() => ({ name: "TweakSync", version: "9.9.9", manifest_version: 3 })),
    lastError: undefined as { message?: string } | undefined,
  },
  scripting: {
    executeScript: vi.fn(async () => [{ result: null }]),
    insertCSS: vi.fn(async () => undefined),
    removeCSS: vi.fn(async () => undefined),
  },
  sidePanel: {
    open: vi.fn(async () => undefined),
    setOptions: vi.fn(async () => undefined),
    getOptions: vi.fn(async () => ({ enabled: true })),
  },
  tabs: {
    query: vi.fn(async () => [{ id: 7, url: "https://example.com", active: true }]),
    sendMessage: vi.fn(async () => ({ status: "success" })),
    onUpdated: createEvent(),
    onRemoved: createEvent(),
  },
  windows: { onRemoved: createEvent() },
  commands: { onCommand: createEvent() },
  action: { onClicked: createEvent() },
};

vi.mock("webextension-polyfill", () => ({ default: fakeBrowser }));

const { createBrowserPort } = await import("@/adapters/browser/createBrowserPort");

beforeEach(() => {
  vi.clearAllMocks();
  fakeBrowser.storage.session.store.clear();
  fakeBrowser.storage.local.store.clear();
  fakeBrowser.runtime.lastError = undefined;
});

describe("BrowserPort adapter", () => {
  it("exposes the whole port surface", () => {
    const port = createBrowserPort();
    expect(port.storage.session).toBeDefined();
    expect(port.storage.local).toBeDefined();
    expect(port.scripting).toBeDefined();
    expect(port.messaging).toBeDefined();
    expect(port.sidePanel).toBeDefined();
    expect(port.runtime).toBeDefined();
    expect(port.tabs).toBeDefined();
  });

  it("returns the manifest from the polyfill", () => {
    const port = createBrowserPort();
    expect(port.runtime.getManifest().version).toBe("9.9.9");
  });

  it("returns unsubscribe functions for runtime events", () => {
    const port = createBrowserPort();
    const commands: string[] = [];

    const unsubscribe = port.runtime.onCommand((command) => commands.push(command));
    fakeBrowser.commands.onCommand.emit("open");
    expect(commands).toEqual(["open"]);

    unsubscribe();
    fakeBrowser.commands.onCommand.emit("open");
    expect(commands).toEqual(["open"]);
    expect(fakeBrowser.commands.onCommand.removeListener).toHaveBeenCalled();
  });

  it("opens the side panel via the polyfill", async () => {
    const port = createBrowserPort();
    await port.sidePanel.open(7);
    expect(fakeBrowser.sidePanel.open).toHaveBeenCalledWith({ tabId: 7 });
  });
});

describe("StoragePort adapter", () => {
  it("round-trips session and local values as promises", async () => {
    const port = createBrowserPort();

    await port.storage.session.set({ "contentScriptInjected_7": true });
    await expect(port.storage.session.get("contentScriptInjected_7")).resolves.toEqual({
      contentScriptInjected_7: true,
    });

    await port.storage.session.remove("contentScriptInjected_7");
    await expect(port.storage.session.get("contentScriptInjected_7")).resolves.toEqual({});

    await port.storage.local.set({ theme: "dark" });
    await expect(port.storage.local.get(["theme"])).resolves.toEqual({ theme: "dark" });
    expect(fakeBrowser.storage.local.set).toHaveBeenCalled();
  });
});

describe("MessagingPort adapter", () => {
  it("sends through runtime.sendMessage", async () => {
    const port = createBrowserPort();
    await expect(port.messaging.send({ action: "connect" })).resolves.toEqual({ ok: true });
    expect(fakeBrowser.runtime.sendMessage).toHaveBeenCalledWith({ action: "connect" });
  });

  it("swallows disconnected-receiver errors instead of rejecting", async () => {
    fakeBrowser.runtime.sendMessage.mockRejectedValueOnce(
      new Error("Could not establish connection. Receiving end does not exist.")
    );
    const port = createBrowserPort();
    await expect(port.messaging.send({ action: "connect" })).resolves.toBeUndefined();
  });

  it("subscribes and unsubscribes message handlers without leaking", () => {
    const port = createBrowserPort();
    const received: unknown[] = [];

    const unsubscribe = port.messaging.onMessage((message) => received.push(message));
    fakeBrowser.runtime.onMessage.emit({ action: "connect" }, {}, () => {});
    expect(received).toEqual([{ action: "connect" }]);

    unsubscribe();
    expect(fakeBrowser.runtime.onMessage.removeListener).toHaveBeenCalled();
    fakeBrowser.runtime.onMessage.emit({ action: "connect" }, {}, () => {});
    expect(received).toHaveLength(1);
  });

  it("passes a reply callback through to handlers", () => {
    const port = createBrowserPort();
    const reply = vi.fn();

    port.messaging.onMessage((_message, respond) => respond?.("pong"));
    fakeBrowser.runtime.onMessage.emit({ action: "ping" }, {}, reply);

    expect(reply).toHaveBeenCalledWith("pong");
  });
});

describe("ContentScriptPort adapter", () => {
  it("injects and removes files through scripting", async () => {
    const port = createBrowserPort();

    await port.scripting.inject({ target: { tabId: 7 }, files: ["scripts/content.js"] });
    expect(fakeBrowser.scripting.executeScript).toHaveBeenCalledWith({
      target: { tabId: 7 },
      files: ["scripts/content.js"],
    });

    await port.scripting.remove({ target: { tabId: 7 }, files: ["assets/content.css"] });
    expect(fakeBrowser.scripting.removeCSS).toHaveBeenCalledWith({
      target: { tabId: 7 },
      files: ["assets/content.css"],
    });
  });

  it("inserts css through scripting", async () => {
    const port = createBrowserPort();
    await port.scripting.insertCSS({ target: { tabId: 7 }, files: ["assets/content.css"] });
    expect(fakeBrowser.scripting.insertCSS).toHaveBeenCalled();
  });
});

describe("TabsPort adapter", () => {
  it("queries the active tab and forwards messages", async () => {
    const port = createBrowserPort();

    await expect(port.tabs.queryActive()).resolves.toEqual({
      id: 7,
      url: "https://example.com",
      active: true,
    });
    expect(fakeBrowser.tabs.query).toHaveBeenCalledWith({ active: true, currentWindow: true });

    await expect(port.tabs.sendMessage(7, { action: "getUpdatedStyle" })).resolves.toEqual({
      status: "success",
    });
  });

  it("returns undefined when no tab matches", async () => {
    fakeBrowser.tabs.query.mockResolvedValueOnce([]);
    const port = createBrowserPort();
    await expect(port.tabs.queryActive()).resolves.toBeUndefined();
  });

  it("exposes unsubscribable tab and window events", () => {
    const port = createBrowserPort();
    const updates: unknown[] = [];
    const removals: number[] = [];

    const stopUpdates = port.tabs.onUpdated((tabId, change, tab) =>
      updates.push({ tabId, change, tab })
    );
    const stopRemovals = port.tabs.onRemoved((tabId) => removals.push(tabId));
    const stopWindows = port.windows.onRemoved((windowId) => removals.push(windowId));

    fakeBrowser.tabs.onUpdated.emit(7, { status: "complete" }, { active: true });
    fakeBrowser.tabs.onRemoved.emit(7);
    fakeBrowser.windows.onRemoved.emit(99);

    expect(updates).toHaveLength(1);
    expect(removals).toEqual([7, 99]);

    stopUpdates();
    stopRemovals();
    stopWindows();

    fakeBrowser.tabs.onUpdated.emit(7, { status: "complete" }, { active: true });
    expect(updates).toHaveLength(1);
  });
});
