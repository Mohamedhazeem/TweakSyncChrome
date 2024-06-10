import { getElementTypes } from "../types/ElementTypes";
import { getCachedRules } from "./cache";

export function updateStyles({
  newStyleValue,
  selector,
  property,
  temporaryId,
}: getElementTypes) {
  if (!selector || !property) {
    console.error("Selector or property not provided");
    return;
  }
  if (selector === "inline") {
    // Update the style directly on the element with the provided temporaryId
    const element = document.querySelector(
      `[data-temporaryid="${temporaryId}"]`
    ) as HTMLElement;
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

    for (const rule of rules) {
      rule.style.setProperty(property, newStyleValue!);
    }
  }
}
