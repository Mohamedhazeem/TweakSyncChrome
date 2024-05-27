import { ElementDetails, ElementStyles } from "../types/ElementDetailTypes";
let clickedElement : HTMLElement | null = null;
let currentElement : HTMLElement | null = null;

function getElementDetails(element: HTMLElement): Promise<ElementDetails> {
  return new Promise((resolve, reject) => {
    if (!element) {
      console.error("Element is null");
      reject(new Error("Element is null"));
      return;
    }

    const details = {
      tagName: element.tagName.toLowerCase(),
      id: element.id,
      className: element.className,
      textContent: getCurrentElementText(element),
      attributes: Object.fromEntries(
        [...element.attributes].map((attr) => [attr.name, attr.value])
      ),
      temporaryId: element.getAttribute("data-temporaryid") || null,
      path: getElementPath(element),
      styles: getElementStyles(element),
    };

    console.log("Element details resolved:", details);
    resolve(details);
  });
}
function getElementStyles(element: HTMLElement): ElementStyles {
  const styles: ElementStyles = {
    inline: {},
    external: {
      classes: {},
      ids: {},
      tags: {},
      attribute: {},
      descendant: {}
    }
  };

  const classList = Array.from(element.classList);
  const elementId = element.id;
  const tagName = element.tagName.toLowerCase();

  // Collect inline styles
  const inlineStyles = element.style;
  for (let i = 0; i < inlineStyles.length; i++) {
    const propertyName = inlineStyles[i];
    styles.inline[propertyName] = inlineStyles.getPropertyValue(propertyName);
  }

  // Helper function to determine if a selector is a descendant selector
  const isDescendantSelector = (selector: string): boolean => {
    return (
      selector.includes(" ") || // Descendant
      selector.includes(">") || // Direct child
      selector.includes("+") || // Adjacent sibling
      selector.includes("~") // General sibling
    );
  };

  // Collect external styles
  for (const sheet of document.styleSheets) {
    try {
      if (sheet instanceof CSSStyleSheet) {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSStyleRule) {
            const selector = rule.selectorText;

            // Check if the selector matches the element as a descendant
            if (element.matches(selector) && isDescendantSelector(selector)) {
              if (!styles.external.descendant[selector]) {
                styles.external.descendant[selector] = {};
              }
              for (let i = 0; i < rule.style.length; i++) {
                const propertyName = rule.style[i];
                styles.external.descendant[selector][propertyName] = rule.style.getPropertyValue(propertyName);
              }
            }

            // Check if the selector matches any class of the element
            classList.forEach(className => {
              const classSelector = `.${className}`;
              if (selector.includes(classSelector) && element.matches(selector) && !isDescendantSelector(selector)) {
                if (!styles.external.classes[className]) {
                  styles.external.classes[className] = {};
                }
                for (let i = 0; i < rule.style.length; i++) {
                  const propertyName = rule.style[i];
                  styles.external.classes[className][propertyName] = rule.style.getPropertyValue(propertyName);
                }
              }
            });

            // Check if the selector matches the element's ID
            const idSelector = `#${elementId}`;
            if (elementId && selector.includes(idSelector) && element.matches(selector) && !isDescendantSelector(selector)) {
              if (!styles.external.ids[elementId]) {
                styles.external.ids[elementId] = {};
              }
              for (let i = 0; i < rule.style.length; i++) {
                const propertyName = rule.style[i];
                styles.external.ids[elementId][propertyName] = rule.style.getPropertyValue(propertyName);
              }
            }

            // Check if the selector matches the element's tag
            if (selector === tagName && !isDescendantSelector(selector)) {
              if (!styles.external.tags[tagName]) {
                styles.external.tags[tagName] = {};
              }
              for (let i = 0; i < rule.style.length; i++) {
                const propertyName = rule.style[i];
                styles.external.tags[tagName][propertyName] = rule.style.getPropertyValue(propertyName);
              }
            }

            // Check if the selector is an attribute selector
            if (selector.includes("[") && selector.includes("]") && element.matches(selector) && !isDescendantSelector(selector)) {
              if (!styles.external.attribute[selector]) {
                styles.external.attribute[selector] = {};
              }
              for (let i = 0; i < rule.style.length; i++) {
                const propertyName = rule.style[i];
                styles.external.attribute[selector][propertyName] = rule.style.getPropertyValue(propertyName);
              }
            }
            
          }
        }
      }
    } catch (e) {
      console.warn('Could not access stylesheet rules:', e);
    }
  }

  return styles;
}

// function getElementStyles(element: HTMLElement): {
//   [className: string]: { [property: string]: string };
// } {
//   const stylesByClass: { [className: string]: { [property: string]: string } } =
//     {};

