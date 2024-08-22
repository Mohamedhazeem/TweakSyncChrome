import { getElementDetails } from "../getElementDetails";
import { lastClickedElement, currentElement, isValidChromeRuntime } from "../../scripts/content";

type UpdateAttributesType = {
  name: string;
  value: string | object;
};
export function updateAttributes({ name, value }: UpdateAttributesType) {
  if (name === "data-*" && typeof value === "object" && !Array.isArray(value)) {
    // Get all current data-* attributes
    const currentDataAttributes = Array.from(lastClickedElement!.attributes)
      .filter((attr) => attr.name.startsWith("data-") && attr.name !== "data-temporaryid")
      .map((attr) => attr.name);

    // Set new data-* attributes
    const newDataAttributes = Object.entries(value).map(([key, value]) => {
      if (value) {
        lastClickedElement!.setAttribute(key, String(value)); // Ensure value is a string
      }
      return key;
    });
    currentDataAttributes.forEach((attr) => {
      if (!newDataAttributes.includes(attr)) {
        lastClickedElement!.removeAttribute(attr);
      }
    });
    if (currentElement) {
      getElementDetails(currentElement).then((details) => {
        if (isValidChromeRuntime()) {
          chrome.runtime.sendMessage({ action: "elementClicked", details }, (response) => {
            if (chrome.runtime.lastError) {
              console.error("Error sending message:", chrome.runtime.lastError);
            } else {
              console.log("Message sent successfully", response);
            }
          });
        }
      });
    }
  } else if (typeof value === "string") {
    if (value) {
      lastClickedElement!.setAttribute(name, value);
    } else {
      lastClickedElement!.removeAttribute(name);
    }
  } else {
    lastClickedElement!.setAttribute(name, "");
  }
}
