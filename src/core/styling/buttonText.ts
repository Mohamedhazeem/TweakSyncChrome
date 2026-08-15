import type { Style } from "@/types/styleTypes";
import { capitalizeFirstLetter } from "@/core/text/capitalizeFirstLetter";

/** Chooses the label shown on a style option popover trigger. */
export function getButtonText(option: string, style: Style, isCaptilized: boolean): string {
  if (option && style.options) {
    if (Array.isArray(style.options)) {
      const selectedIndex = style.options.indexOf(option);
      if (selectedIndex !== -1) {
        return isCaptilized
          ? capitalizeFirstLetter(style.options[selectedIndex])
          : style.options[selectedIndex];
      }
      return isCaptilized
        ? capitalizeFirstLetter(option === "color" ? "color" : `Select ${style.nameForTitle}`)
        : capitalizeFirstLetter(style.options[0]);
    }
    return `Select ${style.nameForTitle}`;
  }
  return `Select ${style.nameForTitle}`;
}
