import { describe, expect, it } from "vitest";
import { generateTemporaryId } from "@/core/element/temporaryId";

describe("generateTemporaryId", () => {
  it("returns a non-empty string", () => {
    expect(generateTemporaryId().length).toBeGreaterThan(0);
  });

  it("returns distinct ids across calls", () => {
    const ids = new Set(Array.from({ length: 50 }, () => generateTemporaryId()));
    expect(ids.size).toBeGreaterThan(1);
  });
});
