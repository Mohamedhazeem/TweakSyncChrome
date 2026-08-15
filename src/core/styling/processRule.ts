import {
  LONGHAND_TO_SHORTHANDS,
  SHORTHAND_RANK,
  longHandDefaults,
  shorthandMap,
} from "./shortHandStyles";

/**
 * Minimal shape of a CSS declaration block. `CSSStyleDeclaration` satisfies it,
 * and so does a plain object double, which keeps the engine testable without a
 * DOM.
 */
export interface StyleDeclarationLike {
  readonly length: number;
  item(index: number): string;
  getPropertyValue(property: string): string;
}

export type StyleContext = { [property: string]: string };

export interface ProcessRuleInput {
  declaration: StyleDeclarationLike;
  context?: StyleContext;
}

/** Reads a declaration block into an insertion-ordered Map. Cost is O(declarations). */
export function readDeclarations(declaration: StyleDeclarationLike): Map<string, string> {
  const declared = new Map<string, string>();
  for (let index = 0; index < declaration.length; index += 1) {
    const property = declaration.item(index);
    if (!property) {
      continue;
    }
    declared.set(property, declaration.getPropertyValue(property));
  }
  return declared;
}

/**
 * Collapses longhand declarations into their shorthand form and writes the
 * result into `context`.
 *
 * Complexity: O(d + k log k) where `d` is the number of declared properties and
 * `k` the number of shorthand families actually present (k <= d). The legacy
 * implementation scanned the whole shorthand table for every rule.
 */
export function processRule({ declaration, context }: ProcessRuleInput): void {
  if (!context) {
    return;
  }

  const declared = readDeclarations(declaration);

  // Only shorthands that own at least one declared longhand are candidates.
  const candidates = new Set<string>();
  for (const property of declared.keys()) {
    const owners = LONGHAND_TO_SHORTHANDS.get(property);
    if (!owners) {
      continue;
    }
    for (const owner of owners) {
      candidates.add(owner);
    }
  }

  const ordered = [...candidates].sort(
    (a, b) => (SHORTHAND_RANK.get(a) ?? 0) - (SHORTHAND_RANK.get(b) ?? 0)
  );

  for (const shorthand of ordered) {
    const longhands = shorthandMap[shorthand];
    const values = longhands.map(
      (property) => declared.get(property) || longHandDefaults[property] || ""
    );

    if (values.filter(Boolean).length === 0) {
      continue;
    }

    const uniqueValues = new Set(values);
    if (uniqueValues.size === 1) {
      context[shorthand] = values[0];
    } else if (values.some(Boolean)) {
      context[shorthand] = values.join(" ");
    }

    for (const property of longhands) {
      declared.delete(property);
    }
  }

  for (const [property, value] of declared) {
    context[property] = value;
  }
}
