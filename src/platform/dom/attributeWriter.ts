import { TWEAKSYNC_ID } from "@/core/element/constants";

/** A single attribute change as pushed by the side panel. */
export interface AttributeUpdate {
  name: string;
  value: string | null | Record<string, string | null>;
}

function applyPlainAttribute(element: HTMLElement, name: string, value: string | null): void {
  if (value === null || value === "") {
    element.removeAttribute(name);
    return;
  }
  element.setAttribute(name, value);
}

/**
 * Applies an attribute change to an injected element.
 *
 * `data-*` is handled as a set: the incoming `value` is the full desired map of
 * data attributes, so the existing `data-*` attributes are resynchronised
 * against it. The TweakSync identity attribute is never touched.
 */
export function updateElementAttributes(
  element: HTMLElement,
  update: AttributeUpdate
): void {
  if (update.name === "data-*") {
    const desired = (update.value ?? {}) as Record<string, string | null>;

    for (const attribute of Array.from(element.attributes)) {
      if (attribute.name.startsWith("data-") && attribute.name !== TWEAKSYNC_ID) {
        if (!(attribute.name in desired)) {
          element.removeAttribute(attribute.name);
        }
      }
    }

    for (const [name, value] of Object.entries(desired)) {
      applyPlainAttribute(element, name, value);
    }
    return;
  }

  applyPlainAttribute(element, update.name, update.value as string | null);
}
