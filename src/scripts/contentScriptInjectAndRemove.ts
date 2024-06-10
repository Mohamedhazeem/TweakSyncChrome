export function executeContentScript(tabId: number, url: string) {
  if (!url.startsWith("chrome://")) {
    chrome.scripting.executeScript(
      {
        target: { tabId },
        files: ["scripts/content.js"],
      },
      () => {
        console.log("Inject Content Script");
      }
    );
  } else {
    console.log("Cannot inject script into a chrome:// URL");
  }
}
export function injectContentScript() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    if (tabs.length > 0) {
      const currentTab = tabs[0];
      console.log("injectContent script");
      chrome.storage.local
        .get([`contentScriptInjected_${currentTab.id}`])
        .then((result) => {
          if (!result[`contentScriptInjected_${currentTab.id}`]) {
            executeContentScript(currentTab.id!, currentTab.url!);
            chrome.storage.local.set({
              [`contentScriptInjected_${currentTab.id}`]: true,
            });
          }
        });
    }
  });
}
export function reinjectContentScript() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const currentTab = tabs[0];
    chrome.storage.local.get(
      [`contentScriptInjected_${currentTab.id}`],
      (result) => {
        if (result[`contentScriptInjected_${currentTab.id}`]) {
          chrome.storage.local
            .remove([`contentScriptInjected_${currentTab.id}`])
            .then(() => {
              chrome.storage.local.set({
                [`contentScriptInjected_${currentTab.id}`]: true,
              });
              executeContentScript(currentTab.id!, currentTab.url!);
            });
        }
      }
    );
  });
}
export function removeContentScript() {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    const currentTab = tabs[0];
    chrome.storage.local.get(
      [`contentScriptInjected_${currentTab.id}`],
      (result) => {
        if (result[`contentScriptInjected_${currentTab.id}`]) {
          chrome.storage.local.remove([
            `contentScriptInjected_${currentTab.id}`,
          ]);
          chrome.tabs.reload(currentTab.id!);
        }
      }
    );
  });
}
