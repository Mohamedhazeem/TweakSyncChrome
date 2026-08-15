import { describe, expect, it, vi } from "vitest";
import {
  processRule,
  readDeclarations,
  type StyleDeclarationLike,
} from "@/core/styling/processRule";
import {
  LONGHAND_TO_SHORTHANDS,
  SHORTHAND_ORDER,
  longHandDefaults,
  shorthandMap,
} from "@/core/styling/shortHandStyles";
import {
  applyStyleUpdates,
  applyStyleValue,
  type StyleWritable,
} from "@/core/styling/styleEngine";
import { createEmptyElementStyles, ensureBucket } from "@/core/styling/styleState";
import { classifySelector, handleValidSelector } from "@/core/styling/styleHandlers";
import {
  isDescendantSelector,
  isPseudoClassSelector,
  isPseudoElementSelector,
  isValidSelector,
} from "@/core/styling/selectorUtils";
import { GLOBAL_CSS_OPTION_SET, seperateCssOptions } from "@/core/styling/seperateCssOptions";
import { getHasStyles, groupStylesByStyleGroups } from "@/core/styling/styleGrouping";
import { clearGroupProperty, setStyleValue } from "@/core/styling/elementStyleState";
import { extractString, extractUnit, extractValue } from "@/core/styling/extractUnits";
import { NAMED_COLOR_SET, isColor, presetColors } from "@/core/styling/colorUtils";
import { GLOBAL_STYLES, STYLE_GROUPS, getGlobalStyle } from "@/core/styling/globalStyles";

function createDeclaration(properties: Record<string, string>): StyleDeclarationLike & {
  readCount: () => number;
} {
  const keys = Object.keys(properties);
  let reads = 0;
  return {
    length: keys.length,
    item: (index: number) => keys[index] ?? "",
    getPropertyValue: (property: string) => {
      reads += 1;
      return properties[property] ?? "";
    },
    readCount: () => reads,
  };
}

function createWritable(): StyleWritable & { calls: string[] } {
  const calls: string[] = [];
  return {
    calls,
    setProperty(property: string, value: string) {
      calls.push(`set:${property}=${value}`);
    },
    removeProperty(property: string) {
      calls.push(`remove:${property}`);
      return "";
    },
  };
}

describe("core/styling/shortHandStyles", () => {
  it("indexes longhands to shorthands with a Map for O(1) lookups", () => {
    expect(LONGHAND_TO_SHORTHANDS).toBeInstanceOf(Map);
    expect(LONGHAND_TO_SHORTHANDS.get("margin-top")).toContain("margin");
    expect(LONGHAND_TO_SHORTHANDS.get("overflow-x")).toContain("overflow");
    expect(LONGHAND_TO_SHORTHANDS.get("color")).toBeUndefined();
  });

  it("keeps the declaration order of the shorthand table", () => {
    expect(SHORTHAND_ORDER).toEqual(Object.keys(shorthandMap));
    expect(longHandDefaults["margin-top"]).toBe("0px");
  });
});

describe("core/styling/processRule", () => {
  it("reads each declared property exactly once (no shorthand table scan)", () => {
    const declaration = createDeclaration({ color: "red" });
    const context: Record<string, string> = {};

    processRule({ declaration, context });

    expect(declaration.readCount()).toBe(1);
    expect(context).toEqual({ color: "red" });
  });

  it("collapses identical longhands into a single shorthand value", () => {
    const declaration = createDeclaration({
      "margin-top": "0px",
      "margin-right": "0px",
      "margin-bottom": "0px",
      "margin-left": "0px",
    });
    const context: Record<string, string> = {};

    processRule({ declaration, context });

    expect(context).toEqual({ margin: "0px" });
  });

  it("fills missing longhands with defaults and joins them", () => {
    const declaration = createDeclaration({ "margin-top": "1px" });
    const context: Record<string, string> = {};

    processRule({ declaration, context });

    expect(context).toEqual({ margin: "1px 0px 0px 0px" });
  });

  it("preserves non-shorthand properties after the shorthands", () => {
    const declaration = createDeclaration({
      "overflow-x": "hidden",
      "overflow-y": "hidden",
      color: "blue",
    });
    const context: Record<string, string> = {};

    processRule({ declaration, context });

    expect(Object.keys(context)).toEqual(["overflow", "color"]);
    expect(context.overflow).toBe("hidden");
  });

  it("is a no-op without a context", () => {
    const declaration = createDeclaration({ color: "red" });
    expect(() => processRule({ declaration })).not.toThrow();
  });

  it("reads declarations into an ordered Map", () => {
    const declaration = createDeclaration({ a: "1", b: "2" });
    const result = readDeclarations(declaration);
    expect(result).toBeInstanceOf(Map);
    expect([...result.keys()]).toEqual(["a", "b"]);
  });
});

