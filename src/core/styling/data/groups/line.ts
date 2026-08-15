import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const LineGroup: StyleGroup = {
  groupName: "Line",
  propertyNames: ["line-break", "-webkit-line-clamp", "line-height", "line-height-step"],
  groups: [
    {
      name: "line-break",
      nameForTitle: "Line Break",
      type: "string",
      description: "Specifies how or if to break lines within text.",
      value: "",
      options: ["auto", "loose", "normal", "strict", "anywhere", ...globalCssOptions],
    },
    {
      name: "-webkit-line-clamp",
      nameForTitle: "Line Clamp",
      type: "string",
      description:
        "Sets the amount of space used for lines, such as in the case of multiple lines of text.",
      value: "",
      options: ["number", ...globalCssOptions],
    },
    {
      name: "line-height",
      nameForTitle: "Line Height",
      type: "string",
      description:
        "Sets the amount of space used for lines, such as in the case of multiple lines of text.",
      value: "",
      options: ["normal", "number", "length", ...globalCssOptions],
    },
    {
      name: "line-height-step",
      nameForTitle: "Line Height Step",
      type: "string",
      description:
        "Sets the step size for line height, controlling the spacing between lines of text.",
      value: "",
      options: ["length", ...globalCssOptions],
    },
  ],
};
