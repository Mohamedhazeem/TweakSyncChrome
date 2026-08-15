import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const HeightGroup: StyleGroup = {
  groupName: "Height",
  propertyNames: ["height", "min-height", "max-height"],
  groups: [
    {
      name: "height",
      nameForTitle: "Height",
      type: "string",
      description: "Sets the height of an element.",
      value: "",
      options: ["auto", "length", "max-content", "min-content", "fit-content", ...globalCssOptions],
    },
    {
      name: "min-height",
      nameForTitle: "Minimum Height",
      type: "string",
      description: "Sets the minimum height of an element.",
      value: "",
      options: ["auto", "length", "max-content", "min-content", "fit-content", ...globalCssOptions],
    },
    {
      name: "max-height",
      nameForTitle: "Maximum Height",
      type: "string",
      description: "Sets the maximum height of an element.",
      value: "",
      options: ["none", "length", "max-content", "min-content", "fit-content", ...globalCssOptions],
    },
  ],
};
