/** Wire protocol constants shared with the TweakSync VS Code extension. */
export const SYNC_PORT = 16016;
const SYNC_HOST = "127.0.0.1";
export const SYNC_URL = `ws://${SYNC_HOST}:${SYNC_PORT}`;

export const APPLY_ELEMENT_TO_VSCODE = "applyElementToVscode";
export const APPLY_STYLES_TO_VSCODE = "applyStylesToVscode";

/** Messages the editor can push back to the extension. */
export const SYNC_MESSAGE_ACTIONS = [
  "noSelectedCssFiles",
  "appliedElementSucessfully",
  "appliedStyleSucessfully",
  "failedToApply",
] as const;

export type SyncMessageAction = (typeof SYNC_MESSAGE_ACTIONS)[number];

const SYNC_MESSAGE_ACTION_SET: Set<string> = new Set(SYNC_MESSAGE_ACTIONS);

/** O(1) check that an inbound editor message is one we understand. */
export function isSyncMessageAction(action: unknown): action is SyncMessageAction {
  return typeof action === "string" && SYNC_MESSAGE_ACTION_SET.has(action);
}
