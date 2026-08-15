import { findByTemporaryId } from "./elementCache";

/** Applies a text edit to the element identified by `temporaryId`. */
export function updateElementText(
  root: ParentNode,
  request: { temporaryId: string; text: string }
): void {
  const element = findByTemporaryId(root, request.temporaryId);
  if (!element) {
    return;
  }

  applyTextInDeep(element, request.text);
}

function applyTextInDeep(element: HTMLElement, newText: string): void {
  const tagName = element.tagName.toLowerCase();

  if (tagName === "input" || tagName === "textarea") {
    (element as unknown as HTMLInputElement).value = newText;
    return;
  }

  if (tagName === "select") {
    const select = element as HTMLSelectElement;
    const option = Array.from(select.options).find((opt) => opt.text === newText);
    if (option) {
      select.value = option.value;
    }
    return;
  }

  element.textContent = newText;
}
