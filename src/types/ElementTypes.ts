export interface ElementDetails {
  tagName?: string;
  id?: string | null;
  className?: string;
  textContent?: string | null;
  attributes?: { [key: string]: string };
  temporaryId?: string | null;
  path?: string;
  styles: ElementStyles;
}
export interface StyleData {
  [selector: string]: { [property: string]: string };
}

interface InlineStyles {
  [key: string]: string;
}

interface ExternalStyles {
  classes: { [key: string]: { [key: string]: string } };
  ids: { [key: string]: { [key: string]: string } };
  tags: { [key: string]: { [key: string]: string } };
  attribute: { [key: string]: { [key: string]: string } };
  descendant: { [key: string]: { [key: string]: string } };
  pseudoElementStyles: { [key: string]: { [key: string]: string } };
  pseudoClassStyles: { [key: string]: { [key: string]: string } };
}

export interface ElementStyles {
  inline: InlineStyles;
  external: ExternalStyles;
}
