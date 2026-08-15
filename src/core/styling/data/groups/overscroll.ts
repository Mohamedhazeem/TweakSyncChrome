import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const OverscrollGroup: StyleGroup = {
  groupName: "Overscroll",
  propertyNames: [
    "overscroll-behavior",
    // "overscroll-behavior-x",
    // "overscroll-behavior-y",
    "overscroll-behavior-block",
    "overscroll-behavior-inline",
  ],
  groups: [
    {
      name: "overscroll-behavior",
      nameForTitle: "Overscroll Behavior",
      type: "string",
      description:
        "Specifies the behavior when the user reaches the boundary of a scrollable area. You can set the same overscroll behavior for both axes, or specify them individually for the x and y axes.",
      value: "",
      maxOptionCounts: 2,
      options: ["auto", "contain", "none", ...globalCssOptions],
      labels: [
        ["Overscroll Behavior on Both Axes"],
        ["Overscroll Behavior X", "Overscroll Behavior Y"],
      ],
    },
    // {
    //   name: "overscroll-behavior-x",
    //   nameForTitle: "Overscroll Behavior X",
    //   type: "string",
    //   description: "Specifies the overscroll behavior for the x-axis.",
    //   value: "",
    //   options: ["auto", "contain", "none", ...globalCssOptions],
    // },
    // {
    //   name: "overscroll-behavior-y",
    //   nameForTitle: "Overscroll Behavior Y",
    //   type: "string",
    //   description: "Specifies the overscroll behavior for the y-axis.",
    //   value: "",
    //   options: ["auto", "contain", "none", ...globalCssOptions],
    // },
    {
      name: "overscroll-behavior-block",
      nameForTitle: "Overscroll Behavior Block",
      type: "string",
      description: "Specifies the overscroll behavior for block-level elements.",
      value: "",
      options: ["auto", "contain", "none", ...globalCssOptions],
    },
    {
      name: "overscroll-behavior-inline",
      nameForTitle: "Overscroll Behavior Inline",
      type: "string",
      description: "Specifies the overscroll behavior for inline-level elements.",
      value: "",
      options: ["auto", "contain", "none", ...globalCssOptions],
    },
  ],
};
