export type ConnectionState =
  | "idle"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "error";

export interface SyncPayload {
  languageId: string;
  elementId: string;
  serialized: string;
}

export interface SyncMessage {
  type: string;
  payload?: unknown;
  [key: string]: unknown;
}

export interface SyncTransportPort {
  connect(): Promise<void>;
  disconnect(): void;
  send(payload: SyncPayload): Promise<void>;
  onState(cb: (state: ConnectionState) => void): () => void;
  onMessage(cb: (message: SyncMessage) => void): () => void;
}
