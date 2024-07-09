import { Style } from "@/types/styleTypes";
export const globalCssOptions = [
  "inherit",
  "initial",
  "revert",
  "revert-layer",
  "unset",
];
export const customAndGlobalCssOptions = [
  "custom",
  "inherit",
  "initial",
  "revert",
  "revert-layer",
  "unset",
];
export const GLOBAL_STYLES: Style[] = [
  {
    name: "color",
    nameForTitle: "Color",
    type: "string",
    description: "Color Styles for the element",
    value: "",
    options: [...customAndGlobalCssOptions],
  },
  {
    name: "background-color",
    nameForTitle: "Background Color",
    type: "string",
    description: "Color Styles for the element",
    value: "",
    // options: ,
  },
];
