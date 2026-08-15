/**
 * Style application engine. Works against any writable declaration block, so it
 * is exercised by unit tests without a DOM and by the content-script adapter in
 * the page.
 */

export interface StyleWritable {
  setProperty(property: string, value: string): void;
  removeProperty(property: string): string | void;
}

export interface StyleUpdate {
  selector: string;
  property: string;
  value?: string | null;
  temporaryId?: string;
}

export interface ApplyResult {
  applied: number;
  missing: string[];
}

/**
 * Applies a single value using the historical TweakSync semantics:
 * a string sets the property, `undefined` blanks it, `null` removes it.
 */
export function applyStyleValue(
  target: StyleWritable,
  property: string,
  value?: string | null
): void {
  if (typeof value === "string") {
    target.setProperty(property, value);
  } else if (typeof value === "undefined") {
    target.setProperty(property, "");
  } else {
    target.removeProperty(property);
  }
}

/**
 * Applies a batch of updates against a selector index.
 *
 * Complexity: O(updates) with O(1) `Map` lookups. There is deliberately no
 * nested element x rule iteration.
 */
export function applyStyleUpdates(
  index: Map<string, StyleWritable[]>,
  updates: readonly StyleUpdate[]
): ApplyResult {
  const missing: string[] = [];
  let applied = 0;

  for (const update of updates) {
    const targets = index.get(update.selector);
    const target = targets?.[0];
    if (!target) {
      missing.push(update.selector);
      continue;
    }
    applyStyleValue(target, update.property, update.value);
    applied += 1;
  }

  return { applied, missing };
}
