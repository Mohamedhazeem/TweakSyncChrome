import { ElementStyles } from "../../types/ElementTypes";

export const styles: ElementStyles = {
  inline: {},
  external: {
    classes: {},
    ids: {},
    tags: {},
    attribute: {},
    descendant: {},
    pseudoElementStyles: {},
    pseudoClassStyles: {},
    atRules: {},
  },
  temporaryId: "",
};

const initialStyles: ElementStyles = {
  inline: {},
  external: {
    classes: {},
    ids: {},
    tags: {},
    attribute: {},
    descendant: {},
    pseudoElementStyles: {},
    pseudoClassStyles: {},
    atRules: {},
  },
  temporaryId: "",
};

function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Function to reset styles
export function resetStyles(): void {
  Object.assign(styles, deepCopy(initialStyles));
}
