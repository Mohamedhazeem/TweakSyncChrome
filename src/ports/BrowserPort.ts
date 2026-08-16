import type { StoragePort } from "./StoragePort";
import type { ContentScriptPort } from "./ContentScriptPort";
import type { MessagingPort } from "./MessagingPort";
import type { TabsPort, WindowsPort } from "./TabsPort";

export interface Manifest {
  name: string;
  version: string;
  manifest_version: number;
  [key: string]: unknown;
}

export interface Connection {
  name: string;
  onMessage: {
    addListener: (cb: (message: unknown) => void) => void;
    removeListener: (cb: (message: unknown) => void) => void;
  };
  postMessage: (message: unknown) => void;
}

export interface BrowserPort {
  storage: StoragePort;
  scripting: ContentScriptPort;
  messaging: MessagingPort;
  sidePanel: {
    open(tabId?: number): Promise<void>;
    getOptions(tabId: number): Promise<{ enabled?: boolean }>;
    setOptions(options: { tabId?: number; path?: string }): Promise<void>;
  };
  tabs: TabsPort;
  windows: WindowsPort;
  action: {
    onClicked(cb: () => void): () => void;
  };
  runtime: {
    getManifest(): Manifest;
    onCommand(cb: (command: string) => void): () => void;
    onConnect(cb: (port: Connection) => void): () => void;
  };
}
