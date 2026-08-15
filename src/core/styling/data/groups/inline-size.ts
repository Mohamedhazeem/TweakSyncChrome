import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const InlineSizeGroup: StyleGroup = {
  groupName: "Inline-Size",
  propertyNames: ["inline-size", "min-inline-size", "max-inline-size"],
  groups: [
    {
      name: "inline-size",
      nameForTitle: "Inline-Size",
      type: "string",
      description: "Sets the width of an element.",
      value: "",
      options: ["auto", "length", "max-content", "min-content", "fit-content", ...globalCssOptions],
    },
    {
      name: "min-inline-size",
      nameForTitle: "Minimum Inline-Size",
      type: "string",
      description: "Sets the minimum width of an element.",
      value: "",
      options: ["auto", "length", "max-content", "min-content", "fit-content", ...globalCssOptions],
    },
    {
      name: "max-inline-size",
      nameForTitle: "Maximum Inline-Size",
      type: "string",
      description: "Sets the maximum width of an element.",
      value: "",
      options: ["none", "length", "max-content", "min-content", "fit-content", ...globalCssOptions],
    },
  ],
};
