import { lastClickedElement } from "./content";

export let outlineElement: HTMLDivElement | null = null;
export function createOutlineElement(): void {
  outlineElement = document.createElement("div");
  outlineElement.classList.add("selected-outline");
  document.body.appendChild(outlineElement);
}
export function updateOutline(element: HTMLElement): void {
  if (!outlineElement) return;

  const rect = element.getBoundingClientRect();
  outlineElement.style.top = `${rect.top + window.scrollY}px`;
  outlineElement.style.left = `${rect.left + window.scrollX}px`;
  outlineElement.style.width = `${rect.width}px`;
  outlineElement.style.height = `${rect.height}px`;
}
// Debounce function to limit the rate of function execution
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (this: unknown, ...args: Parameters<T>): void {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
export const throttledUpdateOutline = debounce(() => {
  if (lastClickedElement) {
    updateOutline(lastClickedElement);
  }
}, 50);
export const outlineElementNull = () => {
  outlineElement = null;
};
