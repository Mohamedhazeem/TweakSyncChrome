import type {
  StylingLanguage,
  StylingLanguageRegistry as Registry,
} from "./StylingLanguage";

export class StylingLanguageRegistry implements Registry {
  private readonly languages = new Map<string, StylingLanguage>();

  register(language: StylingLanguage): void {
    if (this.languages.has(language.id)) {
      throw new Error(`Styling language "${language.id}" is already registered.`);
    }
    this.languages.set(language.id, language);
  }

  get(id: string): StylingLanguage | undefined {
    return this.languages.get(id);
  }

  list(): StylingLanguage[] {
    return Array.from(this.languages.values());
  }
}
