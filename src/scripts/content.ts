 import { ElementDetails } from "../types/ElementDetailTypes";

function getElementDetails(element: HTMLElement): Promise<ElementDetails>  {
  return new Promise((resolve, reject) => {
    if (!element) {
      console.error('Element is null');
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
      temporaryId: element.getAttribute('data-temporaryid') || null,
      path: getElementPath(element)
    };

    console.log('Element details resolved:', details);
    resolve(details);
  });
}
let lastClickedElement: HTMLElement;

// function getElementsWithTagNames(): ElementsWithTagNames {
//   const buttons = Array.from(
//     document.querySelectorAll("button")
//   ) as HTMLButtonElement[];
//   const links = Array.from(
//     document.querySelectorAll("a")
//   ) as HTMLAnchorElement[];
//   const spans = Array.from(
//     document.querySelectorAll("span")
//   ) as HTMLSpanElement[];

//   return { buttons, links, spans };
// }

//const elements = getElementsWithTagNames();

// (function disableInteractive(){
  
//   elements.buttons?.forEach((button) => {
//     button.addEventListener("click", (e)=>{
//       e.preventDefault();
//       const clickedElement = e.target as HTMLElement;
//       const details = getElementDetails(clickedElement);
//       chrome.runtime.sendMessage({ action: "elementClicked", details });
//     })
//   });
//   elements.links?.forEach((link) => {
//     link.addEventListener("click", (e)=>{
//       e.preventDefault();
//       const clickedElement = e.target as HTMLElement;
//       const details = getElementDetails(clickedElement);
//       chrome.runtime.sendMessage({ action: "elementClicked", details });
//     })
//   });
//   elements.spans?.forEach((span) => {
//     span.addEventListener("click", (e)=>{
//       e.preventDefault();
//       const clickedElement = e.target as HTMLElement;
//       const details = getElementDetails(clickedElement);
//       chrome.runtime.sendMessage({ action: "elementClicked", details });
//     })
//   });
// })();



// document.querySelectorAll("button, a, span").forEach((element) => {
//   element.addEventListener("click", (event) => {
//     event.preventDefault(); // Prevent default click action
//     const clickedElement = event.target as HTMLElement;
//     const details = getElementDetails(clickedElement);
//     chrome.runtime.sendMessage({ action: "elementClicked", details });
//   });
// });
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
          const classes = element.className.split(' ').filter(Boolean);
          if (classes.length > 0) {
              tagName += `.${classes.join('.')}`;
          }
      } else {
          const siblingIndex = Array.from(element.parentNode?.children || []).indexOf(element) + 1;
          tagName += `:nth-child(${siblingIndex})`;
      }
      path.unshift(tagName);
      element = element.parentElement as HTMLElement;
  }
  return path.join(' > ');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function initContentScript(inject: boolean) {
//   if(inject) {
//   document.addEventListener('click', (ev)=> handleDocumentClick(ev));
//   }else{
//     document.removeEventListener('click', (ev)=> handleDocumentClick(ev));
//   }
// }

// chrome.runtime.onMessage.addListener((message) => {
//   if (message.action === 'initContentScript') {
//     console.log("working-1")
//     initContentScript(true);
//   } else if (message.action === 'cleanupContentScript') {
//     console.log("working-2")
//     initContentScript(false);
//   }
// });
        // working one
document.addEventListener('click', (event) => {
  event.preventDefault();
    const clickedElement = event.target as HTMLElement;
    // remove previous temporaryId
  //   if (lastClickedElement && lastClickedElement !== clickedElement && !clickedElement.classList.contains('noTemporaryId')) {
  //     lastClickedElement.removeAttribute('data-temporaryid');
  // }

  lastClickedElement = clickedElement;
  if (!clickedElement.hasAttribute('data-temporaryid')) {
      const temporaryId = generateTemporaryId(); 
      clickedElement.setAttribute('data-temporaryid', temporaryId);
  }

    getElementDetails(clickedElement).then((details) => {
      if(isValidChromeRuntime()){
        chrome.runtime.sendMessage({ action: "elementClicked", details }, (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError);
          } else {
            console.log("Message sent successfully", response);
          }
        });
      }
    });
    
  
})


function generateTemporaryId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
function updateText() {
  const elementCache: { [key: string]: HTMLElement | null } = {};

  return (text: string, temporaryId: string) => {
    if (!(temporaryId in elementCache)) {
      console.log('Caching element');
      elementCache[temporaryId] = document.querySelector(`[data-temporaryid="${temporaryId}"]`);
    }

    const element = elementCache[temporaryId];
    if (!element) {
      console.error(`Element with id ${temporaryId} not found`);
      return;
    }

    console.log('Updating text content');
    setCurrentElementText(element,text);
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
        console.log('Sending details:', details);
        sendResponse(details);
      })
      .catch((error) => {
        console.error('Error getting element details:', error);
        sendResponse({ status: 'error', message: error.message });
      });
    return true;
  }
  return true;
});
function getCurrentElementText(element: HTMLElement): string {
  let currentText = '';

  // Iterate through the child nodes of the element
  element.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      currentText += node.textContent?.trim() ?? '';
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