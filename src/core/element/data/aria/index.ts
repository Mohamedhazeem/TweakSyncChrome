// Thin accessor over the ARIA attribute segments.
import type { Attribute } from "@/types/attributeTypes";
import { ARIA_ATTRIBUTES_CORE } from "./aria-core";
import { ARIA_ATTRIBUTES_LIVE } from "./aria-live";

export const ARIA_ATTRIBUTES: Attribute[] = [
  ...ARIA_ATTRIBUTES_CORE,
  ...ARIA_ATTRIBUTES_LIVE,
];

const ARIA_ATTRIBUTE_INDEX = new Map<string, Attribute>(
  ARIA_ATTRIBUTES.map((attribute) => [attribute.name, attribute])
);

/** O(1) lookup of an ARIA attribute descriptor. */
export function getAriaAttribute(name: string): Attribute | undefined {
  return ARIA_ATTRIBUTE_INDEX.get(name);
}
