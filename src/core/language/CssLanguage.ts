import type {
  StylingLanguage,
  StyleModel,
  ValidationResult,
} from "./StylingLanguage";

export class CssLanguage implements StylingLanguage {
  readonly id = "css";
  readonly label = "CSS";

  parse(raw: string): StyleModel {
    const body = CssLanguage.extractDeclarationBody(raw);
    const rules = CssLanguage.parseDeclarations(body);
    return { languageId: this.id, rules };
  }

  serialize(model: StyleModel): string {
    return model.rules
      .map((rule) => `${rule.property}: ${rule.value}`)
      .join("; ");
  }

  validate(model: StyleModel): ValidationResult {
    const errors: string[] = [];
    for (const rule of model.rules) {
      if (!rule.property?.trim()) {
        errors.push("A style rule must have a non-empty property.");
      }
      if (rule.value == null || rule.value.trim() === "") {
        errors.push(`Style rule "${rule.property}" must have a non-empty value.`);
      }
    }
    return errors.length === 0 ? { ok: true } : { ok: false, errors };
  }

  private static extractDeclarationBody(raw: string): string {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      return raw.slice(start + 1, end);
    }
    return raw;
  }

  private static parseDeclarations(
    body: string
  ): { property: string; value: string }[] {
    const rules: { property: string; value: string }[] = [];
    for (const segment of body.split(";")) {
      const colon = segment.indexOf(":");
      if (colon === -1) continue;
      const property = segment.slice(0, colon).trim();
      const value = segment.slice(colon + 1).trim();
      if (!property) continue;
      rules.push({ property, value });
    }
    return rules;
  }
}
