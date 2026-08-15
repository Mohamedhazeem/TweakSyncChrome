// Thin accessor over the language-tag segments.
import { LANGUAGE_TAGS_A_L } from "./languageTagsAL";
import { LANGUAGE_TAGS_M_Z } from "./languageTagsMZ";

export const languageTags: Record<string, string> = {
  ...LANGUAGE_TAGS_A_L,
  ...LANGUAGE_TAGS_M_Z,
};

const LANGUAGE_TAG_INDEX = new Map<string, string>(Object.entries(languageTags));

/** O(1) lookup of a BCP-47 tag by human readable language name. */
export function getLanguageTag(name: string): string | undefined {
  return LANGUAGE_TAG_INDEX.get(name);
}
