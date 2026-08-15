import { getElementTypes } from "../types/elementTypes";
import { getCachedElement } from "./cache";

export function getCurrentElementText(element: HTMLElement): string {
  let currentText = "";
  element.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      currentText += node.textContent?.trim() ?? "";
    }
  });

  return currentText;
}
// export function setCurrentElementText(
//   element: HTMLElement | undefined,
//   text: string
// ): void {
//   element?.childNodes.forEach((node) => {
//     if (node.nodeType === Node.TEXT_NODE) {
//       node.textContent = text;
//     }
//   });
// }
export function setCurrentElementText(element: HTMLElement | undefined, text: string): void {
  if (!element) return;

  // Check if there's already a text node
  const textNode = Array.from(element.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);

  if (textNode) {
    // If there's a text node, update its content
    textNode.textContent = text;
  } else {
    // If there's no text node, create a new one
    const newText = document.createTextNode(text);
    element.appendChild(newText);
  }
}

export function updateText({ text, temporaryId }: getElementTypes) {
  const element = getCachedElement({ temporaryId })(); // Call the function to get the element
  if (element) {
    setCurrentElementText(element, text!);
  } else {
    console.log(`Element with temporary ID ${temporaryId} not found`);
  }
}
