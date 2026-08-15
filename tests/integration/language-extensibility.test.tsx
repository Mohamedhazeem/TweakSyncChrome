import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { StylingLanguage } from "@/core/language/StylingLanguage";
import { StylingLanguageRegistry } from "@/core/language/StylingLanguageRegistry";
import { CssLanguage } from "@/core/language/CssLanguage";
import { LanguageSelector } from "@/ui/components/LanguageSelector";

function makeJsonLanguage(): StylingLanguage {
  return {
    id: "json",
    label: "JSON",
    parse: (raw) => {
      const obj = JSON.parse(raw) as Record<string, unknown>;
      return {
        languageId: "json",
        rules: Object.entries(obj).map(([property, value]) => ({
          property,
          value: String(value),
        })),
      };
    },
    serialize: (model) =>
      JSON.stringify(Object.fromEntries(model.rules.map((r) => [r.property, r.value]))),
  };
}

describe("language extensibility (US2)", () => {
  it("lists every registered language in the UI with no core change", () => {
    const registry = new StylingLanguageRegistry();
    registry.register(new CssLanguage());
    registry.register(makeJsonLanguage());

    render(<LanguageSelector languages={registry.list()} onSelect={vi.fn()} />);

    expect(screen.getByText("CSS")).toBeTruthy();
    expect(screen.getByText("JSON")).toBeTruthy();
  });

  it("routes a selection through the registry to the correct processing path", () => {
    const registry = new StylingLanguageRegistry();
    registry.register(new CssLanguage());
    const onSelect = vi.fn();
    render(<LanguageSelector languages={registry.list()} onSelect={onSelect} />);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "css" } });

    expect(onSelect).toHaveBeenCalledTimes(1);
    const language = onSelect.mock.calls[0][0] as StylingLanguage;
    expect(language.id).toBe("css");

    // correct processing path: parse/serialize work end-to-end
    const model = language.parse("color: blue;");
    expect(language.serialize(model)).toBe("color: blue");
  });

  it("fails gracefully with a clear message for an unregistered selection", () => {
    const registry = new StylingLanguageRegistry();
    registry.register(new CssLanguage());
    render(
      <LanguageSelector languages={registry.list()} onSelect={vi.fn()} selectedId="nope" />
    );
    expect(screen.getByText(/not available/i)).toBeTruthy();
  });

  it("surfaces a clear error for a misconfigured language model", () => {
    const registry = new StylingLanguageRegistry();
    registry.register(new CssLanguage());
    const language = registry.get("css");
    expect(language).toBeDefined();
    const bad = {
      languageId: "css",
      rules: [{ property: "", value: "" }],
    };
    const result = language!.validate?.(bad);
    expect(result?.ok).toBe(false);
    expect(result?.errors?.some((e) => /property/i.test(e))).toBe(true);
  });
});
