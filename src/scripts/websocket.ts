export let ws: WebSocket;

export function initWebSocket() {
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
    ws.addEventListener("message", () => {
      if (ws.readyState !== WebSocket.CLOSED) {
        console.log("WebSocket connection is open.");
      } else {
        console.error("WebSocket connection is not open.");
      }
    });
  }
}
