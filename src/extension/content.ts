import { createBrowserPort } from "@/adapters/browser";
import { generateTemporaryId } from "@/core/element/temporaryId";
import {
  getElementDetails,
  getElementTemporaryId,
} from "@/core/element/elementDetails";
import { TWEAKSYNC_ID, TWEAKSYNC_UI } from "@/core/element/constants";
import {
  applyStyleUpdate,
  collectElementStyles,
  addSelector,
  renameSelector,
  updateElementText,
  updateElementAttributes,
  OutlineOverlay,
  createFrameScheduler,
  debounce,
} from "@/platform/dom";

/**
 * Live content-script entry point (clean architecture).
 *
 * All browser-runtime access goes through the injected `BrowserPort`
 * (`messaging`), while every DOM mutation is routed through the framework-free
 * `platform/dom` writers and batched into a single animation frame via
 * `createFrameScheduler` (FR-008 / plan T029). No `chrome.*`/`browser.*` global
 * is touched directly here.
 */
const browser = createBrowserPort();
const messaging = browser.messaging;
const scheduler = createFrameScheduler();

let clickedElement: HTMLElement | null = null;
let currentElement: HTMLElement | null = null;
let lastClickedElement: HTMLElement | null = null;
let isEditable = false;
let temporaryId = "";

const outline = new OutlineOverlay(document);
const throttledUpdateOutline = debounce(() => {
  if (currentElement) {
    outline.attach(currentElement);
  }
}, 50);

function isValidChromeRuntime(): boolean {
  try {
    return !!browser.runtime.getManifest();
  } catch {
    return false;
  }
}

/** Batches a DOM write into the next animation frame (rAF write coalescing). */
function scheduleWrite(task: () => void): void {
  scheduler.schedule(task);
}

function resetContentScript(): void {
  outline.detach();
  currentElement = null;
  lastClickedElement = null;
  clickedElement = null;
}

document.addEventListener(
  "click",
  (event) => {
    if (!isEditable) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    const targetElement = event.target as HTMLElement;
    if (targetElement?.hasAttribute(TWEAKSYNC_UI)) {
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
    outline.attach(currentElement!);

    if (!clickedElement.hasAttribute(TWEAKSYNC_ID)) {
      temporaryId = generateTemporaryId();
      clickedElement.setAttribute(TWEAKSYNC_ID, temporaryId);
    }

    if (currentElement) {
      getElementDetails(currentElement).then((details) => {
        if (isValidChromeRuntime()) {
          if (details.temporaryId == null) {
            details.temporaryId = temporaryId;
          }
          void messaging.send({ action: "elementClicked", details });
        }
      });
      collectElementStyles(currentElement, document).then((styles) => {
        if (isValidChromeRuntime()) {
          void messaging.send({ action: "styleClicked", styles });
        }
      });
    }
  },
  true
);

type IncomingMessage = Record<string, unknown>;

messaging.onMessage((rawMessage, reply) => {
  const message = rawMessage as IncomingMessage;

  switch (message.action) {
    case "isContentScriptEditable":
      isEditable = message.isEditable === true;
      if (!isEditable) {
        resetContentScript();
      }
      reply?.();
      return;
    case "updateTextContent":
      scheduleWrite(() => {
        updateElementText(document, {
          temporaryId: message.temporaryId as string,
          text: message.text as string,
        });
      });
      reply?.();
      return;
    case "updateStyles":
      scheduleWrite(() => {
        applyStyleUpdate(document, {
          selector: message.selector as string,
          property: message.property as string,
          newStyleValue: message.newStyleValue as string | null | undefined,
          temporaryId: message.temporaryId as string,
        });
      });
      reply?.();
      return;
    case "updateAttributes":
      scheduleWrite(() => {
        if (!currentElement) {
          return;
        }
        updateElementAttributes(currentElement, {
          name: message.name as string,
          value: message.value as string | Record<string, string | null> | null,
        });
        if (message.name === "data-*") {
          getElementDetails(currentElement).then((details) => {
            if (isValidChromeRuntime()) {
              void messaging.send({ action: "elementClicked", details });
            }
          });
        }
      });
      reply?.();
      return;
    case "addSelector":
      scheduleWrite(() => addSelector(document, message.selector as string));
      reply?.();
      return;
    case "renameSelector":
      scheduleWrite(() =>
        renameSelector(
          document,
          message.oldSelector as string,
          message.newSelector as string
        )
      );
      reply?.();
      return;
    case "getElementTemporaryId":
      if (lastClickedElement) {
        getElementTemporaryId(lastClickedElement)
          .then((details) => reply?.(details))
          .catch(() => reply?.());
      } else {
        reply?.({ message: "No temporary ID" });
      }
      return;
    case "getUpdatedElement":
      if (lastClickedElement) {
        getElementDetails(lastClickedElement)
          .then((details) => {
            if (isValidChromeRuntime()) {
              void messaging.send({ action: "elementClicked", details });
            }
            reply?.(details);
          })
          .catch((error: Error) =>
            reply?.({
              message: "Error getting element details: " + error.message,
            })
          );
      } else {
        reply?.({ message: "No element selected" });
      }
      return;
    case "getUpdatedStyle":
      if (lastClickedElement) {
        collectElementStyles(lastClickedElement, document)
          .then((styles) => {
            if (isValidChromeRuntime()) {
              void messaging.send({ action: "styleClicked", styles });
            }
            reply?.(styles);
          })
          .catch((error: Error) =>
            reply?.({
              message: "Error getting element style: " + error.message,
            })
          );
      } else {
        reply?.({ message: "No element selected" });
      }
      return;
    default:
      reply?.({ message: "No element selected or invalid action" });
  }
});

window.addEventListener("resize", throttledUpdateOutline);
window.addEventListener("scroll", throttledUpdateOutline);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    resetContentScript();
  }
});
