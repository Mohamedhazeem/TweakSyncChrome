import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const FlexGroup: StyleGroup = {
  groupName: "Flex",
  propertyNames: [
    "flex-basis",
    "flex-direction",
    "flex-flow",
    "flex-grow",
    "flex-shrink",
    "flex-wrap",
  ],
  groups: [
    {
      name: "flex-basis",
      nameForTitle: "Flex Basis",
      type: "string",
      description: "Specifies the initial main size of a flex item",
      value: "",
      options: [
        "auto",
        "content",
        "min-content",
        "max-content",
        "fit-content",
        "length",
        ...globalCssOptions,
      ],
    },
    {
      name: "flex-direction",
      nameForTitle: "Flex Direction",
      type: "string",
      description: "Defines the direction of the flex container's main axis",
      value: "",
      options: ["row", "row-reverse", "column", "column-reverse", ...globalCssOptions],
    },
    {
      name: "flex-flow",
      nameForTitle: "Flex Flow",
      type: "string",
      description: "A shorthand property for the flex-direction and flex-wrap properties",
      value: "",
      maxOptionCounts: 2,
      options: [
        "row",
        "row-reverse",
        "column",
        "column-reverse",
        "nowrap",
        "wrap",
        "wrap-reverse",
        ...globalCssOptions,
      ],
    },
    {
      name: "flex-grow",
      nameForTitle: "Flex Grow",
      type: "string",
      description:
        "Specifies how much a flex item will grow relative to the rest of the flex items",
      value: "",
      options: ["number", ...globalCssOptions],
    },
    {
      name: "flex-shrink",
      nameForTitle: "Flex Shrink",
      type: "string",
      description:
        "Specifies how much a flex item will shrink relative to the rest of the flex items",
      value: "",
      options: ["number", ...globalCssOptions],
    },
    {
      name: "flex-wrap",
      nameForTitle: "Flex Wrap",
      type: "string",
      description:
        "Specifies whether flex items are forced into a single line or can be wrapped onto multiple lines",
      value: "",
      options: ["nowrap", "wrap", "wrap-reverse", ...globalCssOptions],
    },
  ],
};
