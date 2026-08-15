import { getElementTypes } from "../../types/elementTypes";
import { getCachedRules } from "../cache";

export function updateStyles({ newStyleValue, selector, property, temporaryId }: getElementTypes) {
  console.log("updateStyles new style value: " + selector + property + newStyleValue);
  if (!selector || !property) {
    console.error(selector);
    console.error(property);
    console.error("Selector or property not provided");
    return;
  }
  if (selector === "inline") {
    // Update the style directly on the element with the provided temporaryId
    const element = document.querySelector(`[data-tweaksync-id="${temporaryId}"]`) as HTMLElement;
    if (element) {
      const previousStyle = element.style.cssText; // Get existing styles

      element.style.cssText = `${previousStyle}; ${property}: ${newStyleValue}`;
    } else {
      console.error(`No element found with temporary ID: ${temporaryId}`);
    }
  } else {
    const rules = getCachedRules()[selector];
    if (!rules) {
      console.error(`No cached rules found for selector: ${selector}`);
      return;
    }
    // let ruleFound = false;
    // for (const rule of rules) {
    //   if (rule.selectorText === selector) {
    //     if (typeof newStyleValue === "string") {
    //       rule.style.setProperty(property, newStyleValue);
    //       console.log(`Updated rule: ${rule.cssText}`);
    //     } else {
    //       rule.style.removeProperty(property);
    //       console.log(`Removed property: ${property}`);
    //     }
    //     ruleFound = true;
    //     break; // Exit after updating the correct rule
    //   }
    // }
    // if (!ruleFound) {
    //   console.error(`No matching rule found for selector: ${selector}`);
    // }
    for (const rule of rules) {
      if (rule.selectorText === selector) {
        if (typeof newStyleValue === "string") {
          rule.style.setProperty(property, newStyleValue);
        } else if (typeof newStyleValue === "undefined") {
          rule.style.setProperty(property, "");
        } else {
          rule.style.removeProperty(property);
        }
        return; // Exit after updating the correct rule
      }
    }
    //olddddd
    // for (const rule of rules) {
    //   console.log(`${rule} and ${selector} and ${property}and ${newStyleValue}`);
    //   rule.style.setProperty(property, newStyleValue ? newStyleValue : "");
    // }
  }
}
