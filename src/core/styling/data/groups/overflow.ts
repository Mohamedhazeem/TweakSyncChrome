import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const OverflowGroup: StyleGroup = {
  groupName: "Overflow",
  propertyNames: [
    "overflow",
    "overflow-anchor",
    "overflow-block",
    "overflow-clip-margin",
    "overflow-inline",
    "overflow-wrap",
  ],
  groups: [
    {
      name: "overflow",
      nameForTitle: "Overflow",
      type: "string",
      description:
        "Specifies how to handle content that is too large for its container. You can set the same overflow behavior for both axes, or specify them individually for the x and y axes.",
      value: "",
      maxOptionCounts: 2,
      options: ["auto", "clip", "hidden", "scroll", "visible", ...globalCssOptions],
      labels: [["Overflow on Both Axes"], ["Overflow X", "Overflow Y"]],
    },
    {
      name: "overflow-anchor",
      nameForTitle: "Overflow Anchor",
      type: "string",
      description: "Prevents content shifts that users don't expect.",
      value: "",
      options: ["auto", "none", ...globalCssOptions],
    },
    {
      name: "overflow-block",
      nameForTitle: "Overflow Block",
      type: "string",
      description: "Controls how content overflows the block axis.",
      value: "",
      options: ["auto", "clip", "hidden", "scroll", "visible", ...globalCssOptions],
    },
    {
      name: "overflow-clip-margin",
      nameForTitle: "Overflow Clip Margin",
      type: "string",
      description: "Sets the margin to apply before clipping an element.",
      value: "",
      options: ["length", ...globalCssOptions],
    },
    {
      name: "overflow-inline",
      nameForTitle: "Overflow Inline",
      type: "string",
      description: "Controls how content overflows the inline axis.",
      value: "",
      options: ["auto", "clip", "hidden", "scroll", "visible", ...globalCssOptions],
    },
    {
      name: "overflow-wrap",
      nameForTitle: "Overflow Wrap",
      type: "string",
      description:
        "Specifies whether the browser should break lines inside an otherwise unbreakable string to prevent overflow.",
      value: "",
      options: ["normal", "break-word", "anywhere", ...globalCssOptions],
    },
    // {
    //   name: "overflow-x",
    //   nameForTitle: "Overflow X",
    //   type: "string",
    //   description:
    //     "Specifies what to do with the left/right edges of the content when it overflows the element's content area.",
    //   value: "",
    //   options: ["auto", "clip", "hidden", "scroll", "visible", ...globalCssOptions],
    // },
    // {
    //   name: "overflow-y",
    //   nameForTitle: "Overflow Y",
    //   type: "string",
    //   description:
    //     "Specifies what to do with the top/bottom edges of the content when it overflows the element's content area.",
    //   value: "",
    //   options: ["auto", "clip", "hidden", "scroll", "visible", ...globalCssOptions],
    // },
  ],
};
