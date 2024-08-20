import { APPLY_ELEMENT_TO_VSCODE, APPLY_STYLES_TO_VSCODE, URL } from "../utils/constant";

export let ws: WebSocket;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;
const reconnectInterval = 1000;
const reconnectResetTimeout = 1000;

export function initWebSocket() {
  if (!ws || ws.readyState === WebSocket.CLOSED) {
    try {
      ws = new WebSocket(URL);

      ws.addEventListener("error", (error) => {
        console.log("WebSocket connection error:", error);
        if (reconnectAttempts == 0) {
          chrome.runtime.sendMessage({
            action: "webSocketConnectionError",
            toast:
              "Connection error. Please check your connection on both TweakSync VS Code and the TweakSync Chrome extension.",
          });
        }
        reconnectWebSocket();
      });

      ws.addEventListener("open", () => {
        console.log("TweakSync connection established.");
        chrome.runtime.sendMessage({
          action: "webSocketConnectionOpen",
          toast: "Connection established successfully! TweakSync is now connected with VS Code.",
        });

        reconnectAttempts = 0; // Reset attempts on successful connection
      });

      ws.addEventListener("close", () => {
        console.log("TweakSync connection closed.");
        // chrome.runtime.sendMessage({
        //   action: "webSocketConnectionClose",
        //   toast: "Connection Lost. TweakSync is no longer connected with VS Code.",
        // });
        // reconnectWebSocket();
      });

      ws.addEventListener("message", (event) => {
        console.log("Received message from WebSocket:", event.data);
      });
    } catch (error) {
      reconnectWebSocket();
    }
  }
}

function reconnectWebSocket() {
  if (reconnectAttempts < maxReconnectAttempts) {
    reconnectAttempts++;
    setTimeout(() => {
      console.log(
        `Attempting to reconnect WebSocket... (${reconnectAttempts}/${maxReconnectAttempts})`
      );
      initWebSocket();
    }, reconnectInterval);
  } else {
    console.log("Max reconnection attempts reached. Giving up.");
    chrome.runtime.sendMessage({
      action: "webSocketReconnectionFailed",
      toast:
        "Failed to reconnect after multiple attempts. Please check your connection and try again.",
    });

    // Reset the reconnect attempts after a timeout
    setTimeout(() => {
      console.log("Resetting reconnection attempts.");
      reconnectAttempts = 0;
    }, reconnectResetTimeout);
  }
}

// Function to manually reset reconnect attempts
export function resetReconnectAttempts() {
  reconnectAttempts = 0;
  console.log("Reconnection attempts have been manually reset.");
}

// Check if WebSocket is open
export function isSocketOpen(): boolean {
  return ws && ws.readyState === WebSocket.OPEN;
}

// Send element data to VS Code
export function applyElementToVscode(response: object) {
  if (isSocketOpen()) {
    ws.send(
      JSON.stringify({
        action: APPLY_ELEMENT_TO_VSCODE,
        details: response,
      })
    );
  } else {
    console.warn("TweakSync Connection is not open. Cannot send element data.");
  }
}

// Send style data to VS Code
export function applyStylesToVscode(response: object) {
  if (isSocketOpen()) {
    ws.send(
      JSON.stringify({
        action: APPLY_STYLES_TO_VSCODE,
        styles: response,
      })
    );
  } else {
    console.warn("TweakSync Connection is not open. Cannot send style data.");
  }
}
