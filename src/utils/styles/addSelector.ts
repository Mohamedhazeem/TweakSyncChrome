export function addSelector(selector: string) {
  try {
    console.log(selector);
    let styleElement = document.querySelector("style");
    console.log(styleElement);

    if (!styleElement) {
      styleElement = document.createElement("style");
      document.head.appendChild(styleElement);
      console.log("Created and appended new <style> element.");
    }
    const styleSheet = styleElement.sheet;
    if (!styleSheet) {
      console.error("No stylesheet found in <style> element.");
      return;
    }

    let selectorExists = false;
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      const rule = styleSheet.cssRules[i] as CSSStyleRule;
      if (rule.selectorText === selector) {
        selectorExists = true;
        console.log(`Selector already exists: ${selector}`);
        break;
      }
    }

    if (!selectorExists) {
      const ruleString = `${selector} { }`; // Add an empty rule
      styleSheet.insertRule(ruleString, styleSheet.cssRules.length);
      console.log(`Added new selector: ${selector}`);
    }
  } catch (error) {
    console.error("Error in addSelector function:", error);
  }
}
