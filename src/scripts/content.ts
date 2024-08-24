import { generateTemporaryId } from "../utils/generateTemporaryId";
import { updateStyles } from "../utils/styles/updateStyles";
import { updateText } from "../utils/elementTextContent";
import { getElementDetails, getElementTemporaryId } from "../utils/getElementDetails";
import { getElementStyles } from "../utils/styles/getElementStyles";
import { updateAttributes } from "../utils/attributes/updateAttributes";
import {
  throttledUpdateOutline,
  outlineElement,
  createOutlineElement,
  updateOutline,
  outlineElementNull,
} from "./UpdateElementOutlineAtContent";
import { addSelector, renameSelector } from "@/utils/styles/selectorUtilis";

let clickedElement: HTMLElement | null = null;
export let currentElement: HTMLElement | null = null;
export let lastClickedElement: HTMLElement | null = null;
let isEditable: boolean;
let temporaryId: string;

export function isValidChromeRuntime(): boolean {
  return chrome.runtime && !!chrome.runtime.getManifest();
}

document.addEventListener(
  "click",
  (event) => {
    if (!isEditable) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    const targetElement = event.target as HTMLElement;
    if (targetElement?.hasAttribute("data-tweaksyncui")) {
      return;
    }
    if (targetElement !== clickedElement) {
      currentElement = null;
      clickedElement = targetElement;
    }

    if (!currentElement) {
      currentElement = targetElement;
    } else {
      currentElement = currentElement.parentElement;
    }

    lastClickedElement = clickedElement;
    // Ensure the outline element exists
    if (!outlineElement) {
      createOutlineElement();
    }
    updateOutline(currentElement!);

    if (!clickedElement.hasAttribute("data-tweaksync-id")) {
      temporaryId = generateTemporaryId();
      clickedElement.setAttribute("data-tweaksync-temporaryid", temporaryId);
    }
    if (currentElement) {
      getElementDetails(currentElement).then((details) => {
        if (isValidChromeRuntime()) {
          if (details.temporaryId == null) {
            details.temporaryId = `${temporaryId}`;
          }
          chrome.runtime.sendMessage({ action: "elementClicked", details });
        }
      });
      getElementStyles(currentElement).then((styles) => {
        if (isValidChromeRuntime()) {
          console.log(styles);
          chrome.runtime.sendMessage({ action: "styleClicked", styles });
        }
      });
    }
  },
  true
);

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log(message.action);
  if (message.action === "isContentScriptEditable") {
    isEditable = message.isEditable;
    if (!isEditable) {
      resetContentScript();
    }
    return true;
  }
  if (message.action === "updateTextContent") {
    updateText({ text: message.text, temporaryId: message.temporaryId });
  } else if (message.action === "updateStyles") {
    updateStyles({
      newStyleValue: message.value,
      selector: message.selector,
      property: message.property,
      temporaryId: message.temporaryId,
    });
    return true;
  } else if (message.action === "updateAttributes") {
    updateAttributes({ name: message.name, value: message.value });
    return true;
  } else if (message.action === "addSelector") {
    addSelector(message.selector);
    return true;
  } else if (message.action === "renameSelector") {
    renameSelector(message.oldSelector, message.newSelector);
    return true;
  } else if (message.action === "getElementTemporaryId" && lastClickedElement) {
    getElementTemporaryId(lastClickedElement).then((detail) => {
      sendResponse({ temporaryId: detail });
    });
    return true;
  } else if (message.action === "getUpdatedElement" && lastClickedElement) {
    getElementDetails(lastClickedElement)
      .then((details) => {
        if (isValidChromeRuntime()) {
          chrome.runtime.sendMessage({ action: "elementClicked", details });
        }
        sendResponse(details);
      })
      .catch((error) => {
        console.error("Error getting element details:", error);
        sendResponse({ status: "error", message: error.message });
      });
    return true;
  } else if (message.action === "getUpdatedStyle" && lastClickedElement) {
    getElementStyles(lastClickedElement)
      .then((styles) => {
        if (isValidChromeRuntime()) {
          chrome.runtime.sendMessage({ action: "styleClicked", styles });
        }
        sendResponse(styles);
      })
      .catch((error) => {
        console.error("Error getting element style:", error);
        sendResponse({ status: "error", message: error.message });
      });
    return true;
  }
  return true;
});
window.addEventListener("resize", throttledUpdateOutline);
window.addEventListener("scroll", throttledUpdateOutline);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    resetContentScript();
  }
});
const resetContentScript = () => {
  if (outlineElement) {
    outlineElement.remove();
    outlineElementNull();
  }
  currentElement = lastClickedElement = null;
};
