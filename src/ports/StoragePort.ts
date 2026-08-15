export interface StorageAreaPort {
  get(key: string | string[] | null): Promise<Record<string, unknown>>;
  set(items: Record<string, unknown>): Promise<void>;
  remove(key: string | string[]): Promise<void>;
}

export interface StoragePort {
  session: StorageAreaPort;
  local: StorageAreaPort;
}
