import browser from "webextension-polyfill";
import type { TabsPort } from "@/ports/TabsPort";

export function createTabsPort(tabs: unknown = browser.tabs): TabsPort {
  const api = tabs as {
    query: (info: unknown) => Promise<Array<Record<string, unknown>>>;
    sendMessage: (tabId: number, message: unknown) => Promise<unknown>;
    create: (info: { url: string }) => Promise<{ id?: number }>;
    onUpdated: { addListener: (cb: unknown) => void; removeListener: (cb: unknown) => void };
    onRemoved: { addListener: (cb: unknown) => void; removeListener: (cb: unknown) => void };
  };

  return {
    async queryActive() {
      const [active] = await api.query({ active: true, currentWindow: true });
      return active as { id: number; url: string; active: boolean } | undefined;
    },
    async queryById(tabId: number) {
      const [found] = await api.query({ id: tabId });
      return (found as { id: number } | undefined) ?? undefined;
    },
    sendMessage(tabId: number, message: unknown) {
      return api.sendMessage(tabId, message);
    },
    async open(url: string) {
      const created = await api.create({ url });
      return (created as { id: number } | undefined) ?? undefined;
    },
    onUpdated(cb) {
      const listener = (tabId: number, changeInfo: unknown, tab: unknown) =>
        cb(tabId, changeInfo, tab);
      api.onUpdated.addListener(listener);
      return () => api.onUpdated.removeListener(listener);
    },
    onRemoved(cb) {
      const listener = (tabId: number) => cb(tabId);
      api.onRemoved.addListener(listener);
      return () => api.onRemoved.removeListener(listener);
    },
    async queryByWindow(windowId: number) {
      const tabs = await api.query({ windowId });
      return tabs as Array<{ id?: number }>;
    },
  };
}

export function createWindowsPort(
  windows: unknown = browser.windows
): { onRemoved(cb: (windowId: number) => void): () => void; onFocusChanged(cb: (windowId: number) => void): () => void } {
  const api = windows as {
    onRemoved: { addListener: (cb: unknown) => void; removeListener: (cb: unknown) => void };
    onFocusChanged: { addListener: (cb: unknown) => void; removeListener: (cb: unknown) => void };
  };
  return {
    onRemoved(cb) {
      const listener = (windowId: number) => cb(windowId);
      api.onRemoved.addListener(listener);
      return () => api.onRemoved.removeListener(listener);
    },
    onFocusChanged(cb) {
      const listener = (windowId: number) => cb(windowId);
      api.onFocusChanged.addListener(listener);
      return () => api.onFocusChanged.removeListener(listener);
    },
  };
}
