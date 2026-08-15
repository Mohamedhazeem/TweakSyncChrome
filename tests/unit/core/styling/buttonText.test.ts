import { describe, expect, it } from "vitest";
import { getButtonText } from "@/core/styling/buttonText";
import type { Style } from "@/types/styleTypes";

const baseStyle = {
  nameForTitle: "Color",
  options: ["red", "green", "blue"],
} as unknown as Style;

describe("getButtonText", () => {
  it("returns the selected option when present (capitalized)", () => {
    expect(getButtonText("red", baseStyle, true)).toBe("Red");
  });

  it("returns the selected option when present (not capitalized)", () => {
    expect(getButtonText("green", baseStyle, false)).toBe("green");
  });

  it("falls back to 'Select <nameForTitle>' when option is absent", () => {
    expect(getButtonText("missing", baseStyle, true)).toBe("Select Color");
  });

  it("falls back for a non-array options value", () => {
    const stringOptions = {
      nameForTitle: "X",
      options: "red",
    } as unknown as Style;
    expect(getButtonText("color", stringOptions, true)).toBe("Select X");
  });

  it("falls back when option is empty", () => {
    expect(getButtonText("", baseStyle, false)).toBe("Select Color");
  });
});
