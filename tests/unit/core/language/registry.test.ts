import { describe, it, expect } from "vitest";
import type { StylingLanguage } from "@/core/language/StylingLanguage";
import { StylingLanguageRegistry } from "@/core/language/StylingLanguageRegistry";
import { CssLanguage } from "@/core/language/CssLanguage";

function makeLang(id: string, label: string): StylingLanguage {
  return {
    id,
    label,
    parse: () => ({ languageId: id, rules: [] }),
    serialize: () => "",
  };
}

describe("StylingLanguageRegistry", () => {
  it("registers and retrieves a language by id (O(1) Map lookup)", () => {
    const registry = new StylingLanguageRegistry();
    const css = new CssLanguage();
    registry.register(css);
    expect(registry.get("css")).toBe(css);
  });

  it("lists all registered languages", () => {
    const registry = new StylingLanguageRegistry();
    const a = makeLang("a", "A");
    const b = makeLang("b", "B");
    registry.register(a);
    registry.register(b);
    const list = registry.list();
    expect(list).toHaveLength(2);
    expect(list).toContain(a);
    expect(list).toContain(b);
  });

  it("returns undefined for an unknown id", () => {
    const registry = new StylingLanguageRegistry();
    expect(registry.get("missing")).toBeUndefined();
  });

  it("throws when registering a duplicate id", () => {
    const registry = new StylingLanguageRegistry();
    registry.register(makeLang("css", "CSS"));
    expect(() => registry.register(makeLang("css", "CSS again"))).toThrow(
      /already registered/
    );
  });
});
