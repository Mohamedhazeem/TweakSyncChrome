import { Style } from "@/types/styleTypes";
import { capitalizeFirstLetter } from "../capitalizeFirstLetter";

export function getButtonText(option: string, style: Style, isCaptilized: boolean): string {
  if (option && style.options) {
    if (Array.isArray(style.options)) {
      const selectedIndex = style.options.indexOf(option);
      return selectedIndex !== -1
        ? isCaptilized
          ? capitalizeFirstLetter(style.options[selectedIndex])
          : style.options[selectedIndex]
        : isCaptilized
        ? `${capitalizeFirstLetter(option == "custom" ? style.options[0] : "select.")}`
        : capitalizeFirstLetter(style.options[0]);
    } else {
      console.error("Unexpected options type:", typeof style.options);
      return `Select ${style.nameForTitle}...`;
    }
  }
  return `Select...`;
}
