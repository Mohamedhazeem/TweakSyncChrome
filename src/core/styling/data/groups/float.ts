import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const FloatGroup: StyleGroup = {
  groupName: "Float",
  propertyNames: ["float", "clear"],
  groups: [
    {
      name: "float",
      nameForTitle: "Float",
      type: "string",
      description: "Specifies how an element should float within its container.",
      value: "",
      options: ["none", "left", "right", "inline-start", "inline-end", ...globalCssOptions],
    },
    {
      name: "clear",
      nameForTitle: "Clear",
      type: "string",
      description:
        "Specifies which sides of an element's box are not affected by floating elements.",
      value: "",
      options: ["none", "left", "right", "both", "inline-start", "inline-end", ...globalCssOptions],
    },
  ],
};
