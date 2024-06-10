import { ElementDetails, ElementStyles } from "../types/ElementTypes";
import { generateTemporaryId } from "../utils/generateTemporaryId";
import { updateStyles } from "../utils/updateStyles";
import { getCurrentElementText, updateText } from "../utils/elementTextContent";
import { resetStyles, styles } from "../utils/constants";
import { getElementPath } from "../utils/getElementPath";
import { handleAtrules } from "../utils/styleHandlers";
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
    };

    console.log("Element details resolved:", details);
    resolve(details);
  });
}

function getElementStyles(element: HTMLElement): Promise<ElementStyles> {
  return new Promise((resolve, reject) => {
    resetStyles();
    const classList = Array.from(element.classList);
    const elementId = element.id;
    const tagName = element.tagName.toLowerCase();
    styles.temporaryId = element.getAttribute("data-temporaryid") || null;

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
    type Context = {
      [key: string]: string;
    };
    const processRule = (
      rule: CSSStyleRule | CSSKeyframeRule,
      _selector: string,
      context: Context
    ) => {
      for (let i = 0; i < rule.style.length; i++) {
        const propertyName = rule.style[i];
        context[propertyName] = rule.style.getPropertyValue(propertyName);
      }
    };

    const processAtRule = (
      rule:
        | CSSMediaRule
        | CSSKeyframesRule
        | CSSFontFaceRule
        | CSSSupportsRule
        | CSSContainerRule,
      atRuleName: string
    ) => {
      if (!styles.external.atRules[atRuleName]) {
        styles.external.atRules[atRuleName] = {};
      }
      console.log(rule);
      if (rule instanceof CSSMediaRule) {
        for (const subRule of Array.from(rule.cssRules)) {
          if (subRule instanceof CSSStyleRule) {
            const selector = subRule.selectorText;
            if (!styles.external.atRules[atRuleName][selector]) {
              styles.external.atRules[atRuleName][selector] = {};
            }
            // if (element.matches(selector)) {
            processRule(
              subRule,
              selector,
              styles.external.atRules[atRuleName][selector]
            );
            // }
          }
        }
      } else if (rule instanceof CSSKeyframesRule) {
        const keyframes = rule.cssRules;
        for (let i = 0; i < keyframes.length; i++) {
          const keyframeRule = keyframes[i] as CSSKeyframeRule;
          const keyframe = keyframeRule.keyText;
          if (!styles.external.atRules[atRuleName][keyframe]) {
            styles.external.atRules[atRuleName][keyframe] = {};
          }
          processRule(
            keyframeRule,
            keyframe,
            styles.external.atRules[atRuleName][keyframe]
          );
        }
      } else if (rule instanceof CSSSupportsRule) {
        for (const subRule of Array.from(rule.cssRules)) {
          if (subRule instanceof CSSStyleRule) {
            const selector = subRule.selectorText;
            if (!styles.external.atRules[atRuleName][selector]) {
              styles.external.atRules[atRuleName][selector] = {};
            }
            processRule(
              subRule,
              selector,
              styles.external.atRules[atRuleName][selector]
            );
          }
        }
      } else if (rule instanceof CSSContainerRule) {
        // Handle @container rules
        const containerRules: { [key: string]: { [key: string]: string } } = {};
        for (const subRule of Array.from(rule.cssRules)) {
          // Process each sub-rule inside the @container rule
          // Assuming each sub-rule is a CSSStyleRule
          if (subRule instanceof CSSStyleRule) {
            const selector = subRule.selectorText;
            if (!containerRules[selector]) {
              containerRules[selector] = {};
            }
            processRule(subRule, selector, containerRules[selector]);
          }
          styles.external.atRules[atRuleName] = containerRules;
        }
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
                    processRule(
                      rule,
                      selector,
                      styles.external.descendant[selector]
                    );
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
                      processRule(
                        rule,
                        classSelector,
                        styles.external.classes[className]
                      );
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
                    processRule(
                      rule,
                      idSelector,
                      styles.external.ids[elementId]
                    );
                  }

                  // Handle tag selectors
                  if (selector === tagName && !isDescendantSelector(selector)) {
                    if (!styles.external.tags[tagName]) {
                      styles.external.tags[tagName] = {};
                    }
                    processRule(rule, tagName, styles.external.tags[tagName]);
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
                      processRule(
                        rule,
                        selector,
                        styles.external.attribute[selector]
                      );
                    }
                  }

                  // Handle pseudo-element selectors
                  if (isPseudoElementSelector(selector)) {
                    const baseSelector = selector.split("::")[0];
                    if (element.matches(baseSelector)) {
                      if (!styles.external.pseudoElementStyles[selector]) {
                        styles.external.pseudoElementStyles[selector] = {};
                      }
                      processRule(
                        rule,
                        selector,
                        styles.external.pseudoElementStyles[selector]
                      );
                    }
                  }

                  // Handle pseudo-class selectors
                  if (isPseudoClassSelector(selector)) {
                    const baseSelector = selector.split(":")[0];
                    if (element.matches(baseSelector)) {
                      if (!styles.external.pseudoClassStyles[selector]) {
                        styles.external.pseudoClassStyles[selector] = {};
                      }
                      processRule(
                        rule,
                        selector,
                        styles.external.pseudoClassStyles[selector]
                      );
                    }
                  }
                } catch (e) {
                  console.warn(
                    `Error processing rule for selector '${selector}':`,
                    e
                  );
                  reject(new Error("Style Error"));
                }
              }
              handleAtrules(rule, processAtRule);
            }
          }
        } else {
          console.warn("Skipping cross-origin stylesheet:", sheet.href);
        }
      } catch (e) {
        console.warn("Could not access stylesheet rules:", e);
      }
    }

    resolve(styles);
  });
}

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
    sendResponse({ status: "success" });
  } else if (message.action === "updateStyles") {
    updateStyles({
      newStyleValue: message.value,
      selector: message.selector,
      property: message.property,
      temporaryId: message.temporaryId,
    });
    sendResponse({ status: "success" });
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
