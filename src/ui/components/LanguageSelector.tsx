import type { StylingLanguage } from "@/core/language/StylingLanguage";

export interface LanguageSelectorProps {
  languages: StylingLanguage[];
  selectedId?: string;
  onSelect: (language: StylingLanguage) => void;
}

export function LanguageSelector({
  languages,
  selectedId,
  onSelect,
}: LanguageSelectorProps) {
  const selected = selectedId
    ? languages.find((language) => language.id === selectedId)
    : undefined;

  if (selectedId && !selected) {
    return (
      <p role="alert" className="text-sm text-destructive">
        Language "{selectedId}" is not available.
      </p>
    );
  }

  return (
    <select
      role="combobox"
      aria-label="Styling language"
      className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
      value={selectedId ?? ""}
      onChange={(event) => {
        const language = languages.find((l) => l.id === event.target.value);
        if (language) onSelect(language);
      }}
    >
      <option value="" disabled>
        Select a language
      </option>
      {languages.map((language) => (
        <option key={language.id} value={language.id}>
          {language.label}
        </option>
      ))}
    </select>
  );
}
