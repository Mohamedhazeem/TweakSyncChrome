import browser from "webextension-polyfill";
import type { BrowserPort } from "@/ports/BrowserPort";
import { createStoragePort } from "./createStoragePort";
import { createContentScriptPort } from "./createContentScriptPort";
import { createMessagingPort } from "./createMessagingPort";
import { createSidePanelPort } from "./createSidePanelPort";
import { createTabsPort, createWindowsPort } from "./createTabsPort";

/**
 * Wires the real `webextension-polyfill` into the `BrowserPort` contract.
 * This is the only place (besides `WebSocketSyncAdapter`) where the browser
 * runtime leaks in; everything upstream depends on the port interface only.
 */
export function createBrowserPort(
  provided: { browser?: typeof browser } = {}
): BrowserPort {
  const api = (provided.browser ?? browser) as typeof browser & {
    sidePanel?: { open: (options?: { tabId?: number }) => Promise<void> };
  };

  return {
    storage: createStoragePort(api.storage),
    scripting: createContentScriptPort(api.scripting),
    messaging: createMessagingPort(api.runtime),
    sidePanel: createSidePanelPort(
      api.sidePanel as unknown as { open: (options?: { tabId: number }) => Promise<void> }
    ),
    tabs: createTabsPort(api.tabs as unknown),
    windows: createWindowsPort(api.windows as unknown),
    runtime: {
      getManifest(): { name: string; version: string; manifest_version: number } {
        return api.runtime.getManifest() as {
          name: string;
          version: string;
          manifest_version: number;
        };
      },
      onCommand(cb: (command: string) => void): () => void {
        const listener = (command: string) => cb(command);
        api.commands.onCommand.addListener(listener);
        return () => api.commands.onCommand.removeListener(listener);
      },
      onConnect(
        cb: (port: {
          name: string;
          onMessage: { addListener: (cb: (m: unknown) => void) => void; removeListener: (cb: (m: unknown) => void) => void };
          postMessage: (m: unknown) => void;
        }) => void
      ): () => void {
        const listener = (chromePort: unknown) => {
          const raw = chromePort as {
            name: string;
            onMessage: { addListener: (cb: (m: unknown) => void) => void; removeListener: (cb: (m: unknown) => void) => void };
            postMessage: (m: unknown) => void;
          };
          cb({
            name: raw.name,
            onMessage: {
              addListener: raw.onMessage.addListener,
              removeListener: raw.onMessage.removeListener,
            },
            postMessage: raw.postMessage,
          });
        };
        api.runtime.onConnect.addListener(listener);
        return () => api.runtime.onConnect.removeListener(listener);
      },
    },
  };
}
