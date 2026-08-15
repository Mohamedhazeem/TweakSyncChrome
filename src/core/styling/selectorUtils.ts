const PSEUDO_SELECTOR_REGEX = /::?[\w-]+/g;

export const isDescendantSelector = (selector: string): boolean =>
  selector.includes(" ") ||
  selector.includes(">") ||
  selector.includes("+") ||
  selector.includes("~");

export const isPseudoElementSelector = (selector: string): boolean => selector.includes("::");

export const isPseudoClassSelector = (selector: string): boolean =>
  selector.includes(":") && !isPseudoElementSelector(selector);

/**
 * Validity is delegated to an injected validator so the core never touches
 * `document`. The platform layer supplies one backed by `querySelector`.
 */
export function isValidSelector(
  selector: string,
  validate: (candidate: string) => unknown
): boolean {
  const cleanedSelector = selector.replace(PSEUDO_SELECTOR_REGEX, "");
  try {
    validate(cleanedSelector);
    return true;
  } catch {
    return false;
  }
}
