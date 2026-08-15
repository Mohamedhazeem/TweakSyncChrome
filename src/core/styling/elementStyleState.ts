import type { ElementStyles, ExternalStyles } from "@/types/elementTypes";
import { SELECTOR_BUCKETS } from "./styleState";

/**
 * Applies an edit to the in-memory style state used by the inspector UI.
 *
 * The selector is resolved against the buckets in the same order the legacy
 * inspector used, so the resulting payload sent to VS Code is unchanged. Cost is
 * O(buckets) (a small constant), never O(rules).
 */
export function setStyleValue(
  styles: ElementStyles,
  selector: string,
  property: string,
  value: string | null
): ElementStyles {
  const updatedStyles: ElementStyles = { ...styles };
  const nextValue = value === null ? "" : value;

  if (selector === "inline") {
    updatedStyles.inline[property] = nextValue;
    return updatedStyles;
  }

  if (updatedStyles.inline[selector]) {
    updatedStyles.inline[selector] = nextValue;
    return updatedStyles;
  }

  for (const bucket of SELECTOR_BUCKETS) {
    const declarations = updatedStyles.external[bucket][selector];
    if (declarations) {
      declarations[property] = nextValue;
      return updatedStyles;
    }
  }

  const atRule = updatedStyles.external.atRules[selector];
  if (atRule) {
    for (const subSelector of Object.keys(atRule)) {
      atRule[subSelector][property] = nextValue;
    }
  }

  return updatedStyles;
}

/** Removes a property from every bucket that holds the given selector. */
export function clearGroupProperty(
  styles: ElementStyles,
  selector: string,
  property: string
): ElementStyles {
  const updatedStyles: ElementStyles = { ...styles };

  for (const key of Object.keys(updatedStyles.external) as Array<keyof ExternalStyles>) {
    const group = updatedStyles.external[key];
    if (typeof group === "object" && group[selector]) {
      delete (group[selector] as Record<string, unknown>)[property];
    }
  }

  return updatedStyles;
}
