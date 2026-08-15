import type { Style } from "@/types/styleTypes";
import { globalCssOptions } from "./data/options";

/** O(1) membership test for the CSS-wide keywords. */
export const GLOBAL_CSS_OPTION_SET: Set<string> = new Set(globalCssOptions);

/**
 * Splits a style's options into property-specific values and CSS-wide keywords.
 * Cost is O(options) thanks to the Set (the legacy version was O(options x keywords)).
 */
export function seperateCssOptions(style: Style | undefined): {
  specificCss: string[];
  globalCss: string[];
} {
  const options = Array.isArray(style?.options) ? style.options : [];
  const specificCss: string[] = [];
  const globalCss: string[] = [];

  for (const option of options) {
    if (GLOBAL_CSS_OPTION_SET.has(option)) {
      globalCss.push(option);
    } else {
      specificCss.push(option);
    }
  }

  return { specificCss, globalCss };
}
