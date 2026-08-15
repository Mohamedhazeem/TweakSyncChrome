import type { ElementStyles } from "@/types/elementTypes";
import { processRule } from "@/core/styling/processRule";
import { ensureAtRuleBucket } from "@/core/styling/styleState";

type GroupingRule = CSSRule & { cssRules: CSSRuleList };

function isInstanceOf(rule: CSSRule, globalName: string): boolean {
  const ctor = (globalThis as Record<string, unknown>)[globalName];
  return typeof ctor === "function" && rule instanceof (ctor as new () => CSSRule);
}

/** Resolves the display name TweakSync uses for an at-rule. */
export function getAtRuleName(rule: CSSRule): string | null {
  if (isInstanceOf(rule, "CSSMediaRule")) {
    return `@media ${(rule as CSSMediaRule).media.mediaText}`;
  }
  if (isInstanceOf(rule, "CSSKeyframesRule")) {
    return `@keyframes ${(rule as CSSKeyframesRule).name}`;
  }
  if (isInstanceOf(rule, "CSSSupportsRule")) {
    return `@supports ${(rule as CSSSupportsRule).conditionText}`;
  }
  if (isInstanceOf(rule, "CSSContainerRule")) {
    return `@container ${(rule as unknown as { conditionText: string }).conditionText}`;
  }
  if (isInstanceOf(rule, "CSSFontFaceRule")) {
    return "@font-face";
  }
  return null;
}

function collectGroupingRule(
  rule: GroupingRule,
  atRuleName: string,
  styles: ElementStyles
): void {
  for (const child of Array.from(rule.cssRules)) {
    if (isInstanceOf(child, "CSSStyleRule")) {
      const selector = (child as CSSStyleRule).selectorText;
      processRule({
        declaration: (child as CSSStyleRule).style,
        context: ensureAtRuleBucket(styles, atRuleName, selector),
      });
    }
  }
}

function collectKeyframes(
  rule: CSSKeyframesRule,
  atRuleName: string,
  styles: ElementStyles
): void {
  for (let i = 0; i < rule.cssRules.length; i += 1) {
    const keyframe = rule.cssRules[i] as CSSKeyframeRule;
    processRule({
      declaration: keyframe.style,
      context: ensureAtRuleBucket(styles, atRuleName, keyframe.keyText),
    });
  }
}

/**
 * Collects the declarations of a supported at-rule into the style state.
 * Cost is O(child rules).
 */
export function collectAtRule(rule: CSSRule, styles: ElementStyles): void {
  const atRuleName = getAtRuleName(rule);
  if (!atRuleName) {
    return;
  }

  if (!styles.external.atRules[atRuleName]) {
    styles.external.atRules[atRuleName] = {};
  }

  if (isInstanceOf(rule, "CSSKeyframesRule")) {
    collectKeyframes(rule as CSSKeyframesRule, atRuleName, styles);
    return;
  }

  if (
    isInstanceOf(rule, "CSSMediaRule") ||
    isInstanceOf(rule, "CSSSupportsRule") ||
    isInstanceOf(rule, "CSSContainerRule")
  ) {
    collectGroupingRule(rule as GroupingRule, atRuleName, styles);
  }
}
