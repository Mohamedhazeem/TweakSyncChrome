import { Style } from "@/types/styleTypes";
import { globalCssOptions } from "./globalStyles";

export function seperateCssOptions(style: Style | undefined) {
  const globalCss = (Array.isArray(style?.options) ? style.options : []).filter((opt) =>
    globalCssOptions.includes(opt)
  );
  const specificCss = (Array.isArray(style?.options) ? style.options : []).filter(
    (opt) => !globalCssOptions.includes(opt)
  );
  return { specificCss, globalCss };
}
