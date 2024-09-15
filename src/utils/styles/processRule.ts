import { ProcessAtRulesType, ProcessRules } from "../../types/atRulesTypes";
import { ElementStyles } from "../../types/elementTypes";
import { longHandDefaults, shorthandMap, styles } from "./styleConstants";

// export function processRule({ rule, context }: ProcessRules) {
//   // for (let i = 0; i < rule.style.length; i++) {
//   //   const propertyName = rule.style[i];
//   //   context[propertyName] = rule.style.getPropertyValue(propertyName);
//   // }
//   if (context) {
//     const ruleStyles = rule.style;
//     for (let i = 0; i < ruleStyles.length; i++) {
//       const property = ruleStyles[i];
//       context[property] = ruleStyles.getPropertyValue(property);
//     }
//   }
// }

export function processRule({ rule, context }: ProcessRules) {
  if (context) {
    const ruleStyles = rule.style;
    const longhandProperties: { [key: string]: string } = {};

    // Collect all longhand properties
    for (let i = 0; i < ruleStyles.length; i++) {
      const property = ruleStyles[i];
      const value = ruleStyles.getPropertyValue(property);
      longhandProperties[property] = value;
    }

    // Iterate over shorthand mappings
    for (const shorthand in shorthandMap) {
      const longhands = shorthandMap[shorthand];

      // Set default values for missing longhand properties
      const values = longhands.map(
        (prop) => longhandProperties[prop] || longHandDefaults[prop] || ""
      );

      // Check if at least one of the longhand properties exists
      const existingLonghands = values.filter(Boolean);

      if (existingLonghands.length > 0) {
        // Construct the shorthand with defaults if needed
        const uniqueValues = new Set(values);

        if (uniqueValues.size === 1) {
          // If all values are the same, use the shorthand with a single value
          context[shorthand] = values[0];
        } else if (values.some(Boolean)) {
          // Otherwise, construct the shorthand with the provided values
          context[shorthand] = values.join(" ");
        }
        // context[shorthand] = values.join(" ");

        // Remove the longhand properties from the context
        longhands.forEach((prop) => {
          delete longhandProperties[prop];
        });
      }
    }

    // Add any remaining longhand properties to the context
    for (const property in longhandProperties) {
      context[property] = longhandProperties[property];
    }
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
