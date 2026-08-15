import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const ContainGroup: StyleGroup = {
  groupName: "Contain",
  propertyNames: [
    "contain",
    "contain-intrinsic-block-size",
    "contain-intrinsic-height",
    "contain-intrinsic-inline-size",
    "contain-intrinsic-width",
  ],
  groups: [
    {
      name: "contain",
      nameForTitle: "Contain",
      type: "string",
      description: "Specifies the extent of containment of an element.",
      value: "",
      options: [
        "none",
        "strict",
        "content",
        "size",
        "inline-size",
        "layout",
        "style",
        "paint",
        ...globalCssOptions,
      ],
    },
    {
      name: "contain-intrinsic-block-size",
      nameForTitle: "Contain Intrinsic Block Size",
      type: "string",
      description: "Specifies the intrinsic block size of an element when containment is applied.",
      value: "",
      options: ["length", "none", ...globalCssOptions],
    },
    {
      name: "contain-intrinsic-height",
      nameForTitle: "Contain Intrinsic Height",
      type: "string",
      description: "Specifies the intrinsic height of an element when containment is applied.",
      value: "",
      options: ["length", "none", ...globalCssOptions],
    },
    {
      name: "contain-intrinsic-inline-size",
      nameForTitle: "Contain Intrinsic Inline Size",
      type: "string",
      description: "Specifies the intrinsic inline size of an element when containment is applied.",
      value: "",
      options: ["length", "none", ...globalCssOptions],
    },
    {
      name: "contain-intrinsic-width",
      nameForTitle: "Contain Intrinsic Width",
      type: "string",
      description: "Specifies the intrinsic width of an element when containment is applied.",
      value: "",
      options: ["length", "none", ...globalCssOptions],
    },
  ],
};
