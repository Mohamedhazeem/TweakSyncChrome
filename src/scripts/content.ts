import { generateTemporaryId } from "../utils/generateTemporaryId";
import { updateStyles } from "../utils/styles/updateStyles";
import { updateText } from "../utils/elementTextContent";
import { getElementDetails } from "../utils/getElementDetails";
import { getElementStyles } from "../utils/styles/getElementStyles";
import { updateAttributes } from "../utils/attributes/updateAttributes";
import {
  throttledUpdateOutline,
  outlineElement,
  createOutlineElement,
  updateOutline,
  outlineElementNull,
} from "./UpdateElementOutlineAtContent";

let clickedElement: HTMLElement | null = null;
export let currentElement: HTMLElement | null = null;
export let lastClickedElement: HTMLElement | null = null;

export function isValidChromeRuntime(): boolean {
  return chrome.runtime && !!chrome.runtime.getManifest();
}

document.addEventListener("click", (event) => {
  event.preventDefault();
  const targetElement = event.target as HTMLElement;
  if (targetElement.hasAttribute("data-TweakSyncUI")) {
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
  console.log("lastClickedElement - ", lastClickedElement);
  // Ensure the outline element exists
  if (!outlineElement) {
    createOutlineElement();
  }
  updateOutline(currentElement!);

  if (!clickedElement.hasAttribute("data-temporaryid")) {
    const temporaryId = generateTemporaryId();
    clickedElement.setAttribute("data-temporaryid", temporaryId);
  }
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
    getElementStyles(currentElement).then((styles) => {
      if (isValidChromeRuntime()) {
        chrome.runtime.sendMessage({ action: "styleClicked", styles }, (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
          } else {
            console.log("Message sent successfully", response);
          }
        });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log(message.action);
  if (message.action === "updateTextContent") {
    updateText({ text: message.text, temporaryId: message.temporaryId });
  } else if (message.action === "updateStyles") {
    updateStyles({
      newStyleValue: message.value,
      selector: message.selector,
      property: message.property,
      temporaryId: message.temporaryId,
    });
  } else if (message.action === "updateAttributes") {
    updateAttributes({ name: message.name, value: message.value });
  } else if (message.action === "getUpdatedElement" && lastClickedElement) {
    getElementDetails(lastClickedElement)
      .then((details) => {
        if (isValidChromeRuntime()) {
          chrome.runtime.sendMessage({ action: "elementClicked", details }, (response) => {
            if (chrome.runtime.lastError) {
              console.error("Error sending message:", chrome.runtime.lastError);
            } else {
              console.log("Message sent successfully", response);
            }
          });
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
          chrome.runtime.sendMessage({ action: "styleClicked", styles }, (response) => {
            if (chrome.runtime.lastError) {
              console.error("Error sending message:", chrome.runtime.lastError);
            } else {
              console.log("Message sent successfully", response);
            }
          });
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
    if (outlineElement) {
      outlineElement.remove();
      outlineElementNull();
    }
    currentElement = lastClickedElement = null;
  }
});
