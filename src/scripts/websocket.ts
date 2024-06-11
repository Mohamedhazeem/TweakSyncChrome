import {
  APPLY_ELEMENT_TO_VSCODE,
  APPLY_STYLES_TO_VSCODE,
  URL,
} from "../utils/constant";

export let ws: WebSocket;

export function initWebSocket() {
  if (!ws || ws.readyState === WebSocket.CLOSED) {
    ws = new WebSocket(URL);
    ws.addEventListener("error", () => {
      console.error("WebSocket connection error:");
    });
    ws.addEventListener("open", () => {
      console.log("WebSocket connection established.");
    });
    ws.addEventListener("close", () => {
      console.log("WebSocket connection closed xx.");
    });
    ws.addEventListener("message", () => {
      if (ws.readyState !== WebSocket.CLOSED) {
        console.log("WebSocket connection is open.");
      } else {
        console.error("WebSocket connection is not open.");
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
