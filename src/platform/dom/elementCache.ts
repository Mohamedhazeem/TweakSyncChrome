import { TWEAKSYNC_ID, TWEAKSYNC_TEMPORARY_ID } from "@/core/element/constants";

/** Resolves an injected element by either of its identity attributes. */
export function findByTemporaryId(root: ParentNode, temporaryId: string): HTMLElement | null {
  if (!temporaryId) {
    return null;
  }
  return (
    root.querySelector<HTMLElement>(`[${TWEAKSYNC_ID}="${temporaryId}"]`) ??
    root.querySelector<HTMLElement>(`[${TWEAKSYNC_TEMPORARY_ID}="${temporaryId}"]`)
  );
}

/**
 * Returns a memoised resolver so repeated edits to the same element do not
 * re-query the DOM. Lookup after the first call is O(1).
 */
export function getCachedElement(
  { temporaryId }: { temporaryId: string },
  root: ParentNode
): () => HTMLElement | undefined {
  const elementCache = new Map<string, HTMLElement | null>();

  return () => {
    if (!elementCache.has(temporaryId)) {
      elementCache.set(temporaryId, findByTemporaryId(root, temporaryId));
    }
    return elementCache.get(temporaryId) ?? undefined;
  };
}