//   // Get all classes applied to the element
//   const classList = Array.from(element.classList);

//   // Iterate over all stylesheets
//   for (const sheet of document.styleSheets) {
//     try {
//       // Some stylesheets might be cross-origin, and accessing their rules will throw an error
//       for (const rule of (sheet as CSSStyleSheet).cssRules) {
//         if (rule instanceof CSSStyleRule) {
//           const selector = rule.selectorText;

//           // Check if the selector matches any class of the element
//           for (const className of classList) {
//             const classSelector = `.${className}`;
//             if (selector.includes(classSelector)) {
//               if (!stylesByClass[className]) {
//                 stylesByClass[className] = {};
//               }

//               // Add styles from CSS rules to the specific class entry
//               for (let i = 0; i < rule.style.length; i++) {
//                 const propertyName = rule.style[i];
//                 stylesByClass[className][propertyName] =
//                   rule.style.getPropertyValue(propertyName);
//               }
//             }
//           }
//         }
//       }
//     } catch (e) {
//       console.warn("Could not access stylesheet rules:", e);
//     }
//   }

//   // Collect inline styles
//   const inlineStyles = element.style;
//   if (inlineStyles.length > 0) {
//     const inlineClass = "inline";
//     stylesByClass[inlineClass] = {};
//     for (let i = 0; i < inlineStyles.length; i++) {
//       const propertyName = inlineStyles[i];
//       stylesByClass[inlineClass][propertyName] =
//         inlineStyles.getPropertyValue(propertyName);
//     }
//   }

//   return stylesByClass;
// }
let lastClickedElement: HTMLElement;

function isValidChromeRuntime() {
  return chrome.runtime && !!chrome.runtime.getManifest();
}

function getElementPath(element: HTMLElement) {
  const path = [];
  while (element) {
    let tagName = element.tagName.toLowerCase();
    if (element.id) {
      tagName += `#${element.id}`;
    } else if (element.className) {
      const classes = element.className.split(" ").filter(Boolean);
      if (classes.length > 0) {
        tagName += `.${classes.join(".")}`;
      }
    } else {
      const siblingIndex =
        Array.from(element.parentNode?.children || []).indexOf(element) + 1;
      tagName += `:nth-child(${siblingIndex})`;
    }
    path.unshift(tagName);
    element = element.parentElement as HTMLElement;
  }
  return path.join(" > ");
}

document.addEventListener("click", (event) => {
  event.preventDefault();

  //const clickedElement = event.target as HTMLElement;
  // remove previous temporaryId
  //   if (lastClickedElement && lastClickedElement !== clickedElement && !clickedElement.classList.contains('noTemporaryId')) {
  //     lastClickedElement.removeAttribute('data-temporaryid');
  // }
  const targetElement = event.target as HTMLElement;

  // If the clicked element is different from the last one, reset the current element
  if (targetElement !== clickedElement) {
    currentElement = null;
    clickedElement = targetElement;
  }

  if (!currentElement) {
    // If currentElement is null, set it to the clicked element
    currentElement = targetElement;
  } else {
    // If currentElement is not null, set it to the parent element
    currentElement = currentElement.parentElement;
  }

  lastClickedElement = clickedElement;
  if (!clickedElement.hasAttribute("data-temporaryid")) {
    const temporaryId = generateTemporaryId();
    clickedElement.setAttribute("data-temporaryid", temporaryId);
  }
  if (currentElement) {
    // If there's a current element, get its details and send them
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
  }
});

function generateTemporaryId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
function updateText() {
  const elementCache: { [key: string]: HTMLElement | null } = {};

  return (text: string, temporaryId: string) => {
    if (!(temporaryId in elementCache)) {
      console.log("Caching element");
      elementCache[temporaryId] = document.querySelector(
        `[data-temporaryid="${temporaryId}"]`
      );
    }

    const element = elementCache[temporaryId];
    if (!element) {
      console.error(`Element with id ${temporaryId} not found`);
      return;
    }

    console.log("Updating text content");
    setCurrentElementText(element, text);
    // element.textContent = text;
  };
}
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log(message.action);
  if (message.action === "updateTextContent") {
    updateText()(message.text, message.temporaryId);
    sendResponse({ status: "success" });
  } else if (message.action === "getUpdatedDetails") {
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
  }
  return true;
});
function getCurrentElementText(element: HTMLElement): string {
  let currentText = "";

  // Iterate through the child nodes of the element
  element.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      currentText += node.textContent?.trim() ?? "";
    }
  });

  return currentText;
}
function setCurrentElementText(element: HTMLElement, text: string): void {
  element.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent = text;
    }
  });
}
