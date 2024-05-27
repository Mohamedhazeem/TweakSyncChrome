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

export interface ElementStyles {
  inline: { [property: string]: string };
  external: {
    classes: { [className: string]: { [property: string]: string } };
    ids: { [idName: string]: { [property: string]: string } };
    tags: { [tagName: string]: { [property: string]: string } };
    attribute: { [attributeSelector: string]: { [property: string]: string } };
    descendant: { [selector: string]: { [property: string]: string } };
  };
}