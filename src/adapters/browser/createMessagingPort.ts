import browser from "webextension-polyfill";
import type { Message, MessagingPort } from "@/ports/MessagingPort";

export function createMessagingPort(
  runtime: typeof browser.runtime = browser.runtime
): MessagingPort {
  return {
    async send(message: Message): Promise<unknown> {
      try {
        return await runtime.sendMessage(message);
      } catch {
        // A missing receiver ("Receiving end does not exist") is not fatal;
        // surface it as a silent no-op so callers do not have to guard.
        return undefined;
      }
    },
    onMessage(handler) {
      const listener = (
        message: unknown,
        _sender: unknown,
        sendResponse: (response?: unknown) => void
      ): boolean => {
        const reply = (response?: unknown) => {
          if (response !== undefined) {
            sendResponse(response);
          }
        };
        handler(message as Message, reply);
        return true;
      };
      runtime.onMessage.addListener(listener as never);
      return () => {
        runtime.onMessage.removeListener(listener as never);
      };
    },
    getLastError() {
      return (runtime as unknown as { lastError?: { message?: string } }).lastError;
    },
  };
}
