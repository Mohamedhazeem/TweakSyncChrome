import { ProcessAtRulesType, ProcessRules } from "../../types/atRulesTypes";
import { ElementStyles } from "../../types/elementTypes";

export function handleAtrules(
  atRule: CSSRule,
  processAtRule: ({ atRule, atRuleName }: ProcessAtRulesType) => void
) {
  if (
    atRule instanceof CSSMediaRule ||
    atRule instanceof CSSKeyframesRule ||
    atRule instanceof CSSSupportsRule ||
    atRule instanceof CSSFontFaceRule ||
    atRule instanceof CSSContainerRule
  ) {
    const atRuleName =
      atRule instanceof CSSMediaRule
        ? `@media ${atRule.media.mediaText}`
        : atRule instanceof CSSKeyframesRule
        ? `@keyframes ${atRule.name}`
        : atRule instanceof CSSSupportsRule
        ? `@supports ${atRule.conditionText}`
        : atRule instanceof CSSContainerRule
        ? `@container ${atRule.conditionText}`
        : "@font-face";
    processAtRule({ atRule, atRuleName });
  }
}
export function handleValidSelector(
  selector: string,
  isValidSelector: (selector: string) => boolean
) {
  if (
    !selector ||
    selector.trim() === "" ||
    !isValidSelector(selector) ||
    (!selector.includes(".") && !selector.includes("#"))
  ) {
    return true; // Invalid selector
  }
  return false; // Valid selector
}

// export function handleValidSelector(
//   selector: string,
//   isValidSelector: (selector: string) => boolean
// ) {
//   if (!selector || selector.trim() === "" || !isValidSelector(selector)) {
//     return true;
//   }
//   return false;
// }

export function handleDescendant(
  element: HTMLElement,
  selector: string,
  isDescendantSelector: (selector: string) => boolean,
  processRule: ({ rule, context }: ProcessRules) => void,
  rule: CSSStyleRule,
  styles: ElementStyles
) {
  if (element.matches(selector) && isDescendantSelector(selector)) {
    if (!styles.external.descendant[selector]) {
      styles.external.descendant[selector] = {};
    }
    processRule({
      rule,
      selector,
      context: styles.external.descendant[selector],
    });
    return true;
  } else {
    return false;
  }
}

export function handleClass(
  classList: string[],
  selector: string,
  element: HTMLElement,
  isDescendantSelector: (selector: string) => boolean,
  processRule: ({ rule, selector, context }: ProcessRules) => void,
  rule: CSSStyleRule,
  styles: ElementStyles
) {
  classList.forEach((className) => {
    // classSelector
    const classSelector = `.${className}`;
    if (
      selector.includes(classSelector) &&
      element.matches(selector) &&
      !isDescendantSelector(selector)
    ) {
      if (!styles.external.classes[classSelector]) {
        styles.external.classes[classSelector] = {};
      }
      processRule({
        rule,
        selector,
        context: styles.external.classes[classSelector],
      });
    }
  });
}

export function handleId(
  elementId: string,
  selector: string,
  element: HTMLElement,
  isDescendantSelector: (selector: string) => boolean,
  processRule: ({ rule, selector, context }: ProcessRules) => void,
  rule: CSSStyleRule,
  styles: ElementStyles
) {
  const idSselector = `#${elementId}`;
  if (
    elementId &&
    selector.includes(idSselector) &&
    element.matches(selector) &&
    !isDescendantSelector(selector)
  ) {
    if (!styles.external.ids[idSselector]) {
      styles.external.ids[idSselector] = {};
    }
    processRule({ rule, selector, context: styles.external.ids[idSselector] });
  }
}

export function handleTag(
  tagSelector: string,
  selector: string,
  isDescendantSelector: (selector: string) => boolean,
  processRule: ({ rule, selector, context }: ProcessRules) => void,
  rule: CSSStyleRule,
  styles: ElementStyles
) {
  if (tagSelector === selector && !isDescendantSelector(tagSelector)) {
    if (!styles.external.tags[selector]) {
      styles.external.tags[selector] = {};
    }
    processRule({ rule, selector, context: styles.external.tags[selector] });
  }
}

export function handleAttribute(
  selector: string,
  element: HTMLElement,
  isDescendantSelector: (selector: string) => boolean,
  isPseudoElementSelector: (selector: string) => boolean,
  isPseudoClassSelector: (selector: string) => boolean,
  processRule: ({ rule, context }: ProcessRules) => void,
  rule: CSSStyleRule,
  styles: ElementStyles
) {
  if (
    selector.includes("[") &&
    selector.includes("]") &&
    element.matches(selector) &&
    !isDescendantSelector(selector)
  ) {
    if (
      !isPseudoElementSelector(selector) &&
      !isPseudoClassSelector(selector)
    ) {
      if (!styles.external.attribute[selector]) {
        styles.external.attribute[selector] = {};
      }
      processRule({
        rule,
        selector,
        context: styles.external.attribute[selector],
      });
    }
  }
}

export function handlePseudoElement(
  isPseudoElementSelector: (selector: string) => boolean,
  selector: string,
  element: HTMLElement,
  processRule: ({ rule, selector, context }: ProcessRules) => void,
  rule: CSSStyleRule,
  styles: ElementStyles
) {
  if (isPseudoElementSelector(selector)) {
    const baseSelector = selector.split("::")[0];
    if (element.matches(baseSelector)) {
      if (!styles.external.pseudoElementStyles[selector]) {
        styles.external.pseudoElementStyles[selector] = {};
      }
      processRule({
        rule,
        selector,
        context: styles.external.pseudoElementStyles[selector],
      });
    }
  }
}

export function handlePseudoClass(
  isPseudoClassSelector: (selector: string) => boolean,
  selector: string,
  element: HTMLElement,
  processRule: ({ rule, selector, context }: ProcessRules) => void,
  rule: CSSStyleRule,
  styles: ElementStyles
) {
  if (isPseudoClassSelector(selector)) {
    const baseSelector = selector.split(":")[0];
    if (element.matches(baseSelector)) {
      if (!styles.external.pseudoClassStyles[selector]) {
        styles.external.pseudoClassStyles[selector] = {};
      }
      processRule({
        rule,
        selector,
        context: styles.external.pseudoClassStyles[selector],
      });
    }
  }
}
export const isDescendantSelector = (selector: string): boolean => {
  return (
    selector.includes(" ") ||
    selector.includes(">") ||
    selector.includes("+") ||
    selector.includes("~")
  );
};

export const isPseudoElementSelector = (selector: string): boolean => {
  return selector.includes("::");
};

export const isPseudoClassSelector = (selector: string): boolean => {
  return selector.includes(":") && !isPseudoElementSelector(selector);
};

export const isValidSelector = (selector: string): boolean => {
  const pseudoSelectorRegex = /::?[\w-]+/g;
  const cleanedSelector = selector.replace(pseudoSelectorRegex, "");
  try {
    document.querySelector(cleanedSelector);
    return true;
  } catch {
    return false;
  }
};
