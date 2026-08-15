import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const ScrollbarGroup: StyleGroup = {
  groupName: "Scrollbar",
  propertyNames: ["scrollbar-color", "scrollbar-gutter", "scrollbar-width"],
  groups: [
    {
      name: "scrollbar-color",
      nameForTitle: "Scrollbar Color",
      type: "string",
      description: "Sets the color of the scrollbar track and thumb.",
      value: "",
      options: ["auto", "color", ...globalCssOptions],
    },
    {
      name: "scrollbar-gutter",
      nameForTitle: "Scrollbar Gutter",
      type: "string",
      description: "Controls the presence of scrollbar gutters.",
      value: "",
      options: ["auto", "stable", "stable both-edges", ...globalCssOptions],
    },
    {
      name: "scrollbar-width",
      nameForTitle: "Scrollbar Width",
      type: "string",
      description: "Sets the width of the scrollbar.",
      value: "",
      options: ["auto", "none", "thin", ...globalCssOptions],
    },
  ],
};
