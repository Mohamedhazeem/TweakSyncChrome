type AttributeType = { [key: string]: string | number };
export interface ElementDetails {
  tagName?: string;
  id?: string | null;
  className?: string;
  textContent?: string | null;
  attributes?: AttributeType;
  temporaryId?: string | null;
  path?: string;
}
export type getElementTypes = {
  temporaryId: string;
  text?: string;
  selector?: string;
  property?: string;
  newStyleValue?: string;
};
export interface StyleData {
  [selector: string]: { [property: string]: string };
}

interface InlineStyles {
  [key: string]: string;
}
export interface AtRules {
  [atRule: string]: {
    [selector: string]: {
      [property: string]: string;
    };
  };
}
export interface ExternalStyles {
  classes: { [key: string]: { [key: string]: string } };
  ids: { [key: string]: { [key: string]: string } };
  tags: { [key: string]: { [key: string]: string } };
  attribute: { [key: string]: { [key: string]: string } };
  descendant: { [key: string]: { [key: string]: string } };
  pseudoElementStyles: { [key: string]: { [key: string]: string } };
  pseudoClassStyles: { [key: string]: { [key: string]: string } };
  atRules: AtRules;
}

export interface ElementStyles {
  inline: InlineStyles;
  external: ExternalStyles;
  temporaryId: string | null;
}
