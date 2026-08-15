import {
  injectContentScript,
  reinjectContentScript,
  removeContentScript,
} from "../scripts/contentScriptInjectAndRemove";
import {
  applyElementToVscode,
  applyStylesToVscode,
  initWebSocket,
  isSocketOpen,
} from "../scripts/websocket";
// chrome.sidePanel
//   .setPanelBehavior({ openPanelOnActionClick: true })
//   .then(() => {
//     if (ws) {
//       console.log("WebSocket-0");
//       initWebSocket();
//     } else {
//       console.log("WebSocket-1");
//     }
//   })
//   .catch((error) => console.error(error));

// function closeSidePanel() {
//   chrome.sidePanel
//     .setPanelBehavior({ openPanelOnActionClick: true })
//     .catch((error) => console.error(error));
// }
chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case "open":
      OpenSidePanel();
      break;
    case "connect":
      initWebSocket();
      break;
    case "start_edit":
      injectContentScript();
      break;
    case "stop_edit":
      removeContentScript();
      break;
    default:
      console.log("Unknown command:", command);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    reinjectContentScript();
  } else if (changeInfo.status === "loading" && tab.active) {
    chrome.sidePanel
      .getOptions({ tabId })
      .then((options) => {
        if (options.enabled) {
          // closeSidePanel();

          chrome.runtime
            .sendMessage({
              action: "resetInspector",
              message: null,
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log("Error getting side panel:", error);
      });
  }
});
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.session.get([`contentScriptInjected_${tabId}`], (result) => {
    if (result[`contentScriptInjected_${tabId}`]) {
      chrome.storage.session.remove([`contentScriptInjected_${tabId}`]);
    }
  });
});

chrome.windows.onRemoved.addListener((windowId) => {
  chrome.tabs.query({ windowId: windowId }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.storage.session.get([`contentScriptInjected_${tab.id}`], (result) => {
        if (result[`contentScriptInjected_${tab.id}`]) {
          chrome.storage.session.remove([`contentScriptInjected_${tab.id}`]);
        }
      });
    });
  });
});

chrome.action.onClicked.addListener(() => {
  OpenSidePanel();
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
function apply(tabId: number, sendResponse: (response?: unknown) => void, applyFor: string) {
  chrome.tabs.sendMessage(
    tabId,
    { action: applyFor === "styles" ? "getUpdatedStyle" : "getUpdatedElement" },
    (response) => {
      if (response && response.status !== "error") {
        if (isSocketOpen()) {
          console.log(response);
          applyFor === "styles" ? applyStylesToVscode(response) : applyElementToVscode(response);
          sendResponse({ status: "success" });
        } else {
          console.log("Connection is not open");
          chrome.runtime.sendMessage({
            action: "webSocketConnectionError",
            toast:
              "Connection error. Please check your connection on both TweakSync VS Code and the TweakSync Chrome extension before apply.",
          });
          sendResponse({
            status: "error",
            message: "Connection is not open",
          });
        }
      } else {
        console.error("No response received for apply or an error occurred:", response);
        sendResponse({
          status: "error",
          message: "No response received or an error occurred",
        });
      }
    }
  );
}
function OpenSidePanel() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    if (tabs.length > 0) {
      const currentTab = tabs[0];
      chrome.sidePanel.setOptions({
        tabId: currentTab.id,
        path: "index.html",
      });
      chrome.sidePanel.open({ tabId: currentTab.id || 0 });
    }
  });
}
function getUpdatedDetails(
  tabId: number,
  sendResponse: (response?: unknown) => void,
  applyFor: string
) {
  chrome.tabs.sendMessage(
    tabId,
    { action: applyFor === "styles" ? "getUpdatedStyle" : "getUpdatedElement" },
    (response) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          message: "Runtime error",
        });
        return;
      }
      if (response) {
        if (response.status !== "error") {
          sendResponse({
            status: "success",
            ...(applyFor === "styles"
              ? { styles: response.styles }
              : { details: response.details }),
          });
        } else {
          sendResponse({
            message: "Error occurred: " + response.message,
          });
        }
      } else {
        sendResponse({
          message: "No response received",
        });
      }
    }
  );
}
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "connect") {
    initWebSocket();
    sendResponse();
    return true;
  } else if (message.action === "elementClicked") {
    chrome.runtime.sendMessage({
      action: "showElementDetails",
      details: message.details,
    });
    sendResponse();
    return true;
  } else if (message.action === "styleClicked") {
    console.log("Clicked element styles:", message.styles);
    chrome.runtime.sendMessage({
      action: "showElementStyles",
      styles: message.styles,
    });
    sendResponse({ status: message.styles });
    return true;
  } else if (message.action === "injectContentScript") {
    injectContentScript();
    sendResponse();
    return true;
  } else if (message.action === "removeContentScript") {
    removeContentScript();
    sendResponse();
    return true;
  } else if (message.action === "addSelector") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, {
        action: "addSelector",
        selector: message.selector,
      });
    });
    sendResponse();
    return true;
  } else if (message.action === "renameSelector") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, {
        action: "renameSelector",
        oldSelector: message.oldSelector,
        newSelector: message.newSelector,
      });
    });
    sendResponse();
    return true;
  } else if (
    message.action === "updateTextContent" ||
    message.action === "updateStyles" ||
    message.action === "updateAttributes"
  ) {
    if (message.name === "data-*") {
      Object.entries(message.value).map(([key, value], index) =>
        console.log(`key: ${key}, value: ${value} and index: ${index}`)
      );
    }
    update(message, sendResponse);
    sendResponse();
    return true;
  } else if (message.action === "apply") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        return;
      }
      apply(tabs[0].id!, sendResponse, message.apply);
    });
    sendResponse();
    return true;
  } else if (message.action === "getUpdatedDetails") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        return;
      }
      getUpdatedDetails(tabs[0].id!, sendResponse, message.apply);
    });
    sendResponse();
    return true;
  } else if (message.action === "getElementTemporaryId") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id!,
        {
          action: "getElementTemporaryId",
        },
        (response) => {
          sendResponse({ temporaryId: response.temporaryId, textContent: response.textContent });
        }
      );
    });
    return true;
  }
});
