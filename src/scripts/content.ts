import { ElementDetails, ElementStyles } from "../types/ElementTypes";
let clickedElement: HTMLElement | null = null;
let currentElement: HTMLElement | null = null;

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
      descendant: {},
      pseudoElementStyles: {},
      pseudoClassStyles: {},
    },
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

  // Helper functions to determine selector types
  const isDescendantSelector = (selector: string): boolean => {
    return (
      selector.includes(" ") ||
      selector.includes(">") ||
      selector.includes("+") ||
      selector.includes("~")
    );
  };

  const isPseudoElementSelector = (selector: string): boolean => {
    return selector.includes("::");
  };

  const isPseudoClassSelector = (selector: string): boolean => {
    return selector.includes(":") && !isPseudoElementSelector(selector);
  };
  // const isComplexSelector = (selector: string): boolean => {
  //   const complexSelectors = [
  //     ":first-child",
  //     ":last-child",
  //     ":nth-child(n)",
  //     ":nth-last-child(n)",
  //     ":first-of-type",
  //     ":last-of-type",
  //     ":nth-of-type(n)",
  //     ":nth-last-of-type(n)",
  //     ":only-child",
  //     ":only-of-type",
  //     ":empty",
  //     ":root",
  //     ":target",
  //     ":hover",
  //     ":active",
  //     ":focus",
  //     ":focus-visible",
  //     ":focus-within",
  //     ":checked",
  //     ":enabled",
  //     ":disabled",
  //     ":not(selector)",
  //     "::before",
  //     "::after",
  //     "::first-line",
  //     "::first-letter",
  //     "::selection",
  //     " :hover",
  //     ":focus",
  //     ":active",
  //     ":visited",
  //     ":link",
  //     ":target",
  //     ":enabled",
  //     ":disabled",
  //     ":checked",
  //     ":indeterminate",
  //     ":valid",
  //     ":invalid",
  //     ":optional",
  //     ":required",
  //     ":read-only",
  //     ":read-write",
  //     ":default",
  //     ":placeholder",
  //     ":checked",
  //     ":default",
  //     ":only-child",
  //     ":only-of-type",
  //     ":nth-child()",
  //     ":nth-last-child()",
  //     ":nth-of-type()",
  //     ":nth-last-of-type()",
  //     ":root",
  //     ":empty",
  //     ":fullscreen",
  //     ":first-child",
  //     ":last-child",
  //     ":first-of-type",
  //     ":last-of-type",
  //     ":focus-within",
  //     ":lang()",
  //     ":dir()",
  //     ":matches()",
  //     ":any()",
  //     ":not()",
  //     // Add additional complex selectors here
  //   ];

  //   return complexSelectors.some((complexSelector) =>
  //     selector.includes(complexSelector)
  //   );
  // };

  // const isValidSelector = (selector: string): boolean => {
  //   try {
  //     document.querySelector(selector);
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // };
  const isValidSelector = (selector: string): boolean => {
    const pseudoSelectorRegex = /::?[\w-]+/g;
    const cleanedSelector = selector.replace(pseudoSelectorRegex, "");
    try {
      document.querySelector(cleanedSelector);
      return true;
    } catch {
      return false;
    }
  };
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      if (
        !sheet.href ||
        new URL(sheet.href).origin === window.location.origin
      ) {
        if (sheet instanceof CSSStyleSheet) {
          for (const rule of Array.from(sheet.cssRules)) {
            if (rule instanceof CSSStyleRule) {
              const selector = rule.selectorText;

              if (
                !selector ||
                selector.trim() === "" ||
                !isValidSelector(selector)
                //  ||
                // isComplexSelector(selector)
              ) {
                continue;
              }

              try {
                // Handle descendant selectors
                if (
                  element.matches(selector) &&
                  isDescendantSelector(selector)
                ) {
                  if (!styles.external.descendant[selector]) {
                    styles.external.descendant[selector] = {};
                  }
                  for (let i = 0; i < rule.style.length; i++) {
                    const propertyName = rule.style[i];
                    styles.external.descendant[selector][propertyName] =
                      rule.style.getPropertyValue(propertyName);
                  }
                  continue;
                }

                // Handle class selectors
                classList.forEach((className) => {
                  const classSelector = `.${className}`;
                  if (
                    selector.includes(classSelector) &&
                    element.matches(selector) &&
                    !isDescendantSelector(selector)
                  ) {
                    if (!styles.external.classes[className]) {
                      styles.external.classes[className] = {};
                    }
                    for (let i = 0; i < rule.style.length; i++) {
                      const propertyName = rule.style[i];
                      styles.external.classes[className][propertyName] =
                        rule.style.getPropertyValue(propertyName);
                    }
                  }
                });

                // Handle ID selectors
                const idSelector = `#${elementId}`;
                if (
                  elementId &&
                  selector.includes(idSelector) &&
                  element.matches(selector) &&
                  !isDescendantSelector(selector)
                ) {
                  if (!styles.external.ids[elementId]) {
                    styles.external.ids[elementId] = {};
                  }
                  for (let i = 0; i < rule.style.length; i++) {
                    const propertyName = rule.style[i];
                    styles.external.ids[elementId][propertyName] =
                      rule.style.getPropertyValue(propertyName);
                  }
                }

                // Handle tag selectors
                if (selector === tagName && !isDescendantSelector(selector)) {
                  if (!styles.external.tags[tagName]) {
                    styles.external.tags[tagName] = {};
                  }
                  for (let i = 0; i < rule.style.length; i++) {
                    const propertyName = rule.style[i];
                    styles.external.tags[tagName][propertyName] =
                      rule.style.getPropertyValue(propertyName);
                  }
                }

                // Handle attribute selectors
                if (
                  selector.includes("[") &&
                  selector.includes("]") &&
                  element.matches(selector) &&
                  !isDescendantSelector(selector)
                ) {
                  if (
                    !isPseudoElementSelector(selector) &&
                    !isPseudoClassSelector(selector)
                  ) {
                    if (!styles.external.attribute[selector]) {
                      styles.external.attribute[selector] = {};
                    }
                    for (let i = 0; i < rule.style.length; i++) {
                      const propertyName = rule.style[i];
                      styles.external.attribute[selector][propertyName] =
                        rule.style.getPropertyValue(propertyName);
                    }
                  }
                }

                // Handle pseudo-element selectors
                if (isPseudoElementSelector(selector)) {
                  const baseSelector = selector.split("::")[0];
                  if (element.matches(baseSelector)) {
                    if (!styles.external.pseudoElementStyles[selector]) {
                      styles.external.pseudoElementStyles[selector] = {};
                    }
                    for (let i = 0; i < rule.style.length; i++) {
                      const propertyName = rule.style[i];
                      styles.external.pseudoElementStyles[selector][
                        propertyName
                      ] = rule.style.getPropertyValue(propertyName);
                    }
                  }
                }

                // Handle pseudo-class selectors
                if (isPseudoClassSelector(selector)) {
                  const baseSelector = selector.split(":")[0];
                  if (element.matches(baseSelector)) {
                    if (!styles.external.pseudoClassStyles[selector]) {
                      styles.external.pseudoClassStyles[selector] = {};
                    }
                    for (let i = 0; i < rule.style.length; i++) {
                      const propertyName = rule.style[i];
                      styles.external.pseudoClassStyles[selector][
                        propertyName
                      ] = rule.style.getPropertyValue(propertyName);
                    }
                  }
                }
              } catch (e) {
                console.warn(
                  `Error processing rule for selector '${selector}':`,
                  e
                );
              }
            }
          }
        }
      } else {
        console.warn("Skipping cross-origin stylesheet:", sheet.href);
      }
    } catch (e) {
      console.warn("Could not access stylesheet rules:", e);
    }
  }

  return styles;
}

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
  }
});

