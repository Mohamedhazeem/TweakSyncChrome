/** Opens the side panel, optionally for a specific tab. */
export function createSidePanelPort(
  sidePanel: { open: (options?: { tabId: number }) => Promise<void> }
) {
  return {
    open(tabId?: number): Promise<void> {
      if (tabId === undefined) {
        return sidePanel.open();
      }
      return sidePanel.open({ tabId });
    },
  };
}
