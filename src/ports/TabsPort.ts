export interface TabsPort {
  queryActive(): Promise<{ id: number; url: string; active: boolean } | undefined>;
  queryById(tabId: number): Promise<{ id: number } | undefined>;
  sendMessage(tabId: number, message: unknown): Promise<unknown>;
  open(url: string): Promise<{ id: number } | undefined>;
  onUpdated(cb: (tabId: number, changeInfo: unknown, tab: unknown) => void): () => void;
  onRemoved(cb: (tabId: number) => void): () => void;
  queryByWindow(windowId: number): Promise<Array<{ id?: number }>>;
}

export interface WindowsPort {
  onRemoved(cb: (windowId: number) => void): () => void;
  onFocusChanged(cb: (windowId: number) => void): () => void;
}
