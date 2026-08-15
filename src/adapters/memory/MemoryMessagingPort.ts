import type { Message, MessagingPort } from "../../ports/MessagingPort";

type Handler = (message: Message, reply?: (response: unknown) => void) => void;

export class MemoryMessagingPort implements MessagingPort {
  private readonly handlers = new Set<Handler>();

  async send(message: Message): Promise<unknown> {
    for (const handler of [...this.handlers]) {
      handler(message);
    }
    return undefined;
  }

  onMessage(handler: Handler): () => void {
    this.handlers.add(handler);
    return () => {
      this.handlers.delete(handler);
    };
  }

  getLastError(): { message?: string } | undefined {
    return undefined;
  }
}
