import { createBrowserPort } from "@/adapters/browser";
import { WebSocketSyncAdapter } from "@/adapters/browser/WebSocketSyncAdapter";
import { SyncService } from "@/core/sync/SyncService";
import { SYNC_URL } from "@/core/sync/syncActions";
import type { BrowserPort } from "@/ports/BrowserPort";

export interface ExtensionComposition {
  browser: BrowserPort;
  syncTransport: WebSocketSyncAdapter;
  syncService: SyncService;
  dispose: () => void;
}

/**
 * Assembles the side-panel / service-worker runtime.
 *
 * This is the single wiring point for the browser surface: it is the only module
 * in `src/extension` that touches the real browser globals, and the only place
 * the transport, sync service and UI-facing port are bound together.
 */
export function createExtensionComposition(): ExtensionComposition {
  const browser = createBrowserPort();
  const syncTransport = new WebSocketSyncAdapter({ url: SYNC_URL });
  const syncService = new SyncService(syncTransport);

  return {
    browser,
    syncTransport,
    syncService,
    dispose() {
      syncService.disconnect();
    },
  };
}
