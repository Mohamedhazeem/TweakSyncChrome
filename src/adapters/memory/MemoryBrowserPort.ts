import type { BrowserPort, Manifest } from "../../ports/BrowserPort";
import type { ContentScriptPort, InjectOptions } from "../../ports/ContentScriptPort";
import type { MessagingPort } from "../../ports/MessagingPort";
import type { StoragePort } from "../../ports/StoragePort";
import { MemoryMessagingPort } from "./MemoryMessagingPort";
import { MemoryStoragePort } from "./MemoryStoragePort";

class MemoryContentScriptPort implements ContentScriptPort {
  private readonly injected = new Map<string, string[]>();

  async inject(options: InjectOptions): Promise<void> {
    const key = String(options.target.tabId);
    const existing = this.injected.get(key) ?? [];
    this.injected.set(key, [...new Set([...existing, ...options.files])]);
  }

  async remove(options: InjectOptions): Promise<void> {
    this.injected.delete(String(options.target.tabId));
  }

  getInjected(tabId: number): string[] {
    return this.injected.get(String(tabId)) ?? [];
  }
}

export class MemoryBrowserPort implements BrowserPort {
  readonly storage: StoragePort = new MemoryStoragePort();
  readonly scripting: ContentScriptPort = new MemoryContentScriptPort();
  readonly messaging: MessagingPort = new MemoryMessagingPort();
  readonly sidePanel = {
    open: async (): Promise<void> => {},
    async getOptions(): Promise<{ enabled?: boolean }> {
      return {};
    },
    async setOptions(): Promise<void> {},
  };
  readonly tabs = {
    async queryActive() {
      return undefined;
    },
    async queryById() {
      return undefined;
    },
    async sendMessage() {
      return undefined;
    },
    async open() {
      return undefined;
    },
    async queryByWindow() {
      return [];
    },
    onUpdated: (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _cb: unknown
    ): (() => void) => () => {},
    onRemoved: (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _cb: unknown
    ): (() => void) => () => {},
  };
  readonly windows = {
    onRemoved: (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _cb: unknown
    ): (() => void) => () => {},
    onFocusChanged: (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _cb: unknown
    ): (() => void) => () => {},
  };
  readonly action = {
    onClicked: (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _cb: () => void
    ): (() => void) => () => {},
  };
  readonly runtime = {
    getManifest: (): Manifest => ({
      name: "memory",
      version: "0.0.0",
      manifest_version: 3,
    }),
    onCommand: (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _cb: (command: string) => void
    ): (() => void) => {
      return () => {};
    },
    onConnect: (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _cb: (port: { name: string; onMessage: { addListener: (cb: (m: unknown) => void) => void; removeListener: (cb: (m: unknown) => void) => void }; postMessage: (m: unknown) => void }) => void
    ): (() => void) => {
      return () => {};
    },
  };
}
