import { describe, it, expect } from "vitest";
import { CssLanguage } from "@/core/language/CssLanguage";

describe("CssLanguage", () => {
  const css = new CssLanguage();

  it("exposes a stable id and a non-empty label", () => {
    expect(css.id).toBe("css");
    expect(css.label.length).toBeGreaterThan(0);
  });

  it("parses a declaration block into normalized rules", () => {
    const model = css.parse("color: red; font-size: 12px;");
    expect(model.languageId).toBe("css");
    expect(model.rules).toEqual([
      { property: "color", value: "red" },
      { property: "font-size", value: "12px" },
    ]);
  });

  it("parses a full style rule by ignoring the selector", () => {
    const model = css.parse(".foo { color: red; }");
    expect(model.rules).toEqual([{ property: "color", value: "red" }]);
  });

  it("tolerates a trailing declaration separator", () => {
    const model = css.parse("color: red;");
    expect(model.rules).toEqual([{ property: "color", value: "red" }]);
  });

  it("round-trips parse -> serialize -> parse", () => {
    const raw = "color: red; font-size: 12px;";
    const model = css.parse(raw);
    const reparsed = css.parse(css.serialize(model));
    expect(reparsed.rules).toEqual(model.rules);
  });

  it("serializes a model to a CSS declaration string", () => {
    const model = css.parse("color: red; font-size: 12px;");
    expect(css.serialize(model)).toBe("color: red; font-size: 12px");
  });

  it("validates a well-formed model", () => {
    const model = css.parse("color: red;");
    expect(css.validate?.(model)).toEqual({ ok: true });
  });

  it("reports errors for a misconfigured (empty) rule", () => {
    const model = {
      languageId: "css",
      rules: [{ property: "", value: "" }],
    };
    const result = css.validate?.(model);
    expect(result?.ok).toBe(false);
    expect(result?.errors?.length ?? 0).toBeGreaterThan(0);
  });
});
