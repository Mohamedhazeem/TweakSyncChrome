import { generateTemporaryId } from "../utils/generateTemporaryId";
import { updateStyles } from "../utils/updateStyles";
import { updateText } from "../utils/elementTextContent";
import { getElementDetails } from "../utils/getElementDetails";
import { getElementStyles } from "../utils/getElementStyles";
let clickedElement: HTMLElement | null = null;
let currentElement: HTMLElement | null = null;

let lastClickedElement: HTMLElement;

function isValidChromeRuntime() {
  return chrome.runtime && !!chrome.runtime.getManifest();
}

document.addEventListener("click", (event) => {
  event.preventDefault();
  const targetElement = event.target as HTMLElement;

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
  if (!clickedElement.hasAttribute("data-temporaryid")) {
    const temporaryId = generateTemporaryId();
    clickedElement.setAttribute("data-temporaryid", temporaryId);
  }
  if (currentElement) {
    getElementDetails(currentElement).then((details) => {
      if (isValidChromeRuntime()) {
        chrome.runtime.sendMessage(
          { action: "elementClicked", details },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error("Error sending message:", chrome.runtime.lastError);
            } else {
              console.log("Message sent successfully", response);
            }
          }
        );
      }
    });
    getElementStyles(currentElement).then((styles) => {
      if (isValidChromeRuntime()) {
        chrome.runtime.sendMessage(
          { action: "styleClicked", styles },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error("Error sending message:", chrome.runtime.lastError);
            } else {
              console.log("Message sent successfully", response);
            }
          }
        );
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
    if (
      message.name === "data-*" &&
      typeof message.value === "object" &&
      !Array.isArray(message.value)
    ) {
      Object.entries(message.value).forEach(([key, value]) => {
        if (typeof value === "string") {
          // Ensure value is a string (or convert as needed)
          lastClickedElement.setAttribute(key, value);
        }
      });
    } else if (typeof message.value === "string") {
      lastClickedElement.setAttribute(message.name, message.value);
    }
  } else if (message.action === "getUpdatedElement") {
    getElementDetails(lastClickedElement)
      .then((details) => {
        console.log("Sending details:", details);
        sendResponse(details);
      })
      .catch((error) => {
        console.error("Error getting element details:", error);
        sendResponse({ status: "error", message: error.message });
      });
    return true;
  } else if (message.action === "getUpdatedStyle") {
    getElementStyles(lastClickedElement)
      .then((styles) => {
        sendResponse(styles);
      })
      .catch((error) => {
        console.error("Error getting element style :", error);
        sendResponse({ status: "error", message: error.message });
      });
  }
  return true;
});
