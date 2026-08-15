/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { createBrowserPort } from "@/adapters/browser";
import type { BrowserPort } from "@/ports/BrowserPort";
import { WebSocketSyncAdapter } from "@/adapters/browser/WebSocketSyncAdapter";
import { SyncService } from "@/core/sync/SyncService";
import { SYNC_URL } from "@/core/sync/syncActions";

interface ExtensionContextValue {
  browser: BrowserPort;
  syncService: SyncService;
}

const ExtensionContext = createContext<ExtensionContextValue | null>(null);

/**
 * Wires the extension runtime (browser port, sync service) once at the top of
 * the side-panel tree. Every component thus reaches the browser runtime only
 * through the injected ports, keeping the UI free of direct extension calls.
 */
export function ExtensionProvider({ children }: { children: ReactNode }) {
  const [value] = useState<ExtensionContextValue>(() => {
    const browser = createBrowserPort();
    const transport = new WebSocketSyncAdapter({ url: SYNC_URL });
    const syncService = new SyncService(transport);
    return { browser, syncService };
  });

  useEffect(() => {
    return () => value.syncService.disconnect();
  }, [value]);

  return <ExtensionContext.Provider value={value}>{children}</ExtensionContext.Provider>;
}

/** Access the shared extension ports from any component. */
export function useExtension(): ExtensionContextValue {
  const ctx = useContext(ExtensionContext);
  if (!ctx) {
    throw new Error("useExtension must be used within an ExtensionProvider");
  }
  return ctx;
}

/** Convenience accessor for the messaging port. */
export function useMessagingPort() {
  return useExtension().browser.messaging;
}

/** Convenience accessor for the sync service. */
export function useSyncService(): SyncService {
  return useExtension().syncService;
}
