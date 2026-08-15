import type { PathElementLike } from "./types";

/**
 * Builds a stable CSS-ish path for an element by walking its ancestors.
 *
 * Pure: it only reads the node handed to it, so it works with real DOM nodes
 * and with in-memory doubles. Cost is O(depth).
 */
export function getElementPath(element: PathElementLike | null | undefined): string {
  const path: string[] = [];
  let current: PathElementLike | null | undefined = element;

  while (current) {
    let tagName = current.tagName.toLowerCase();

    if (current.id) {
      tagName += `#${current.id}`;
    } else if (current.className) {
      const classes = current.className.split(" ").filter(Boolean);
      if (classes.length > 0) {
        tagName += `.${classes.join(".")}`;
      }
    } else {
      const siblings = current.parentNode?.children;
      const siblingIndex = siblings
        ? Array.prototype.indexOf.call(siblings, current) + 1
        : 1;
      tagName += `:nth-child(${siblingIndex})`;
    }

    path.unshift(tagName);
    current = current.parentElement ?? null;
  }

  return path.join(" > ");
}
