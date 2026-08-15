import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const OutlineGroup: StyleGroup = {
  groupName: "Outline",
  propertyNames: ["outline-color", "outline-offset", "outline-style", "outline-width"],
  groups: [
    {
      name: "outline-color",
      nameForTitle: "Outline Color",
      type: "color",
      description: "Sets the color of an element's outline.",
      value: "",
      options: ["color", ...globalCssOptions],
    },
    {
      name: "outline-offset",
      nameForTitle: "Outline Offset",
      type: "string",
      description: "Sets the space between an outline and the edge or border of an element.",
      value: "",
      options: ["length", ...globalCssOptions],
    },
    {
      name: "outline-style",
      nameForTitle: "Outline Style",
      type: "string",
      description: "Sets the style of an element's outline.",
      value: "",
      options: [
        "auto",
        "none",
        "dotted",
        "dashed",
        "solid",
        "double",
        "groove",
        "ridge",
        "inset",
        "outset",
        ...globalCssOptions,
      ],
    },
    {
      name: "outline-width",
      nameForTitle: "Outline Width",
      type: "string",
      description: "Sets the width of an element's outline.",
      value: "",
      options: ["thin", "medium", "thick", "length", ...globalCssOptions],
    },
  ],
};
