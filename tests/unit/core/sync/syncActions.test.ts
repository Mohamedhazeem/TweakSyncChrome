import { describe, expect, it } from "vitest";
import {
  APPLY_ELEMENT_TO_VSCODE,
  SYNC_PORT,
  SYNC_URL,
  isSyncMessageAction,
} from "@/core/sync/syncActions";

describe("syncActions", () => {
  it("exposes the fixed sync endpoint", () => {
    expect(SYNC_PORT).toBe(16016);
    expect(SYNC_URL).toBe("ws://127.0.0.1:16016");
    expect(APPLY_ELEMENT_TO_VSCODE).toBe("applyElementToVscode");
  });

  it("accepts known editor message actions", () => {
    expect(isSyncMessageAction("appliedStyleSucessfully")).toBe(true);
  });

  it("rejects unknown or non-string actions", () => {
    expect(isSyncMessageAction("nope")).toBe(false);
    expect(isSyncMessageAction(123)).toBe(false);
  });
});
