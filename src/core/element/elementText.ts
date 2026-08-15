import { TEXT_NODE } from "./constants";
import type { TextHostElementLike, TextNodeLike } from "./types";

function directTextNodes(element: TextHostElementLike): TextNodeLike[] {
  const nodes: TextNodeLike[] = [];
  for (let index = 0; index < element.childNodes.length; index += 1) {
    const node = element.childNodes[index];
    if (node && node.nodeType === TEXT_NODE) {
      nodes.push(node);
    }
  }
  return nodes;
}

/**
 * Reads the element's own text, ignoring text owned by descendants.
 * Cost is O(childNodes).
 */
export function getCurrentElementText(element: TextHostElementLike): string {
  let currentText = "";
  for (const node of directTextNodes(element)) {
    currentText += node.textContent?.trim() ?? "";
  }
  return currentText;
}

/**
 * Writes the element's own text, creating a text node through the element's
 * owner document when the element has none. No DOM global is used.
 */
export function setCurrentElementText(
  element: TextHostElementLike | null | undefined,
  text: string
): void {
  if (!element) {
    return;
  }

  const [existing] = directTextNodes(element);
  if (existing) {
    existing.textContent = text;
    return;
  }

  const created = element.ownerDocument?.createTextNode(text);
  if (created) {
    element.appendChild(created);
  }
}
