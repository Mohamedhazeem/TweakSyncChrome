import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const WordGroup: StyleGroup = {
  groupName: "Word",
  propertyNames: ["word-break", "word-spacing"],
  groups: [
    {
      name: "word-break",
      nameForTitle: "Word Break",
      type: "string",
      description: "Specifies how words should break when reaching the end of a line.",
      value: "",
      options: [
        "normal",
        "break-all",
        "keep-all",
        "auto-phrase",
        "break-word",
        ...globalCssOptions,
      ],
    },
    {
      name: "word-spacing",
      nameForTitle: "Word Spacing",
      type: "string",
      description: "Sets the spacing between words.",
      value: "",
      options: ["normal", "length", ...globalCssOptions],
    },
  ],
};
