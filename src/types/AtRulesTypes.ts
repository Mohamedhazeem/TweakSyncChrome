export type ProcessAtRulesType = {
  atRule:
    | CSSMediaRule
    | CSSKeyframesRule
    | CSSFontFaceRule
    | CSSSupportsRule
    | CSSContainerRule;
  atRuleName: string;
};
export type ProcessRules = {
  rule: CSSStyleRule | CSSKeyframeRule;
  selector?: string;
  context: { [key: string]: string };
};
