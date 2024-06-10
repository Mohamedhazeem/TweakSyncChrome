import { ElementStyles } from "../types/ElementTypes";

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

export function resetStyles(): void {
  Object.assign(styles, initialStyles);
}
