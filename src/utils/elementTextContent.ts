import { getElementTypes } from "../types/ElementTypes";
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
export function setCurrentElementText(
  element: HTMLElement | undefined,
  text: string
): void {
  element?.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent = text;
    }
  });
}
export function updateText({ text, temporaryId }: getElementTypes) {
  const element = getCachedElement({ temporaryId })(); // Call the function to get the element
  if (element) {
    setCurrentElementText(element, text!);
  } else {
    console.error(`Element with temporary ID ${temporaryId} not found`);
  }
}
