/** Opens the side panel, optionally for a specific tab. */
export function createSidePanelPort(
  sidePanel: {
    open: (options?: { tabId: number }) => Promise<void>;
    getOptions?: (options: { tabId: number }) => Promise<{ enabled?: boolean }>;
    setOptions?: (options: { tabId?: number; path?: string }) => Promise<void>;
  }
) {
  return {
    open(tabId?: number): Promise<void> {
      if (tabId === undefined) {
        return sidePanel.open();
      }
      return sidePanel.open({ tabId });
    },
    async getOptions(tabId: number): Promise<{ enabled?: boolean }> {
      if (!sidePanel.getOptions) {
        return {};
      }
      return sidePanel.getOptions({ tabId });
    },
    async setOptions(options: { tabId?: number; path?: string }): Promise<void> {
      if (!sidePanel.setOptions) {
        return;
      }
      return sidePanel.setOptions(options);
    },
  };
}
