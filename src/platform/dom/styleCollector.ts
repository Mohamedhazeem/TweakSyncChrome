import type { ElementStyles } from "@/types/elementTypes";
import { TWEAKSYNC_ID } from "@/core/element/constants";
import { processRule } from "@/core/styling/processRule";
import { isValidSelector } from "@/core/styling/selectorUtils";
import { classifySelector, handleValidSelector } from "@/core/styling/styleHandlers";
import { createEmptyElementStyles, ensureBucket } from "@/core/styling/styleState";
import { collectAtRule } from "./atRules";

/** Builds a selector validator bound to a document, keeping core DOM-free. */
export function createSelectorValidator(doc: Document): (selector: string) => boolean {
  return (selector: string) => isValidSelector(selector, (candidate) => doc.querySelector(candidate));
}

function isReadableSheet(sheet: CSSStyleSheet, origin: string): boolean {
  if (!sheet.href) {
    return true;
  }
  try {
    return new URL(sheet.href).origin === origin;
  } catch {
    return false;
  }
}

/**
 * Collects every style that applies to an injected element.
 *
 * Complexity: O(rules x classList). Each rule is visited once, and the bucket a
 * rule belongs to is resolved by `core/styling` without re-scanning the element.
 */
export function collectElementStyles(
  element: HTMLElement,
  doc: Document,
  origin: string = doc.location?.origin ?? ""
): Promise<ElementStyles> {
  const styles = createEmptyElementStyles();
  const validator = createSelectorValidator(doc);
  const classList = Array.from(element.classList);
  const elementId = element.id;
  const tagName = element.tagName.toLowerCase();

  styles.temporaryId = element.getAttribute(TWEAKSYNC_ID) || null;

  const inlineStyles = element.style;
  for (let i = 0; i < inlineStyles.length; i += 1) {
    const propertyName = inlineStyles.item(i);
    styles.inline[propertyName] = inlineStyles.getPropertyValue(propertyName);
  }

  const sheets = doc.styleSheets;
  for (let i = 0; i < sheets.length; i += 1) {
    const sheet = sheets[i];
    try {
      if (!isReadableSheet(sheet, origin)) {
        continue;
      }

      const rules = sheet.cssRules;
      for (let j = 0; j < rules.length; j += 1) {
        const rule = rules[j];

        if (typeof CSSStyleRule !== "undefined" && rule instanceof CSSStyleRule) {
          const selector = rule.selectorText;
          if (handleValidSelector(selector, validator)) {
            continue;
          }

          try {
            const targets = classifySelector({
              selector,
              element,
              classList,
              elementId,
              tagName,
            });
            for (const target of targets) {
              processRule({
                declaration: rule.style,
                context: ensureBucket(styles, target.bucket, target.key),
              });
            }
          } catch (error) {
            return Promise.reject(new Error(`Style Error: ${String(error)}`));
          }
        }

        collectAtRule(rule, styles);
      }
    } catch {
      // Unreadable stylesheet (cross-origin); skip it.
    }
  }

  return Promise.resolve(styles);
}
