import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const WhiteSpaceGroup: StyleGroup = {
  groupName: "White Space",
  propertyNames: ["white-space", "white-space-collapse"],
  groups: [
    {
      name: "white-space",
      nameForTitle: "White Space",
      type: "string",
      description: "Specifies how white space inside an element is handled.",
      value: "",
      options: [
        "normal",
        "nowrap",
        "pre",
        "pre-wrap",
        "pre-line",
        "break-spaces",
        ...globalCssOptions,
      ],
    },
    {
      name: "white-space-collapse",
      nameForTitle: "White Space Collapse",
      type: "string",
      description:
        "Controls the collapsing of white space in an element. Note that this property is experimental and not widely supported.",
      value: "",
      options: [
        "collapse",
        "preserve",
        "preserve-breaks",
        "preserve-spaces",
        "break-spaces",
        ...globalCssOptions,
      ],
    },
  ],
};
