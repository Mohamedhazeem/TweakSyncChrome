import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const PositionGroup: StyleGroup = {
  groupName: "Position",
  propertyNames: ["position", "top", "right", "bottom", "left", "z-index"],
  groups: [
    {
      name: "position",
      nameForTitle: "Position",
      type: "string",
      description: "Specifies the type of positioning method used for an element.",
      value: "",
      options: ["static", "relative", "absolute", "fixed", "sticky", ...globalCssOptions],
    },
    {
      name: "top",
      nameForTitle: "Top",
      type: "string",
      description: "Specifies the top offset of a positioned element.",
      value: "",
      options: ["auto", "length", ...globalCssOptions],
    },
    {
      name: "right",
      nameForTitle: "Right",
      type: "string",
      description: "Specifies the right offset of a positioned element.",
      value: "",
      options: ["auto", "length", ...globalCssOptions],
    },
    {
      name: "bottom",
      nameForTitle: "Bottom",
      type: "string",
      description: "Specifies the bottom offset of a positioned element.",
      value: "",
      options: ["auto", "length", ...globalCssOptions],
    },
    {
      name: "left",
      nameForTitle: "Left",
      type: "string",
      description: "Specifies the left offset of a positioned element.",
      value: "",
      options: ["auto", "length", ...globalCssOptions],
    },
    {
      name: "z-index",
      nameForTitle: "Z-Index",
      type: "number",
      description: "Specifies the stack order of a positioned element.",
      value: "",
      options: ["auto", "number", ...globalCssOptions],
    },
  ],
};
