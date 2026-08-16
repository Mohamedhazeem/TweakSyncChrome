import { createExtensionComposition } from "./composition";
import {
  APPLY_ELEMENT_TO_VSCODE,
  APPLY_STYLES_TO_VSCODE,
  isSyncMessageAction,
} from "@/core/sync/syncActions";

/**
 * Service worker entry point (clean architecture).
 *
 * Wires the runtime through `createExtensionComposition()` so the only browser
 * globals live in the adapters. The VS Code sync socket is the managed
 * `WebSocketSyncAdapter` (single socket, reconnect with backoff, bounded send
 * queue) — the legacy `src/scripts/websocket.ts` is gone. Inbound editor
 * messages and connection-state changes are forwarded to the UI as toasts
 * through the `MessagingPort`.
 */
const composition = createExtensionComposition();
const browser = composition.browser;
const transport = composition.syncTransport;

const CONTENT_SCRIPT_FILE = "scripts/content.js";
const injectedKey = (tabId: number) => `contentScriptInjected_${tabId}`;

type Reply = (response?: unknown) => void;
type RawMessage = Record<string, unknown>;

// --- Content-script injection -------------------------------------------

async function executeContentScript(tabId: number, url: string): Promise<void> {
  if (url.startsWith("chrome://")) {
    await browser.messaging.send({
      action: "contentScriptCantInjected",
      toast:
        "Unable to apply changes to the current page. Please ensure you are on a supported page or try again later.",
    });
    return;
  }
  try {
    await browser.scripting.inject({ target: { tabId }, files: [CONTENT_SCRIPT_FILE] });
    await browser.messaging.send({
      action: "contentScriptInjected",
      toast: "Editing has started successfully!",
    });
    await browser.tabs.sendMessage(tabId, {
      action: "isContentScriptEditable",
      isEditable: true,
    });
  } catch {
    console.warn("Failed to inject content script");
  }
}

async function injectContentScript(): Promise<void> {
  const active = await browser.tabs.queryActive();
  if (active?.id === undefined) {
    return;
  }
  const key = injectedKey(active.id);
  const result = await browser.storage.session.get([key]);
  if (!result[key]) {
    await executeContentScript(active.id, active.url);
    await browser.storage.session.set({ [key]: true });
  } else {
    await browser.messaging.send({
      action: "contentScriptInjected",
      toast: "Editing already started",
    });
  }
}

async function reinjectContentScript(): Promise<void> {
  const active = await browser.tabs.queryActive();
  if (active?.id === undefined) {
    return;
  }
  const key = injectedKey(active.id);
  const result = await browser.storage.session.get([key]);
  if (result[key]) {
    await browser.storage.session.remove([key]);
    await browser.storage.session.set({ [key]: true });
    await executeContentScript(active.id, active.url);
  }
}

async function removeContentScript(): Promise<void> {
  const active = await browser.tabs.queryActive();
  if (active?.id === undefined) {
    return;
  }
  const key = injectedKey(active.id);
  const result = await browser.storage.session.get([key]);
  if (result[key]) {
    await browser.storage.session.remove([key]);
    await browser.tabs.sendMessage(active.id, {
      action: "isContentScriptEditable",
      isEditable: false,
    });
    await browser.messaging.send({
      action: "contentScriptCantInjected",
      toast: "Editing stopped.",
    });
  }
}

// --- Side panel ----------------------------------------------------------

async function openSidePanel(): Promise<void> {
  const active = await browser.tabs.queryActive();
  if (active?.id === undefined) {
    return;
  }
  await browser.sidePanel.setOptions({ tabId: active.id, path: "index.html" });
  await browser.sidePanel.open(active.id);
}

// --- Apply / inspect forwarding -----------------------------------------

async function forwardToActiveTab(message: unknown): Promise<void> {
  const active = await browser.tabs.queryActive();
  if (active?.id !== undefined) {
    await browser.tabs.sendMessage(active.id, message);
  }
}

async function apply(
  tabId: number,
  applyFor: string,
  sendResponse: Reply
): Promise<void> {
  try {
    const response = (await browser.tabs.sendMessage(tabId, {
      action: applyFor === "styles" ? "getUpdatedStyle" : "getUpdatedElement",
    })) as RawMessage | undefined;

    if (response && response.status !== "error") {
      if (transport.getState() === "connected") {
        if (applyFor === "styles") {
          await transport.sendRaw({ action: APPLY_STYLES_TO_VSCODE, styles: response });
        } else {
          await transport.sendRaw({ action: APPLY_ELEMENT_TO_VSCODE, details: response });
        }
        sendResponse({ status: "success" });
      } else {
        await browser.messaging.send({
          action: "webSocketConnectionError",
          toast:
            "Connection error. Please check your connection on both TweakSync VS Code and the TweakSync Chrome extension before apply.",
        });
        sendResponse({ status: "error", message: "Connection is not open" });
      }
    } else {
      sendResponse({ status: "error", message: "No response received or an error occurred" });
    }
  } catch {
    sendResponse({ status: "error", message: "No response received or an error occurred" });
  }
}

