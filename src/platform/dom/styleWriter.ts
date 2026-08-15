import { applyStyleUpdates, type StyleWritable } from "@/core/styling/styleEngine";
import { TWEAKSYNC_ID } from "@/core/element/constants";
import { getCachedRules } from "./ruleCache";
import type { StyleUpdateRequest } from "./types";



/** Appends an inline declaration, preserving the element's existing cssText. */
export function applyInlineStyle(
  element: HTMLElement,
  property: string,
  value?: string | null
): void {
  const previousStyle = element.style.cssText;
  element.style.cssText = `${previousStyle}; ${property}: ${value ?? ""}`;
}

/**
 * Maps a `CSSStyleRule` to the `StyleWritable` shape the core engine expects so
 * stylesheet edits reuse the same O(updates) application path as the UI.
 */
function toWritable(style: CSSStyleDeclaration): StyleWritable {
  return {
    setProperty(name: string, v: string) {
      style.setProperty(name, v);
    },
    removeProperty(name: string) {
      style.removeProperty(name);
    },
  };
}

/**
 * Applies one style edit to the page.
 *
 * Inline edits are written straight to the element; stylesheet edits go through
 * the O(1) selector index in `ruleCache`.
 */
export function applyStyleUpdate(doc: Document, request: StyleUpdateRequest): void {
  const { selector, property, newStyleValue, temporaryId } = request;

  if (!selector || !property) {
    return;
  }

  if (selector === "inline") {
    const element = doc.querySelector<HTMLElement>(`[${TWEAKSYNC_ID}="${temporaryId}"]`);
    if (element) {
      applyInlineStyle(element, property, newStyleValue);
    }
    return;
  }

  const index = getCachedRules(doc);
  const writable = new Map<string, StyleWritable[]>();
  const rules = index.get(selector);
  if (rules) {
    writable.set(selector, rules.map((rule) => toWritable(rule.style)));
  }

  applyStyleUpdates(writable, [{ selector, property, value: newStyleValue }]);
}
