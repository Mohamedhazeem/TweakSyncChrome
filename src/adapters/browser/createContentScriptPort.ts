import browser from "webextension-polyfill";
import type { ContentScriptPort, InjectOptions } from "@/ports/ContentScriptPort";

export function createContentScriptPort(
  scripting: typeof browser.scripting = browser.scripting
): ContentScriptPort & { insertCSS(options: InjectOptions): Promise<void> } {
  return {
    inject(options: InjectOptions) {
      return scripting.executeScript({
        target: options.target,
        files: options.files,
      }) as unknown as Promise<void>;
    },
    remove(options: InjectOptions) {
      return scripting.removeCSS({
        target: options.target,
        files: options.files,
      }) as unknown as Promise<void>;
    },
    insertCSS(options: InjectOptions) {
      return scripting.insertCSS({
        target: options.target,
        files: options.files,
      }) as unknown as Promise<void>;
    },
  };
}
