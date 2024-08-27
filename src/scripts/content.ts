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
  if (message.action === "isContentScriptEditable") {
    isEditable = message.isEditable;
    if (!isEditable) {
      resetContentScript();
    }
    sendResponse();
    return true;
  }
  if (message.action === "updateTextContent") {
    updateText({ text: message.text, temporaryId: message.temporaryId });
    sendResponse();
    return true;
  } else if (message.action === "updateStyles") {
    updateStyles({
      newStyleValue: message.value,
      selector: message.selector,
      property: message.property,
      temporaryId: message.temporaryId,
    });
    sendResponse();
    return true;
  } else if (message.action === "updateAttributes") {
    updateAttributes({ name: message.name, value: message.value });
    sendResponse();
    return true;
  } else if (message.action === "addSelector") {
    addSelector(message.selector);
    sendResponse();
    return true;
  } else if (message.action === "renameSelector") {
    renameSelector(message.oldSelector, message.newSelector);
    sendResponse();
    return true;
  } else if (message.action === "getElementTemporaryId") {
    if (lastClickedElement) {
      getElementTemporaryId(lastClickedElement)
        .then((details) => {
          sendResponse(details);
        })
        .catch((error) => {
          console.log("Error getting element temporary ID:", error);
          sendResponse();
        });
    } else {
      sendResponse({ message: "No temporary ID" });
    }
    return true;
  } else if (message.action === "getUpdatedElement") {
    if (lastClickedElement) {
      getElementDetails(lastClickedElement)
        .then((details) => {
          if (isValidChromeRuntime()) {
            chrome.runtime.sendMessage({ action: "elementClicked", details });
          }
          sendResponse(details);
        })
        .catch((error) => {
          console.log("Error getting element details:", error);
          sendResponse({ message: "Error getting element details: " + error.message });
        });
    } else {
      sendResponse({ message: "No element selected" });
    }
    return true;
  } else if (message.action === "getUpdatedStyle") {
    if (lastClickedElement) {
      getElementStyles(lastClickedElement)
        .then((styles) => {
          if (isValidChromeRuntime()) {
            chrome.runtime.sendMessage({ action: "styleClicked", styles });
          }
          sendResponse(styles);
        })
        .catch((error) => {
          console.log("Error getting element style:", error);
          sendResponse({ message: "Error getting element style: " + error.message });
        });
    } else {
      sendResponse({ message: "No element selected" });
    }
    return true;
  } else {
    sendResponse({ message: "No element selected or invalid action" });
    return true;
  }
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
