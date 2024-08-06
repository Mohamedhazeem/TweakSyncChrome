import { APPLY_ELEMENT_TO_VSCODE, APPLY_STYLES_TO_VSCODE, URL } from "../utils/constant";

export let ws: WebSocket;

export function initWebSocket() {
  if (!ws || ws.readyState === WebSocket.CLOSED) {
    ws = new WebSocket(URL);
    ws.addEventListener("error", () => {
      chrome.runtime.sendMessage({
        action: "webSocketConnectionError",
        toast:
          "Connection error. Please check your connection on both TweakSync VS Code and the TweakSync Chrome extension.",
      });
    });
    ws.addEventListener("open", () => {
      chrome.runtime.sendMessage({
        action: "webSocketConnectionOpen",
        toast: "Connection established successfully! TweakSync is now connected with VS Code.",
      });
    });
    ws.addEventListener("close", () => {
      chrome.runtime.sendMessage({
        action: "webSocketConnectionClose",
        toast: "Connection Lost. TweakSync is no longer connected with VS Code.",
      });
    });
    ws.addEventListener("message", () => {
      if (ws.readyState !== WebSocket.CLOSED) {
        console.log("WebSocket connection is open.");
      } else {
        console.log("WebSocket connection is not open.");
      }
    });
  }
}
// function reconnectWebSocket() {
//   setTimeout(() => {
//     console.log("Reconnecting WebSocket...");
//     initWebSocket();
//   }, 1000);
// }
export function isSocketOpen() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    return true;
  }
  return false;
}
export function applyElementToVscode(response: object) {
  ws.send(
    JSON.stringify({
      action: APPLY_ELEMENT_TO_VSCODE,
      details: response,
    })
  );
}
export function applyStylesToVscode(response: object) {
  ws.send(
    JSON.stringify({
      action: APPLY_STYLES_TO_VSCODE,
      styles: response,
    })
  );
}
