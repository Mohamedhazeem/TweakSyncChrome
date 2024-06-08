// import { ElementDetails } from "../types/ElementDetailTypes";

const messageQueue: string[] = [];

function addToQueue(message: string) {
  console.log(message);
  messageQueue.push(message);
}

function processQueue() {
  while (messageQueue.length > 0) {
    const message = messageQueue.shift();
    console.log("Message from VS Code (queued):", message);
    chrome.runtime.sendMessage({ action: "receivedMessage", data: message });
  }
}
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

function injectContentScript(tabId: number) {
  chrome.scripting.executeScript(
    {
      target: { tabId },
      files: ["scripts/content.js"],
    },
    () => {
      console.log("working");
      //setTimeout(()=> chrome.runtime.sendMessage({action: 'initContentScript' }), 1000)
    }
  );
}

function cleanupContentScript() {
  chrome.runtime.sendMessage({ action: "cleanupContentScript" });
}

function removeContentScript() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const currentTab = tabs[0];
    chrome.storage.local.get(
      [`contentScriptInjected_${currentTab.id}`],
      (result) => {
        if (result[`contentScriptInjected_${currentTab.id}`]) {
          cleanupContentScript();
          chrome.storage.local
            .remove([`contentScriptInjected_${currentTab.id}`])
            .then((result) => console.log(result));
        }
      }
    );
  });
}

chrome.tabs.onUpdated.addListener((_tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    removeContentScript();
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

let ws: WebSocket;

function initWebSocket() {
  if (!ws || ws.readyState === WebSocket.CLOSED) {
    ws = new WebSocket("ws://localhost:8000");
    ws.addEventListener("error", () => {
      console.error("WebSocket connection error:");
    });
    ws.addEventListener("open", () => {
      console.log("WebSocket connection established.");
    });
    ws.addEventListener("close", () => {
      console.log("WebSocket connection closed.");
    });
    ws.addEventListener("message", (event) => {
      if (ws.readyState !== WebSocket.CLOSED) {
        const buffer = event.data;
        addToQueue(buffer);
        chrome.runtime.sendMessage({ action: "receivedMessage", data: buffer });
      } else {
        console.error("WebSocket connection is not open.");
      }
    });
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "connect") {
    initWebSocket();
    console.log("Web socket connected");
    ws.onopen = () => {
      ws.send(JSON.stringify({ hello: "hello" }));
    };
  } else if (message.action === "refresh") {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ hello_refresh: "hello" }));
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        if (tabs.length > 0) {
          const tabId = tabs[0].id;
          chrome.tabs.reload(tabId!);
        }
      });

      processQueue();
    }
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
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      if (tabs.length > 0) {
        const currentTab = tabs[0];
        console.log("injectContent script");
        chrome.storage.local
          .get([`contentScriptInjected_${currentTab.id}`])
          .then((result) => {
            if (!result[`contentScriptInjected_${currentTab.id}`]) {
              injectContentScript(currentTab.id!);
              chrome.storage.local.set({
                [`contentScriptInjected_${currentTab.id}`]: true,
              });
            }
          });
      }
    });
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
    // Handle the message to update styles

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