async function getUpdatedDetails(
  tabId: number,
  applyFor: string,
  sendResponse: Reply
): Promise<void> {
  try {
    const response = (await browser.tabs.sendMessage(tabId, {
      action: applyFor === "styles" ? "getUpdatedStyle" : "getUpdatedElement",
    })) as RawMessage | undefined;

    if (!response) {
      sendResponse({ message: "No response received" });
      return;
    }
    if (response.status === "error") {
      sendResponse({ message: "Error occurred: " + String(response.message) });
      return;
    }
    sendResponse({
      status: "success",
      ...(applyFor === "styles"
        ? { styles: response.styles }
        : { details: response.details }),
    });
  } catch {
    sendResponse({ message: "Runtime error" });
  }
}

// --- Command + tab/window lifecycle -------------------------------------

browser.runtime.onCommand((command) => {
  switch (command) {
    case "open":
      void openSidePanel();
      break;
    case "connect":
      void transport.connect();
      break;
    case "start_edit":
      void injectContentScript();
      break;
    case "stop_edit":
      void removeContentScript();
      break;
    default:
      console.log("Unknown command:", command);
  }
});

browser.tabs.onUpdated((tabId, changeInfo, tab) => {
  const info = changeInfo as { status?: string };
  const isActive = (tab as { active?: boolean }).active === true;
  if (info.status === "complete" && isActive) {
    void reinjectContentScript();
  } else if (info.status === "loading" && isActive) {
    void browser.sidePanel.getOptions(tabId).then((options) => {
      if (options.enabled) {
        void browser.messaging.send({ action: "resetInspector", message: null });
      }
    });
  }
});

browser.tabs.onRemoved((tabId) => {
  void browser.storage.session.remove([injectedKey(tabId)]);
});

browser.windows.onRemoved((windowId) => {
  void browser.tabs.queryByWindow(windowId).then((tabs) => {
    for (const tab of tabs) {
      if (tab.id !== undefined) {
        void browser.storage.session.remove([injectedKey(tab.id)]);
      }
    }
  });
});

browser.action.onClicked(() => {
  void openSidePanel();
});

// --- Sync transport events -> UI toasts ---------------------------------

transport.onState((state) => {
  switch (state) {
    case "connected":
      void browser.messaging.send({
        action: "webSocketConnectionOpen",
        toast: "Connection established successfully! TweakSync is now connected with VS Code.",
      });
      break;
    case "reconnecting":
      void browser.messaging.send({
        action: "webSocketConnectionClose",
        toast: "Connection Lost. TweakSync is no longer connected with VS Code.",
      });
      break;
    case "error":
      void browser.messaging.send({
        action: "webSocketReconnectionFailed",
        toast:
          "Failed to reconnect after multiple attempts. Please check your connection and try again.",
      });
      break;
    default:
      break;
  }
});

transport.onMessage((message) => {
  const action = message.action;
  if (typeof action === "string" && isSyncMessageAction(action)) {
    void browser.messaging.send({ action, toast: String((message as RawMessage).message ?? "") });
  }
});

// --- Runtime message bus -------------------------------------------------

browser.messaging.onMessage((rawMessage, reply) => {
  const message = rawMessage as RawMessage;
  const action = message.action;

  if (action === "connect") {
    void transport.connect();
    reply?.();
    return;
  }
  if (action === "elementClicked") {
    void browser.messaging.send({
      action: "showElementDetails",
      details: message.details,
    });
    reply?.();
    return;
  }
  if (action === "styleClicked") {
    void browser.messaging.send({ action: "showElementStyles", styles: message.styles });
    reply?.();
    return;
  }
  if (action === "injectContentScript") {
    void injectContentScript();
    reply?.();
    return;
  }
  if (action === "removeContentScript") {
    void removeContentScript();
    reply?.();
    return;
  }
  if (action === "addSelector") {
    void forwardToActiveTab({ action: "addSelector", selector: message.selector });
    reply?.();
    return;
  }
  if (action === "renameSelector") {
    void forwardToActiveTab({
      action: "renameSelector",
      oldSelector: message.oldSelector,
      newSelector: message.newSelector,
    });
    reply?.();
    return;
  }
  if (
    action === "updateTextContent" ||
    action === "updateStyles" ||
    action === "updateAttributes"
  ) {
    void forwardToActiveTab(message);
    reply?.();
    return;
  }
  if (action === "apply") {
    void browser.tabs.queryActive().then((active) => {
      if (active?.id !== undefined) {
        void apply(active.id, message.apply as string, (response) => reply?.(response));
      }
    });
    reply?.();
    return;
  }
  if (action === "getUpdatedDetails") {
    void browser.tabs.queryActive().then((active) => {
      if (active?.id !== undefined) {
        void getUpdatedDetails(active.id, message.apply as string, (response) =>
          reply?.(response)
        );
      }
    });
    reply?.();
    return;
  }
  if (action === "getElementTemporaryId") {
    void browser.tabs.queryActive().then((active) => {
      if (active?.id !== undefined) {
        void browser.tabs
          .sendMessage(active.id, { action: "getElementTemporaryId" })
          .then((response) => {
            const resp = response as RawMessage | undefined;
            reply?.({
              temporaryId: resp?.temporaryId,
              textContent: resp?.textContent,
            });
          });
      }
    });
    reply?.();
    return;
  }
});