describe("core/styling/styleEngine", () => {
  it("preserves the legacy set/clear/remove semantics", () => {
    const target = createWritable();

    applyStyleValue(target, "color", "red");
    applyStyleValue(target, "color", undefined);
    applyStyleValue(target, "color", null);

    expect(target.calls).toEqual(["set:color=red", "set:color=", "remove:color"]);
  });

  it("applies updates in one pass using O(1) Map lookups", () => {
    const first = createWritable();
    const second = createWritable();
    const index = new Map<string, StyleWritable[]>([
      [".a", [first]],
      ["#b", [second]],
    ]);
    const lookups = vi.spyOn(index, "get");

    const result = applyStyleUpdates(index, [
      { selector: ".a", property: "color", value: "red" },
      { selector: "#b", property: "display", value: "flex" },
      { selector: ".missing", property: "color", value: "red" },
    ]);

    expect(lookups).toHaveBeenCalledTimes(3);
    expect(result.applied).toBe(2);
    expect(result.missing).toEqual([".missing"]);
    expect(first.calls).toEqual(["set:color=red"]);
    expect(second.calls).toEqual(["set:display=flex"]);
  });

  it("writes only to the first rule registered for a selector", () => {
    const first = createWritable();
    const second = createWritable();
    const index = new Map<string, StyleWritable[]>([[".a", [first, second]]]);

    applyStyleUpdates(index, [{ selector: ".a", property: "color", value: "red" }]);

    expect(first.calls).toHaveLength(1);
    expect(second.calls).toHaveLength(0);
  });
});

describe("core/styling/styleState", () => {
  it("creates an empty, independent style state", () => {
    const a = createEmptyElementStyles();
    const b = createEmptyElementStyles();
    a.external.classes[".x"] = { color: "red" };

    expect(b.external.classes).toEqual({});
    expect(a.temporaryId).toBe("");
    expect(Object.keys(a.external)).toEqual([
      "classes",
      "ids",
      "tags",
      "attribute",
      "descendant",
      "pseudoElementStyles",
      "pseudoClassStyles",
      "atRules",
    ]);
  });

  it("lazily creates buckets", () => {
    const styles = createEmptyElementStyles();
    const bucket = ensureBucket(styles, "classes", ".x");
    bucket.color = "red";
    expect(styles.external.classes[".x"]).toEqual({ color: "red" });
    expect(ensureBucket(styles, "classes", ".x")).toBe(bucket);
  });
});

describe("core/styling/selectorUtils", () => {
  it("classifies selector shapes", () => {
    expect(isDescendantSelector(".a .b")).toBe(true);
    expect(isDescendantSelector(".a>.b")).toBe(true);
    expect(isDescendantSelector(".a")).toBe(false);
    expect(isPseudoElementSelector("a::before")).toBe(true);
    expect(isPseudoClassSelector("a:hover")).toBe(true);
    expect(isPseudoClassSelector("a::before")).toBe(false);
  });

  it("delegates validity to an injected validator", () => {
    const validator = vi.fn();
    expect(isValidSelector("a:hover", validator)).toBe(true);
    expect(validator).toHaveBeenCalledWith("a");

    expect(
      isValidSelector("!!!", () => {
        throw new Error("bad selector");
      })
    ).toBe(false);
  });
});

describe("core/styling/styleHandlers", () => {
  const element = {
    matches: (selector: string) =>
      [".card", "#hero", "div", "[data-x]", "div::before", "div:hover", ".card .title"].includes(
        selector
      ),
  };

  it("skips empty and invalid selectors", () => {
    expect(handleValidSelector("", () => true)).toBe(true);
    expect(handleValidSelector("   ", () => true)).toBe(true);
    expect(handleValidSelector(".a", () => false)).toBe(true);
    expect(handleValidSelector(".a", () => true)).toBe(false);
  });

  it("routes descendant selectors to a single bucket", () => {
    expect(
      classifySelector({
        selector: ".card .title",
        element,
        classList: ["card"],
        elementId: "hero",
        tagName: "div",
      })
    ).toEqual([{ bucket: "descendant", key: ".card .title" }]);
  });

  it("routes class, id and tag selectors", () => {
    expect(
      classifySelector({
        selector: ".card",
        element,
        classList: ["card"],
        elementId: "hero",
        tagName: "div",
      })
    ).toEqual([{ bucket: "classes", key: ".card" }]);

    expect(
      classifySelector({
        selector: "#hero",
        element,
        classList: ["card"],
        elementId: "hero",
        tagName: "div",
      })
    ).toEqual([{ bucket: "ids", key: "#hero" }]);

    expect(
      classifySelector({
        selector: "div",
        element,
        classList: ["card"],
        elementId: "hero",
        tagName: "div",
      })
    ).toEqual([{ bucket: "tags", key: "div" }]);
  });

  it("routes attribute, pseudo-element and pseudo-class selectors", () => {
    expect(
      classifySelector({
        selector: "[data-x]",
        element,
        classList: [],
        elementId: "",
        tagName: "div",
      })
    ).toEqual([{ bucket: "attribute", key: "[data-x]" }]);

    expect(
      classifySelector({
        selector: "div::before",
        element,
        classList: [],
        elementId: "",
        tagName: "div",
      })
    ).toEqual([{ bucket: "pseudoElementStyles", key: "div::before" }]);

    expect(
      classifySelector({
        selector: "div:hover",
        element,
        classList: [],
        elementId: "",
        tagName: "div",
      })
    ).toEqual([{ bucket: "pseudoClassStyles", key: "div:hover" }]);
  });
});

