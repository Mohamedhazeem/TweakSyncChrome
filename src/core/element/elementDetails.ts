import type { ElementDetails, TemporaryElementDetails } from "@/types/elementTypes";
import { TWEAKSYNC_ID, TWEAKSYNC_TEMPORARY_ID } from "./constants";
import { getCurrentElementText } from "./elementText";
import { getElementPath } from "./elementPath";
import type { DetailElementLike } from "./types";

export type AttributeValue = string | number;

/**
 * Attributes whose values are numeric in the HTML spec. A Set keeps the
 * per-attribute check O(1) instead of re-creating a lookup table per call.
 */
const NUMERIC_ATTRIBUTES = new Set([
  "minlength",
  "maxlength",
  "low",
  "high",
  "optimum",
  "size",
  "start",
  "rows",
  "cols",
  "colspan",
  "rowspan",
  "span",
]);

/** Coerces numeric HTML attributes, leaving everything else as a string. */
export function parseAttributeValue(
  attrName: string,
  attrValue: string
): [string, AttributeValue] {
  if (NUMERIC_ATTRIBUTES.has(attrName.toLowerCase())) {
    return [attrName, Number(attrValue)];
  }
  return [attrName, attrValue];
}

/** Collects the full inspector payload for an element. Cost is O(attributes). */
export function getElementDetails(
  element: DetailElementLike | null | undefined
): Promise<ElementDetails> {
  if (!element) {
    return Promise.reject(new Error("Element is null"));
  }

  const attributes: Record<string, AttributeValue> = {};
  for (let index = 0; index < element.attributes.length; index += 1) {
    const attribute = element.attributes[index];
    const [name, value] = parseAttributeValue(attribute.name, attribute.value);
    attributes[name] = value;
  }

  return Promise.resolve({
    tagName: element.tagName.toLowerCase(),
    id: element.id,
    className: element.className,
    textContent: getCurrentElementText(element),
    attributes,
    temporaryId: element.getAttribute(TWEAKSYNC_ID) || null,
    path: getElementPath(element),
  });
}

/** Collects only the identity of an element, used to address later edits. */
export function getElementTemporaryId(
  element: DetailElementLike | null | undefined
): Promise<TemporaryElementDetails> {
  if (!element) {
    return Promise.reject(new Error("Element is null"));
  }

  return Promise.resolve({
    temporaryId: element.getAttribute(TWEAKSYNC_TEMPORARY_ID) || null,
    textContent: getCurrentElementText(element),
  });
}
