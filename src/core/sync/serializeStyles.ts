import type { ElementStyles } from "@/types/elementTypes";
import { SELECTOR_BUCKETS } from "@/core/styling/styleState";

export type Declarations = Record<string, string>;

/**
 * Serialises a declaration bag into the CSS text sent to the editor.
 * Empty values are skipped so cleared properties are not transmitted.
 */
export function serializeDeclarations(declarations: Declarations): string {
  return Object.entries(declarations)
    .filter(([, value]) => value !== "" && value !== undefined && value !== null)
    .map(([property, value]) => `${property}: ${value};`)
    .join(" ");
}

/**
 * Finds the declarations owned by a selector, regardless of which bucket holds
 * it. Cost is O(buckets), a small constant.
 */
export function collectSelectorDeclarations(
  styles: ElementStyles,
  selector: string
): Declarations {
  if (selector === "inline") {
    return { ...styles.inline };
  }

  for (const bucket of SELECTOR_BUCKETS) {
    const declarations = styles.external[bucket][selector];
    if (declarations) {
      return { ...declarations };
    }
  }

  const atRule = styles.external.atRules[selector];
  if (atRule) {
    const merged: Declarations = {};
    for (const subSelector of Object.keys(atRule)) {
      Object.assign(merged, atRule[subSelector]);
    }
    return merged;
  }

  return {};
}
