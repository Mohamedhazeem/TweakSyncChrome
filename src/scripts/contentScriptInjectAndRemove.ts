export function executeContentScript(tabId: number, url: string) {
  if (!url.startsWith("chrome://")) {
    injectCSS(tabId);
    chrome.scripting.executeScript(
      {
        target: { tabId },
        files: ["scripts/content.js"],
      },
      () => {
        console.log("Inject Content Script");
        chrome.runtime.sendMessage({
          action: "contentScriptInjected",
          toast: "Editing has started successfully!",
        });
        chrome.tabs.sendMessage(tabId, {
          action: "isContentScriptEditable",
          isEditable: true,
        });
      }
    );
  } else {
    chrome.runtime.sendMessage({
      action: "contentScriptCantInjected",
      toast:
        "Unable to apply changes to the current page. Please ensure you are on a supported page or try again later.",
    });
    console.log("Cannot inject script into a chrome:// URL");
  }
}
export function injectContentScript() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    if (tabs.length > 0) {
      const currentTab = tabs[0];
      chrome.storage.session.get([`contentScriptInjected_${currentTab.id}`]).then((result) => {
        if (!result[`contentScriptInjected_${currentTab.id}`]) {
          executeContentScript(currentTab.id!, currentTab.url!);
          chrome.storage.session.set({
            [`contentScriptInjected_${currentTab.id}`]: true,
          });
        } else {
          chrome.runtime.sendMessage({
            action: "contentScriptInjected",
            toast: "Editing already started",
          });
        }
      });
    }
  });
}
export function reinjectContentScript() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const currentTab = tabs[0];
    chrome.storage.session.get([`contentScriptInjected_${currentTab.id}`], (result) => {
      if (result[`contentScriptInjected_${currentTab.id}`]) {
        chrome.storage.session.remove([`contentScriptInjected_${currentTab.id}`]).then(() => {
          chrome.storage.session.set({
            [`contentScriptInjected_${currentTab.id}`]: true,
          });
          executeContentScript(currentTab.id!, currentTab.url!);
        });
      }
    });
  });
}
export function removeContentScript() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const tabId = tabs[0].id;
    chrome.storage.session.get([`contentScriptInjected_${tabId}`], (result) => {
      if (result[`contentScriptInjected_${tabId}`]) {
        chrome.storage.session.remove([`contentScriptInjected_${tabId}`]);
        // chrome.tabs.reload(tabId!);
        chrome.tabs.sendMessage(tabId!, {
          action: "isContentScriptEditable",
          isEditable: false,
        });
        chrome.runtime.sendMessage({
          action: "contentScriptCantInjected",
          toast: "Editing stopped.",
        });
      }
    });
  });
}
export function injectCSS(tabId: number) {
  chrome.scripting.insertCSS(
    {
      target: { tabId: tabId },
      files: ["assets/contentcss-3YaSVoRQ.css"],
    },
    () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log("CSS injected successfully.");
      }
    }
  );
}
