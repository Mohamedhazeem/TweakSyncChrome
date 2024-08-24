import { ElementStyles } from "../../types/elementTypes";
import {
  handleAtrules,
  handleAttribute,
  handleClass,
  handleDescendant,
  handleId,
  handlePseudoClass,
  handlePseudoElement,
  handleTag,
  handleValidSelector,
  isDescendantSelector,
  isPseudoClassSelector,
  isPseudoElementSelector,
  isValidSelector,
} from "./styleHandlers";
import { processAtRule, processRule } from "./processRule";
import { resetStyles, styles } from "./styleConstants";

export function getElementStyles(element: HTMLElement): Promise<ElementStyles> {
  return new Promise((resolve, reject) => {
    resetStyles();
    const classList = Array.from(element.classList);
    const elementId = element.id;
    const tagName = element.tagName.toLowerCase();
    styles.temporaryId = element.getAttribute("data-tweaksync-id") || null;

    // Collect inline styles
    const inlineStyles = element.style;
    for (let i = 0; i < inlineStyles.length; i++) {
      const propertyName = inlineStyles[i];
      styles.inline[propertyName] = inlineStyles.getPropertyValue(propertyName);
    }

    // Helper functions to determine selector types

    for (const sheet of Array.from(document.styleSheets)) {
      try {
        if (!sheet.href || new URL(sheet.href).origin === window.location.origin) {
          if (sheet instanceof CSSStyleSheet) {
            for (const rule of Array.from(sheet.cssRules)) {
              if (rule instanceof CSSStyleRule) {
                const selector = rule.selectorText;

                if (handleValidSelector(selector, isValidSelector)) {
                  continue;
                }

                try {
                  // Handle descendant selectors
                  if (
                    handleDescendant(
                      element,
                      selector,
                      isDescendantSelector,
                      processRule,
                      rule,
                      styles
                    )
                  ) {
                    continue;
                  }

                  // Handle class selectors
                  handleClass(
                    classList,
                    selector,
                    element,
                    isDescendantSelector,
                    processRule,
                    rule,
                    styles
                  );

                  // Handle ID selectors
                  handleId(
                    elementId,
                    selector,
                    element,
                    isDescendantSelector,
                    processRule,
                    rule,
                    styles
                  );

                  // Handle tag selectors
                  handleTag(selector, tagName, isDescendantSelector, processRule, rule, styles);

                  // Handle attribute selectors
                  handleAttribute(
                    selector,
                    element,
                    isDescendantSelector,
                    isPseudoElementSelector,
                    isPseudoClassSelector,
                    processRule,
                    rule,
                    styles
                  );

                  // Handle pseudo-element selectors
                  handlePseudoElement(
                    isPseudoElementSelector,
                    selector,
                    element,
                    processRule,
                    rule,
                    styles
                  );

                  // Handle pseudo-class selectors
                  handlePseudoClass(
                    isPseudoClassSelector,
                    selector,
                    element,
                    processRule,
                    rule,
                    styles
                  );
                } catch (e) {
                  console.warn(`Error processing rule for selector '${selector}':`, e);
                  reject(new Error("Style Error"));
                }
              }
              handleAtrules(rule, processAtRule);
            }
          }
        } else {
          console.log("Skipping cross-origin stylesheet:", sheet.href);
        }
      } catch (e) {
        console.log("Could not access stylesheet rules:", e);
      }
    }

    resolve(styles);
  });
}
