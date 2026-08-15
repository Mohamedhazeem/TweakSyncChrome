import type { MatchableElement } from "@/core/element/types";
import {
  isDescendantSelector,
  isPseudoClassSelector,
  isPseudoElementSelector,
} from "./selectorUtils";
import type { SelectorBucket } from "./styleState";

export interface SelectorTarget {
  bucket: SelectorBucket;
  key: string;
}

export interface ClassifyInput {
  selector: string;
  element: MatchableElement;
  classList: readonly string[];
  elementId: string;
  tagName: string;
}

/** Mirrors the legacy guard: empty or unparsable selectors are skipped. */
export function handleValidSelector(
  selector: string,
  isValidSelector: (selector: string) => boolean
): boolean {
  return !selector || selector.trim() === "" || !isValidSelector(selector);
}

function safeMatches(element: MatchableElement, selector: string): boolean {
  if (!selector) {
    return false;
  }
  try {
    return element.matches(selector);
  } catch {
    return false;
  }
}

/**
 * Decides which selector bucket(s) a rule belongs to for a given element.
 *
 * Behaviour is identical to the legacy chain of `handleClass`/`handleId`/... but
 * the decision is now data (a list of targets) rather than a set of functions
 * that mutate shared state. Cost is O(classList) per rule.
 */
export function classifySelector({
  selector,
  element,
  classList,
  elementId,
  tagName,
}: ClassifyInput): SelectorTarget[] {
  // Descendant selectors win outright, exactly like the legacy `continue`.
  if (safeMatches(element, selector) && isDescendantSelector(selector)) {
    return [{ bucket: "descendant", key: selector }];
  }

  const targets: SelectorTarget[] = [];
  const descendant = isDescendantSelector(selector);
  const pseudoElement = isPseudoElementSelector(selector);
  const pseudoClass = isPseudoClassSelector(selector);

  for (const className of classList) {
    const classSelector = `.${className}`;
    if (selector.includes(classSelector) && safeMatches(element, selector) && !descendant) {
      targets.push({ bucket: "classes", key: classSelector });
    }
  }

  const idSelector = `#${elementId}`;
  if (
    elementId &&
    selector.includes(idSelector) &&
    safeMatches(element, selector) &&
    !descendant
  ) {
    targets.push({ bucket: "ids", key: idSelector });
  }

  if (selector === tagName && !descendant) {
    targets.push({ bucket: "tags", key: tagName });
  }

  if (
    selector.includes("[") &&
    selector.includes("]") &&
    safeMatches(element, selector) &&
    !descendant &&
    !pseudoElement &&
    !pseudoClass
  ) {
    targets.push({ bucket: "attribute", key: selector });
  }

  if (pseudoElement && safeMatches(element, selector.split("::")[0])) {
    targets.push({ bucket: "pseudoElementStyles", key: selector });
  }

  if (pseudoClass && safeMatches(element, selector.split(":")[0])) {
    targets.push({ bucket: "pseudoClassStyles", key: selector });
  }

  return targets;
}
