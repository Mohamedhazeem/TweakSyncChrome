import {
  injectContentScript,
  reinjectContentScript,
  removeContentScript,
} from "./contentScriptInjectAndRemove";
import { initWebSocket, ws } from "./websocket";

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

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "connect") {
    initWebSocket();
    console.log("Web socket connected");
    ws.onopen = () => {
      ws.send(JSON.stringify({ hello: "hello" }));
    };
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
  } else if (message.action === "updateTextContent") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
          sendResponse(response);
        });
      }
    });
    return true;
  } else if (message.action === "updateStyles") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
          sendResponse(response);
        });
      }
    });
    return true;
  } else if (message.action === "apply") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        return;
      }
      if (message.apply === "element") {
        chrome.tabs.sendMessage(
          tabs[0].id!,
          { action: "getUpdatedElement" },
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
              if (ws && ws.readyState === WebSocket.OPEN) {
                console.log("Sending applyElementToVscode");
                ws.send(
                  JSON.stringify({
                    action: "applyElementToVscode",
                    details: response,
                  })
                );
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
                "No response received for getUpdatedDetails or an error occurred:",
                response
              );
              sendResponse({
                status: "error",
                message: "No response received or an error occurred",
              });
            }
          }
        );
      } else if (message.apply === "styles") {
        chrome.tabs.sendMessage(
          tabs[0].id!,
          { action: "getUpdatedStyle" },
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
              if (ws && ws.readyState === WebSocket.OPEN) {
                console.log("Sending applyStylesToVscode");
                console.log(response);
                ws.send(
                  JSON.stringify({
                    action: "applyStylesToVscode",
                    styles: response,
                  })
                );
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
                "No response received for getUpdatedDetails or an error occurred:",
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
    });
    return true;
  }
});
