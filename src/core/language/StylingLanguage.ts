export interface StyleRule {
  property: string;
  value: string;
}

export interface StyleModel {
  languageId: string;
  rules: StyleRule[];
  metadata?: Record<string, unknown>;
}

export interface ValidationResult {
  ok: boolean;
  errors?: string[];
}

export interface StylingLanguage {
  readonly id: string;
  readonly label: string;
  parse(raw: string): StyleModel;
  serialize(model: StyleModel): string;
  validate?(model: StyleModel): ValidationResult;
}

export interface StylingLanguageRegistry {
  register(language: StylingLanguage): void;
  get(id: string): StylingLanguage | undefined;
  list(): StylingLanguage[];
}
