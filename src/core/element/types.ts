/**
 * Structural element contracts for the element domain.
 *
 * The core layer never imports DOM globals; it only describes the *shape* of the
 * nodes it is handed. Real `HTMLElement`s satisfy these interfaces structurally,
 * and so do lightweight test doubles.
 */

export interface TextNodeLike {
  nodeType: number;
  textContent: string | null;
}

export interface AttributeLike {
  name: string;
  value: string;
}

export interface PathElementLike {
  tagName: string;
  id?: string;
  className?: string;
  parentNode?: { children: ArrayLike<unknown> } | null;
  parentElement?: PathElementLike | null;
}

export interface TextHostElementLike {
  textContent: string | null;
  childNodes: ArrayLike<TextNodeLike>;
  ownerDocument?: { createTextNode(data: string): TextNodeLike } | null;
  appendChild(node: unknown): unknown;
}

export interface DetailElementLike extends PathElementLike {
  textContent: string | null;
  childNodes: ArrayLike<TextNodeLike>;
  attributes: ArrayLike<AttributeLike>;
  getAttribute(name: string): string | null;
  appendChild(node: unknown): unknown;
}

export interface MatchableElement {
  matches(selector: string): boolean;
}
