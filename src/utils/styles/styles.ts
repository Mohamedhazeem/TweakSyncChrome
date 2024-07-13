import { Style, StyleGroup } from "@/types/styleTypes";
export const globalCssOptions = ["inherit", "initial", "revert", "revert-layer", "unset"];
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
    name: "background-color",
    nameForTitle: "Background Color",
    type: "string",
    description: "Color Styles for the element",
    value: "",
    options: [...customAndGlobalCssOptions],
  },
  {
    name: "color",
    nameForTitle: "Color",
    type: "string",
    description: "Color Styles for the element",
    value: "",
    options: [...customAndGlobalCssOptions],
  },
  {
    name: "color-scheme",
    nameForTitle: "Color Scheme",
    type: "string",
    description: "Color Styles for the element",
    value: "",
    options: ["normal", "light", "dark", "light dark", "only light", ...globalCssOptions],
  },
];
export const STYLE_GROUP: StyleGroup[] = [
  {
    groupName: "Color Group",
    propertyNames: ["color", "color-scheme"],
    groups: [
      {
        name: "color",
        nameForTitle: "Color",
        type: "string",
        description: "Color Styles for the element",
        value: "",
        options: [...customAndGlobalCssOptions],
      },
      {
        name: "color-scheme",
        nameForTitle: "Color Scheme",
        type: "string",
        description: "Color Styles for the element",
        value: "",
        options: ["normal", "light", "dark", "light dark", "only light", ...globalCssOptions],
      },
    ],
  },
];
