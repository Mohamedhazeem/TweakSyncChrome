import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const PaddingGroup: StyleGroup = {
  groupName: "Padding",
  propertyNames: ["padding", "padding-block", "padding-inline"],
  groups: [
    {
      name: "padding",
      nameForTitle: "Padding",
      type: "string",
      description:
        "Specifies the padding inside the element. You can set the same padding for all four sides, or specify them individually for top, right, bottom, and left.",
      value: "",
      maxOptionCounts: 4,
      options: ["length", ...globalCssOptions],
      labels: [
        ["All Sides Padding"],
        ["Top and Bottom Padding", "Left and Right Padding"],
        ["Top Padding", "Left and Right Padding", "Bottom Padding"],
        ["Top Padding", "Right Padding", "Bottom Padding", "Left Padding"],
      ],
    },
    {
      name: "padding-block",
      nameForTitle: "Padding Block",
      type: "string",
      description:
        "Specifies the padding for the block start and block end of an element, depending on the writing mode. You can set the same padding for both, or specify them individually.",
      value: "",
      maxOptionCounts: 2,
      options: ["length", ...globalCssOptions],
      labels: [["Block Start and End Padding"], ["Block Start Padding", "Block End Padding"]],
    },
    {
      name: "padding-inline",
      nameForTitle: "Padding Inline",
      type: "string",
      description:
        "Specifies the padding for the inline start and inline end of an element, depending on the writing mode. You can set the same padding for both, or specify them individually.",
      value: "",
      maxOptionCounts: 2,
      options: ["length", ...globalCssOptions],
      labels: [["Inline Start and End Padding"], ["Inline Start Padding", "Inline End Padding"]],
    },
  ],
};
