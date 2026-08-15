import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const BlockSizeGroup: StyleGroup = {
  groupName: "Block-Size",
  propertyNames: ["block-size", "min-block-size", "max-block-size"],
  groups: [
    {
      name: "block-size",
      nameForTitle: "Block-Size",
      type: "string",
      description: "Sets the width of an element.",
      value: "",
      options: ["auto", "length", "max-content", "min-content", "fit-content", ...globalCssOptions],
    },
    {
      name: "min-block-size",
      nameForTitle: "Minimum Block-Size",
      type: "string",
      description: "Sets the minimum width of an element.",
      value: "",
      options: ["auto", "length", "max-content", "min-content", "fit-content", ...globalCssOptions],
    },
    {
      name: "max-block-size",
      nameForTitle: "Maximum Block-Size",
      type: "string",
      description: "Sets the maximum width of an element.",
      value: "",
      options: ["none", "length", "max-content", "min-content", "fit-content", ...globalCssOptions],
    },
  ],
};
