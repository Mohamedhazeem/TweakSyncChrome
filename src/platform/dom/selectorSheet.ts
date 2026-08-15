import {
  getCachedRules,
  registerCachedRule,
  unregisterCachedRule,
} from "./ruleCache";

function resolveStyleSheet(doc: Document): CSSStyleSheet | null {
  let styleElement = doc.querySelector("style");
  if (!styleElement) {
    styleElement = doc.createElement("style");
    doc.head.appendChild(styleElement);
  }
  return styleElement.sheet ?? null;
}

function findRuleIndex(sheet: CSSStyleSheet, selector: string): number {
  for (let i = 0; i < sheet.cssRules.length; i += 1) {
    const rule = sheet.cssRules[i] as CSSStyleRule;
    if (rule.selectorText === selector) {
      return i;
    }
  }
  return -1;
}

/** Adds an empty rule for `selector` when the document does not have one yet. */
export function addSelector(doc: Document, selector: string): void {
  try {
    const sheet = resolveStyleSheet(doc);
    if (!sheet) {
      return;
    }

    if (findRuleIndex(sheet, selector) !== -1) {
      return;
    }

    const ruleIndex = sheet.insertRule(`${selector} { }`, sheet.cssRules.length);
    const newRule = sheet.cssRules[ruleIndex] as CSSStyleRule;
    getCachedRules(doc);
    registerCachedRule(selector, newRule);
  } catch {
    // Invalid selectors are ignored, matching the previous behaviour.
  }
}

/** Moves the declarations of `oldSelector` onto `newSelector`. */
export function renameSelector(doc: Document, oldSelector: string, newSelector: string): void {
  try {
    const sheet = resolveStyleSheet(doc);
    if (!sheet) {
      return;
    }

    const oldRuleIndex = findRuleIndex(sheet, oldSelector);
    if (oldRuleIndex === -1) {
      return;
    }

    const cssText = (sheet.cssRules[oldRuleIndex] as CSSStyleRule).style.cssText;
    const newRuleIndex = sheet.insertRule(
      `${newSelector} { ${cssText} }`,
      sheet.cssRules.length
    );
    const newRule = sheet.cssRules[newRuleIndex] as CSSStyleRule;

    sheet.deleteRule(oldRuleIndex);

    getCachedRules(doc);
    registerCachedRule(newSelector, newRule);
    unregisterCachedRule(oldSelector);
  } catch {
    // Invalid selectors are ignored, matching the previous behaviour.
  }
}
