import { beforeEach, describe, expect, it } from "vitest";
import { MemoryBrowserPort } from "@/adapters/memory/MemoryBrowserPort";
import { MemoryMessagingPort } from "@/adapters/memory/MemoryMessagingPort";
import { MemoryStoragePort } from "@/adapters/memory/MemoryStoragePort";
import type { Message } from "@/ports/MessagingPort";
import type { StoragePort } from "@/ports/StoragePort";

let messaging: MemoryMessagingPort;
let storage: StoragePort;

beforeEach(() => {
  messaging = new MemoryMessagingPort();
  storage = new MemoryStoragePort();
});

describe("MessagingPort contract", () => {
  it("delivers messages to every subscriber", async () => {
    const first: Message[] = [];
    const second: Message[] = [];
    messaging.onMessage((message) => first.push(message));
    messaging.onMessage((message) => second.push(message));

    await messaging.send({ action: "injectContentScript" });

    expect(first).toEqual([{ action: "injectContentScript" }]);
    expect(second).toEqual([{ action: "injectContentScript" }]);
  });

  it("stops delivery after unsubscribe", async () => {
    const received: Message[] = [];
    const unsubscribe = messaging.onMessage((message) => received.push(message));

    await messaging.send({ action: "connect" });
    unsubscribe();
    await messaging.send({ action: "connect" });

    expect(received).toHaveLength(1);
  });
});

describe("StoragePort contract", () => {
  it("keeps session and local areas isolated", async () => {
    await storage.session.set({ key: "session-value" });
    await storage.local.set({ key: "local-value" });

    await expect(storage.session.get("key")).resolves.toEqual({ key: "session-value" });
    await expect(storage.local.get("key")).resolves.toEqual({ key: "local-value" });
  });

  it("supports array keys, null-for-all and remove", async () => {
    await storage.session.set({ a: 1, b: 2 });

    await expect(storage.session.get(["a", "b"])).resolves.toEqual({ a: 1, b: 2 });
    await expect(storage.session.get(null)).resolves.toEqual({ a: 1, b: 2 });

    await storage.session.remove(["a"]);
    await expect(storage.session.get(["a", "b"])).resolves.toEqual({ b: 2 });
  });

  it("returns an empty object for unknown keys", async () => {
    await expect(storage.session.get("missing")).resolves.toEqual({});
  });
});

describe("messaging + storage cross-layer flow", () => {
  it("persists injection state driven by an incoming message", async () => {
    const browserPort = new MemoryBrowserPort();

    browserPort.messaging.onMessage((message) => {
      if (message.action === "injectContentScript") {
        void browserPort.storage.session.set({ contentScriptInjected_7: true });
      }
      if (message.action === "removeContentScript") {
        void browserPort.storage.session.remove("contentScriptInjected_7");
      }
    });

    await browserPort.messaging.send({ action: "injectContentScript" });
    await expect(browserPort.storage.session.get("contentScriptInjected_7")).resolves.toEqual({
      contentScriptInjected_7: true,
    });

    await browserPort.messaging.send({ action: "removeContentScript" });
    await expect(browserPort.storage.session.get("contentScriptInjected_7")).resolves.toEqual({});
  });

  it("injects content scripts through the scripting port", async () => {
    const browserPort = new MemoryBrowserPort();

    await browserPort.scripting.inject({ target: { tabId: 7 }, files: ["scripts/content.js"] });
    await browserPort.scripting.inject({ target: { tabId: 7 }, files: ["scripts/content.js"] });

    expect(browserPort.runtime.getManifest().manifest_version).toBe(3);
    await expect(
      browserPort.scripting.remove({ target: { tabId: 7 }, files: ["scripts/content.js"] })
    ).resolves.toBeUndefined();
  });
});
