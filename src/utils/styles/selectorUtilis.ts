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
export function renameSelector(oldSelector: string, newSelector: string) {
  try {
    console.log(`Renaming selector from ${oldSelector} to ${newSelector}`);
    let styleElement = document.querySelector("style");
    console.log("Style element:", styleElement);

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

    let oldRuleIndex = -1;
    let cssText = "";

    // Find the rule index for the old selector
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      const rule = styleSheet.cssRules[i] as CSSStyleRule;
      console.log("Checking rule:", rule.selectorText);
      if (rule.selectorText === oldSelector) {
        oldRuleIndex = i;
        cssText = rule.style.cssText;
        console.log(`Found old selector: ${oldSelector} with properties: ${cssText}`);
        break;
      }
    }

    if (oldRuleIndex === -1) {
      console.warn(`Old selector not found: ${oldSelector}`);
      return;
    }

    // Insert the new rule
    const newRuleString = `${newSelector} { ${cssText} }`;
    styleSheet.insertRule(newRuleString, styleSheet.cssRules.length);
    console.log(`Added new selector: ${newSelector} with properties: ${cssText}`);

    // Remove the old rule
    styleSheet.deleteRule(oldRuleIndex);
    console.log(`Deleted old selector: ${oldSelector}`);
  } catch (error) {
    console.error("Error in renameSelector function:", error);
  }
}
