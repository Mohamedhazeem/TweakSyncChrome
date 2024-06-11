import { ProcessAtRulesType, ProcessRules } from "../types/AtRulesTypes";
import { ElementStyles } from "../types/ElementTypes";
import { styles } from "./styleConstants";

export function processRule({ rule, context }: ProcessRules) {
  for (let i = 0; i < rule.style.length; i++) {
    const propertyName = rule.style[i];
    context[propertyName] = rule.style.getPropertyValue(propertyName);
  }
}

export function processAtRule({ atRule, atRuleName }: ProcessAtRulesType) {
  if (!styles?.external.atRules[atRuleName]) {
    styles!.external.atRules[atRuleName] = {};
  }
  if (atRule instanceof CSSMediaRule) {
    handleMediaAndSupportRule(atRule, atRuleName, styles!, processRule);
  } else if (atRule instanceof CSSKeyframesRule) {
    handleKeyFramesRule(atRule, atRuleName, styles!, processRule);
  } else if (atRule instanceof CSSSupportsRule) {
    handleMediaAndSupportRule(atRule, atRuleName, styles!, processRule);
  } else if (atRule instanceof CSSContainerRule) {
    handleContainerRule(atRule, atRuleName, styles!, processRule);
  }
}
function handleMediaAndSupportRule(
  atRule: CSSMediaRule | CSSSupportsRule,
  atRuleName: string,
  styles: ElementStyles,
  processRule: ({ rule, selector, context }: ProcessRules) => void
) {
  for (const rule of Array.from(atRule.cssRules)) {
    if (rule instanceof CSSStyleRule) {
      const selector = rule.selectorText;
      if (!styles.external.atRules[atRuleName][selector]) {
        styles.external.atRules[atRuleName][selector] = {};
      }
      processRule({
        rule,
        selector,
        context: styles.external.atRules[atRuleName][selector],
      });
    }
  }
}

function handleKeyFramesRule(
  rule: CSSKeyframesRule,
  atRuleName: string,
  styles: ElementStyles,
  processRule: ({ rule, selector, context }: ProcessRules) => void
) {
  const keyframes = rule.cssRules;
  for (let i = 0; i < keyframes.length; i++) {
    const rule = keyframes[i] as CSSKeyframeRule;
    const selector = rule.keyText;
    if (!styles.external.atRules[atRuleName][selector]) {
      styles.external.atRules[atRuleName][selector] = {};
    }
    processRule({
      rule,
      selector,
      context: styles.external.atRules[atRuleName][selector],
    });
  }
}

function handleContainerRule(
  atRule: CSSContainerRule,
  atRuleName: string,
  styles: ElementStyles,
  processRule: ({ rule, selector, context }: ProcessRules) => void
) {
  const containerRules: { [key: string]: { [key: string]: string } } = {};
  for (const rule of Array.from(atRule.cssRules)) {
    if (rule instanceof CSSStyleRule) {
      const selector = rule.selectorText;
      if (!containerRules[selector]) {
        containerRules[selector] = {};
      }
      processRule({ rule, selector, context: containerRules[selector] });
    }
    styles.external.atRules[atRuleName] = containerRules;
  }
}
