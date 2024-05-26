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
  external: { [selector: string]: { [property: string]: string } };
}
