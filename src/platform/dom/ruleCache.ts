/**
 * Selector -> rule index for a document.
 *
 * The index is a `Map`, so resolving a selector during a style edit is O(1).
 * Rebuilding walks every accessible rule once (O(rules)); the previous
 * implementation rebuilt a plain object on every call and returned it by
 * reference, which made cache invalidation implicit.
 */

let cache: Map<string, CSSStyleRule[]> = new Map();

function cacheRule(rule: CSSRule, index: Map<string, CSSStyleRule[]>): void {
  if (typeof CSSStyleRule !== "undefined" && rule instanceof CSSStyleRule) {
    const selector = rule.selectorText;
    const existing = index.get(selector);
    if (existing) {
      existing.push(rule);
    } else {
      index.set(selector, [rule]);
    }
    return;
  }

  const grouping = rule as CSSRule & { cssRules?: CSSRuleList };
  if (grouping.cssRules) {
    for (let i = 0; i < grouping.cssRules.length; i += 1) {
      cacheRule(grouping.cssRules[i], index);
    }
  }
}

/** Rebuilds and returns the selector index for the supplied document. */
export function getCachedRules(doc: Document): Map<string, CSSStyleRule[]> {
  const index = new Map<string, CSSStyleRule[]>();
  const sheets = doc.styleSheets;

  for (let i = 0; i < sheets.length; i += 1) {
    const sheet = sheets[i];
    try {
      const rules = sheet.cssRules;
      for (let j = 0; j < rules.length; j += 1) {
        cacheRule(rules[j], index);
      }
    } catch {
      // Cross-origin stylesheets are not readable; skip them.
    }
  }

  cache = index;
  return cache;
}

/** Returns the last built index without rebuilding it. */
export function peekCachedRules(): Map<string, CSSStyleRule[]> {
  return cache;
}

/** Registers a freshly inserted rule so the next lookup can find it. */
export function registerCachedRule(selector: string, rule: CSSStyleRule): void {
  cache.set(selector, [rule]);
}

/** Forgets a selector, e.g. after a rename. */
export function unregisterCachedRule(selector: string): void {
  cache.delete(selector);
}

/** Drops the whole index (used between tests and on page reset). */
export function invalidateRuleCache(): void {
  cache = new Map();
}
