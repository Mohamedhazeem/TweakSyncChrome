import { describe, expect, it } from "vitest";
import {
  createEmptyElementStyles,
  ensureAtRuleBucket,
  ensureBucket,
} from "@/core/styling/styleState";
import { clearGroupProperty, setStyleValue } from "@/core/styling/elementStyleState";

describe("styleState helpers", () => {
  it("creates independent empty state objects", () => {
    const a = createEmptyElementStyles();
    const b = createEmptyElementStyles();
    expect(a).not.toBe(b);
    expect(a.inline).toEqual({});
  });

  it("lazily ensures an at-rule bucket", () => {
    const s = createEmptyElementStyles();
    const bag = ensureAtRuleBucket(s, "@media", ".x");
    bag.color = "red";
    expect(s.external.atRules["@media"][".x"].color).toBe("red");
  });

  it("sets inline and external values without scanning rules", () => {
    const s = createEmptyElementStyles();
    const inlineNext = setStyleValue(s, "inline", "color", "red");
    expect(inlineNext.inline.color).toBe("red");

    ensureBucket(s, "classes", ".a").color = "red";
    const bucketNext = setStyleValue(s, ".a", "color", "blue");
    expect(bucketNext.external.classes[".a"].color).toBe("blue");
  });

  it("clears a property from external groups only", () => {
    const s = createEmptyElementStyles();
    ensureBucket(s, "classes", ".a").color = "red";
    const next = clearGroupProperty(s, ".a", "color");
    expect(
      (next.external.classes[".a"] as Record<string, unknown>).color
    ).toBeUndefined();
  });
});