function generateTemporaryId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
// const { property, value, temporaryId } = message;

// // Update styles based on the received data
// // Example: Find the element with temporaryId and update its styles
// const element = document.querySelector(`[data-temporaryid="${temporaryId}"]`) as HTMLElement;
// if (element) {
//   element.style.setProperty(property, value);
// }
type getElementTypes = {
  temporaryId: string;
  text?: string;
  selector?: string;
  property?: string;
  newColor?: string;
};
function getElement({ temporaryId }: getElementTypes) {
  const elementCache: { [key: string]: HTMLElement | null } = {};

  return () => {
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
    } else {
      return element;
    }
  };
}
function updateText({ text, temporaryId }: getElementTypes) {
  const getElementFunction = getElement({ temporaryId });
  const element = getElementFunction(); // Call the function to get the element
  if (element) {
    setCurrentElementText(element, text!);
  } else {
    console.error(`Element with temporary ID ${temporaryId} not found`);
  }
}
function updateColor({ newColor, property, temporaryId }: getElementTypes) {
  const getElementFunction = getElement({ temporaryId });
  const element = getElementFunction();
  if (element) {
    element.style.setProperty(property!, newColor!);
    // }
  } else {
    console.error(`Element with temporary ID ${temporaryId} not found`);
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log(message.action);
  if (message.action === "updateTextContent") {
    updateText({ text: message.text, temporaryId: message.temporaryId });
    sendResponse({ status: "success" });
  } else if (message.action === "updateStyles") {
    updateColor({newColor: message.value, property:message.property, temporaryId: message.temporaryId });
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
  element.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      currentText += node.textContent?.trim() ?? "";
    }
  });

  return currentText;
}
function setCurrentElementText(
  element: HTMLElement | undefined,
  text: string
): void {
  element?.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent = text;
    }
  });
}
