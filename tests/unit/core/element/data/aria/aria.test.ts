import { describe, expect, it } from "vitest";
import { ARIA_ATTRIBUTES, getAriaAttribute } from "@/core/element/data/aria";
import { ARIA_ATTRIBUTES_CORE } from "@/core/element/data/aria/aria-core";
import { ARIA_ATTRIBUTES_LIVE } from "@/core/element/data/aria/aria-live";

describe("aria attribute data", () => {
  it("merges the core and live segments", () => {
    expect(ARIA_ATTRIBUTES.length).toBe(
      ARIA_ATTRIBUTES_CORE.length + ARIA_ATTRIBUTES_LIVE.length
    );
  });

  it("looks up an attribute by name (O(1))", () => {
    expect(getAriaAttribute("aria-live")?.name).toBe("aria-live");
    expect(getAriaAttribute("nope")).toBeUndefined();
  });
});
