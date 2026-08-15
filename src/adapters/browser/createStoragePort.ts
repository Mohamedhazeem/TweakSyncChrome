import browser from "webextension-polyfill";
import type { StorageAreaPort, StoragePort } from "@/ports/StoragePort";

function createStorageArea(area: browser.Storage.StorageArea): StorageAreaPort {
  return {
    get(key) {
      return area.get(key as never) as Promise<Record<string, unknown>>;
    },
    set(items) {
      return area.set(items);
    },
    remove(key) {
      return area.remove(key);
    },
  };
}

export function createStoragePort(
  storage: typeof browser.storage = browser.storage
): StoragePort {
  return {
    session: createStorageArea(storage.session),
    local: createStorageArea(storage.local),
  };
}