describe("core/styling/seperateCssOptions", () => {
  it("splits global css keywords from specific options with a Set", () => {
    expect(GLOBAL_CSS_OPTION_SET).toBeInstanceOf(Set);
    const { specificCss, globalCss } = seperateCssOptions({
      name: "color",
      value: "",
      options: ["red", "inherit", "blue", "unset"],
    });
    expect(specificCss).toEqual(["red", "blue"]);
    expect(globalCss).toEqual(["inherit", "unset"]);
  });

  it("tolerates missing or non-array options", () => {
    expect(seperateCssOptions(undefined)).toEqual({ specificCss: [], globalCss: [] });
  });
});

describe("core/styling/styleGrouping", () => {
  it("groups properties by their style group in a single pass", () => {
    const grouped = groupStylesByStyleGroups({ margin: "0px" }, STYLE_GROUPS);
    expect(Object.keys(grouped)).toContain("Margin");
    expect(grouped.Margin.groups.some((style) => style.name === "margin")).toBe(true);
  });

  it("reports which selector buckets have styles", () => {
    const styles = createEmptyElementStyles();
    styles.external.classes[".a"] = { color: "red" };
    const flags = getHasStyles(styles);
    expect(flags[0]).toBe(true);
    expect(flags[1]).toBe(false);
  });
});

describe("core/styling/elementStyleState", () => {
  it("sets values on the matching selector bucket", () => {
    const styles = createEmptyElementStyles();
    styles.external.classes[".a"] = { color: "red" };

    const next = setStyleValue(styles, ".a", "color", "blue");
    expect(next.external.classes[".a"].color).toBe("blue");

    const inline = setStyleValue(styles, "inline", "color", "green");
    expect(inline.inline.color).toBe("green");
  });

  it("clears values when null is supplied", () => {
    const styles = createEmptyElementStyles();
    styles.external.ids["#a"] = { color: "red" };

    const next = setStyleValue(styles, "#a", "color", null);
    expect(next.external.ids["#a"].color).toBe("");
  });

  it("removes a property from every bucket of a selector", () => {
    const styles = createEmptyElementStyles();
    styles.external.tags.div = { color: "red", display: "flex" };

    const next = clearGroupProperty(styles, "div", "color");
    expect(next.external.tags.div).toEqual({ display: "flex" });
  });
});

describe("core/styling/extractUnits", () => {
  it("extracts units, values and quoted strings", () => {
    expect(extractUnit("12px")).toBe("px");
    expect(extractUnit("50%")).toBe("%");
    expect(extractValue("-12.5px")).toBe("-12.5");
    expect(extractString('"hi"')).toBe("hi");
    expect(extractString("hi")).toBe("hi");
  });
});

describe("core/styling/colorUtils", () => {
  it("detects colors using a precomputed named-color Set", () => {
    expect(NAMED_COLOR_SET).toBeInstanceOf(Set);
    expect(NAMED_COLOR_SET.size).toBe(new Set(presetColors.map((c) => c.title.toLowerCase())).size);
    expect(isColor("#fff")).toBe(true);
    expect(isColor("rgb(1, 2, 3)")).toBe(true);
    expect(isColor("AliceBlue")).toBe(true);
    expect(isColor("not-a-color")).toBe(false);
  });
});

describe("core/styling/globalStyles", () => {
  it("exposes the reassembled data segments with an O(1) accessor", () => {
    expect(GLOBAL_STYLES.length).toBe(36);
    expect(STYLE_GROUPS.length).toBe(36);
    expect(getGlobalStyle("align-content")?.nameForTitle).toBe("Alignment");
    expect(getGlobalStyle("nope")).toBeUndefined();
  });
});
