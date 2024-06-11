import { ElementDetails } from "../types/ElementTypes";
import { getCurrentElementText } from "./elementTextContent";
import { getElementPath } from "./getElementPath";

export function getElementDetails(
  element: HTMLElement
): Promise<ElementDetails> {
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
