export interface ElementDetails {
    tagName?: string;
    id?: string | null;
    className?: string;
    textContent?: string | null;
    attributes?: { [key: string]: string };
    temporaryId?: string | null;
    path?: string;
  }