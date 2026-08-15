import type { ElementStyles } from "@/types/elementTypes";
import type {
  ConnectionState,
  SyncMessage,
  SyncPayload,
  SyncTransportPort,
} from "@/ports/SyncTransportPort";
import { collectSelectorDeclarations, serializeDeclarations } from "./serializeStyles";

export interface StyleEditInput {
  elementId: string;
  styles: ElementStyles;
  selector: string;
  languageId?: string;
}

/**
 * Sync orchestration use case.
 *
 * It depends on `SyncTransportPort` only, so the very same code path drives the
 * real WebSocket adapter in the extension and the in-memory transport in tests.
 */
export class SyncService {
  private state: ConnectionState = "idle";

  constructor(private readonly transport: SyncTransportPort) {
    this.transport.onState((state) => {
      this.state = state;
    });
  }

  getState(): ConnectionState {
    return this.state;
  }

  connect(): Promise<void> {
    return this.transport.connect();
  }

  disconnect(): void {
    this.transport.disconnect();
  }

  onState(callback: (state: ConnectionState) => void): () => void {
    return this.transport.onState(callback);
  }

  onMessage(callback: (message: SyncMessage) => void): () => void {
    return this.transport.onMessage(callback);
  }

  /** Serialises the edited selector and ships it to the editor. */
  async sendStyleEdit(input: StyleEditInput): Promise<void> {
    if (!input.elementId) {
      throw new Error("Cannot sync a style edit without an element id");
    }

    const declarations = collectSelectorDeclarations(input.styles, input.selector);
    const payload: SyncPayload = {
      languageId: input.languageId ?? "css",
      elementId: input.elementId,
      serialized: serializeDeclarations(declarations),
    };

    await this.transport.send(payload);
  }

  /** Ships an already serialised payload. */
  send(payload: SyncPayload): Promise<void> {
    return this.transport.send(payload);
  }
}
