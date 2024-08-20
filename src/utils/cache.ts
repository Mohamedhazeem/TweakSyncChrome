import { getElementTypes } from "../types/elementTypes";

export function getCachedElement({ temporaryId }: getElementTypes) {
  const elementCache: { [key: string]: HTMLElement | null } = {};

  return () => {
    if (!(temporaryId in elementCache)) {
      console.log("Caching element");
      elementCache[temporaryId] = document.querySelector(`[data-temporaryid="${temporaryId}"]`);
    }

    const element = elementCache[temporaryId];
    if (!element) {
      console.error(`Element with id ${temporaryId} not found`);
      return;
    } else {
      return element;
    }
  };
}

// const cachedRules: Record<string, CSSStyleRule[]> = {};
// export function getCachedRules() {
//   if (Object.keys(cachedRules).length === 0) {
//     // Cache the rules if the cache is empty
//     const styleSheets = document.styleSheets;
//     for (let i = 0; i < styleSheets.length; i++) {
//       const styleSheet = styleSheets[i];
//       try {
//         const rules = styleSheet.cssRules;
//         for (let j = 0; j < rules.length; j++) {
//           cacheRule(rules[j]);
//         }
//       } catch (e) {
//         console.error(`Error accessing stylesheet: ${styleSheet.href}`, e);
//       }
//     }
//   }

//   return cachedRules;
// }

// function cacheRule(rule: CSSRule) {
//   if (rule instanceof CSSStyleRule) {
//     const selector = rule.selectorText;
//     if (!cachedRules[selector]) {
//       cachedRules[selector] = [];
//     }
//     cachedRules[selector].push(rule);
//   } else if (
//     rule instanceof CSSMediaRule ||
//     rule instanceof CSSSupportsRule ||
//     rule instanceof CSSKeyframesRule
//   ) {
//     const cssRules = rule.cssRules;
//     for (let k = 0; k < cssRules.length; k++) {
//       cacheRule(cssRules[k]);
//     }
//   }
// }

const cachedRules: Record<string, CSSStyleRule[]> = {};

export function getCachedRules() {
  // Clear the cache before repopulating to ensure we get updated rules
  Object.keys(cachedRules).forEach((key) => delete cachedRules[key]);

  // Cache the rules
  const styleSheets = document.styleSheets;
  for (let i = 0; i < styleSheets.length; i++) {
    const styleSheet = styleSheets[i];
    try {
      const rules = styleSheet.cssRules;
      for (let j = 0; j < rules.length; j++) {
        cacheRule(rules[j]);
      }
    } catch (e) {
      console.error(`Error accessing stylesheet: ${styleSheet.href}`, e);
    }
  }

  console.log("Cached rules:", cachedRules);
  return cachedRules;
}

function cacheRule(rule: CSSRule) {
  if (rule instanceof CSSStyleRule) {
    const selector = rule.selectorText;
    if (!cachedRules[selector]) {
      cachedRules[selector] = [];
    }
    cachedRules[selector].push(rule);
  } else if (
    rule instanceof CSSMediaRule ||
    rule instanceof CSSSupportsRule ||
    rule instanceof CSSKeyframesRule
  ) {
    const cssRules = rule.cssRules;
    for (let k = 0; k < cssRules.length; k++) {
      cacheRule(cssRules[k]);
    }
  }
}
