import { getElementDetails } from "../getElementDetails";
import { currentElement, isValidChromeRuntime } from "../../scripts/content";

type UpdateAttributesType = {
  name: string;
  value: string | object;
};
export function updateAttributes({ name, value }: UpdateAttributesType) {
  if (name === "data-*" && typeof value === "object" && !Array.isArray(value)) {
    // Get all current data-* attributes
    const currentDataAttributes = Array.from(currentElement!.attributes)
      .filter((attr) => attr.name.startsWith("data-") && attr.name !== "data-tweaksync-id")
      .map((attr) => attr.name);

    // Set new data-* attributes
    const newDataAttributes = Object.entries(value).map(([key, value]) => {
      if (value) {
        currentElement!.setAttribute(key, String(value)); // Ensure value is a string
      }
      return key;
    });
    currentDataAttributes.forEach((attr) => {
      if (!newDataAttributes.includes(attr)) {
        currentElement!.removeAttribute(attr);
      }
    });

    if (currentElement) {
      getElementDetails(currentElement).then((details) => {
        if (isValidChromeRuntime()) {
          chrome.runtime.sendMessage({ action: "elementClicked", details });
        }
      });
    }
  } else if (typeof value === "string") {
    if (value) {
      currentElement!.setAttribute(name, value);
    } else {
      currentElement!.removeAttribute(name);
    }
  } else {
    currentElement!.setAttribute(name, "");
  }
}
