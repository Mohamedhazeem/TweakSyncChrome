import type { ElementStyles, ExternalStyles } from "@/types/elementTypes";
import type { StyleContext } from "./processRule";

/** Selector buckets an external rule can land in. */
export type SelectorBucket = Exclude<keyof ExternalStyles, "atRules">;

export const SELECTOR_BUCKETS: SelectorBucket[] = [
  "classes",
  "ids",
  "tags",
  "attribute",
  "descendant",
  "pseudoElementStyles",
  "pseudoClassStyles",
];

/** Creates a fresh, independent style state. Replaces the old shared singleton. */
export function createEmptyElementStyles(): ElementStyles {
  return {
    inline: {},
    external: {
      classes: {},
      ids: {},
      tags: {},
      attribute: {},
      descendant: {},
      pseudoElementStyles: {},
      pseudoClassStyles: {},
      atRules: {},
    },
    temporaryId: "",
  };
}

/** Lazily creates (and returns) the declaration bag for a selector bucket. */
export function ensureBucket(
  styles: ElementStyles,
  bucket: SelectorBucket,
  key: string
): StyleContext {
  const target = styles.external[bucket];
  if (!target[key]) {
    target[key] = {};
  }
  return target[key];
}

/** Lazily creates (and returns) the declaration bag for an at-rule selector. */
export function ensureAtRuleBucket(
  styles: ElementStyles,
  atRuleName: string,
  selector: string
): StyleContext {
  if (!styles.external.atRules[atRuleName]) {
    styles.external.atRules[atRuleName] = {};
  }
  const group = styles.external.atRules[atRuleName];
  if (!group[selector]) {
    group[selector] = {};
  }
  return group[selector];
}
