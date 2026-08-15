import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const WidthGroup: StyleGroup = {
  groupName: "Width",
  propertyNames: ["width", "min-width", "max-width"],
  groups: [
    {
      name: "width",
      nameForTitle: "Width",
      type: "string",
      description: "Sets the width of an element.",
      value: "",
      options: ["auto", "length", "max-content", "min-content", "fit-content", ...globalCssOptions],
    },
    {
      name: "min-width",
      nameForTitle: "Minimum Width",
      type: "string",
      description: "Sets the minimum width of an element.",
      value: "",
      options: ["auto", "length", "max-content", "min-content", "fit-content", ...globalCssOptions],
    },
    {
      name: "max-width",
      nameForTitle: "Maximum Width",
      type: "string",
      description: "Sets the maximum width of an element.",
      value: "",
      options: ["none", "length", "max-content", "min-content", "fit-content", ...globalCssOptions],
    },
  ],
};
