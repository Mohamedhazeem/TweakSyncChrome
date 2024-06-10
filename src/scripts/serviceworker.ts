import {
  injectContentScript,
  reinjectContentScript,
  removeContentScript,
} from "./contentScriptInjectAndRemove";
import {
  applyElementToVscode,
  applyStylesToVscode,
  initWebSocket,
  isSocketOpen,
} from "./websocket";

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener((_tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    reinjectContentScript();
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.local.get([`contentScriptInjected_${tabId}`], (result) => {
    if (result[`contentScriptInjected_${tabId}`]) {
      chrome.storage.local.remove([`contentScriptInjected_${tabId}`]);
    }
  });
});

chrome.windows.onRemoved.addListener((windowId) => {
  chrome.tabs.query({ windowId: windowId }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.storage.local.get(
        [`contentScriptInjected_${tab.id}`],
        (result) => {
          if (result[`contentScriptInjected_${tab.id}`]) {
            chrome.storage.local.remove([`contentScriptInjected_${tab.id}`]);
          }
        }
      );
    });
  });
});

chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    if (tabs.length > 0) {
      const currentTab = tabs[0];
      chrome.sidePanel.setOptions({
        tabId: currentTab.id,
        path: "index.html",
        enabled: true,
      });
    }
  });
});
function update(message: object, sendResponse: (response?: unknown) => void) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
        sendResponse(response);
      });
    }
  });
  return true;
}
function apply(
  tabId: number,
  sendResponse: (response?: unknown) => void,
  applyFor: string
) {
  chrome.tabs.sendMessage(
    tabId,
    { action: applyFor === "styles" ? "getUpdatedStyle" : "getUpdatedElement" },
    (response) => {
      if (chrome.runtime.lastError) {
        console.error(
          "Error sending message to content script:",
          chrome.runtime.lastError.message
        );
        sendResponse({
          status: "error",
          message: chrome.runtime.lastError.message,
        });
        return;
      }

      console.log("Response from content script:", response);

      if (response && response.status !== "error") {
        if (isSocketOpen()) {
          console.log("Sending applyStylesToVscode");
          console.log(response);
          applyFor === "styles"
            ? applyStylesToVscode(response)
            : applyElementToVscode(response);
          sendResponse({ status: "success" });
        } else {
          console.error("WebSocket is not open");
          sendResponse({
            status: "error",
            message: "WebSocket is not open",
          });
        }
      } else {
        console.error(
          "No response received for apply or an error occurred:",
          response
        );
        sendResponse({
          status: "error",
          message: "No response received or an error occurred",
        });
      }
    }
  );
}
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "connect") {
    initWebSocket();
    console.log("Web socket connected");
  } else if (message.action === "elementClicked") {
    console.log("Clicked element details:", message.details);

    chrome.runtime.sendMessage({
      action: "showElementDetails",
      details: message.details,
    });
    sendResponse({ status: "element details received" });
  } else if (message.action === "styleClicked") {
    console.log("Clicked element styles:", message.styles);

    chrome.runtime.sendMessage({
      action: "showElementStyles",
      styles: message.styles,
    });
    sendResponse({ status: "element styles received" });
  } else if (message.action === "injectContent") {
    injectContentScript();
  } else if (message.action === "resetContentScriptInjected") {
    removeContentScript();
  } else if (
    message.action === "updateTextContent" ||
    message.action === "updateStyles"
  ) {
    update(message, sendResponse);
  } else if (message.action === "apply") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        return;
      }
      apply(tabs[0].id!, sendResponse, message.apply);
    });
    return true;
  }
});
