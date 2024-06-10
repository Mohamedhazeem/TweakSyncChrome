export function handleAtrules(
  rule: CSSRule,
  processAtRule: (
    rule:
      | CSSMediaRule
      | CSSKeyframesRule
      | CSSFontFaceRule
      | CSSSupportsRule
      | CSSContainerRule,
    atRuleName: string
  ) => void
) {
  if (
    rule instanceof CSSMediaRule ||
    rule instanceof CSSKeyframesRule ||
    rule instanceof CSSSupportsRule ||
    rule instanceof CSSFontFaceRule ||
    rule instanceof CSSContainerRule
  ) {
    const atRuleName =
      rule instanceof CSSMediaRule
        ? `@media ${rule.media.mediaText}`
        : rule instanceof CSSKeyframesRule
        ? `@keyframes ${rule.name}`
        : rule instanceof CSSSupportsRule
        ? `@supports ${rule.conditionText}`
        : rule instanceof CSSContainerRule
        ? `@container ${rule.conditionText}`
        : "@font-face";
    processAtRule(rule, atRuleName);
  }
}
