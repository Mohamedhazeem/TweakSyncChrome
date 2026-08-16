export type Message =
  | { action: "connect" }
  | { action: "injectContentScript" }
  | { action: "removeContentScript" }
  | { action: "apply"; apply: "styles" | "element" }
  | { action: "elementClicked"; details: unknown }
  | { action: "styleClicked"; styles: unknown }
  | { action: string; [key: string]: unknown };

export interface MessagingPort {
  send(message: Message): Promise<unknown>;
  onMessage(
    handler: (message: Message, reply?: (response?: unknown) => void) => void
  ): () => void;
  getLastError(): { message?: string } | undefined;
}
