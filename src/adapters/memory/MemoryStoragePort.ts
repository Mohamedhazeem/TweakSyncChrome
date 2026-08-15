import type { StorageAreaPort, StoragePort } from "../../ports/StoragePort";

class MemoryArea implements StorageAreaPort {
  private readonly store = new Map<string, unknown>();

  async get(key: string | string[] | null): Promise<Record<string, unknown>> {
    if (key === null) {
      return Object.fromEntries(this.store);
    }
    const keys = Array.isArray(key) ? key : [key];
    const result: Record<string, unknown> = {};
    for (const k of keys) {
      if (this.store.has(k)) {
        result[k] = this.store.get(k);
      }
    }
    return result;
  }

  async set(items: Record<string, unknown>): Promise<void> {
    for (const [k, v] of Object.entries(items)) {
      this.store.set(k, v);
    }
  }

  async remove(key: string | string[]): Promise<void> {
    const keys = Array.isArray(key) ? key : [key];
    for (const k of keys) {
      this.store.delete(k);
    }
  }
}

export class MemoryStoragePort implements StoragePort {
  readonly session = new MemoryArea();
  readonly local = new MemoryArea();
}
