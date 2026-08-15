import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const BoxGroup: StyleGroup = {
  groupName: "Box",
  propertyNames: ["-webkit-box-decoration-break", "box-shadow", "box-sizing"],
  groups: [
    {
      name: "-webkit-box-decoration-break",
      nameForTitle: "Box Decoration Break",
      type: "string",
      description:
        "Specifies how an element's fragments should be rendered when broken across multiple lines, columns, or pages.",
      value: "",
      options: ["slice", "clone", ...globalCssOptions],
    },
    {
      name: "box-shadow",
      nameForTitle: "Box Shadow",
      type: "string",
      description: "Adds shadow effects around the box.",
      value: "",
      options: ["none", "length", "color"],
    },
    {
      name: "box-sizing",
      nameForTitle: "Box Sizing",
      type: "string",
      description: "Defines how the width and height of the element are calculated.",
      value: "",
      options: ["content-box", "border-box", ...globalCssOptions],
    },
  ],
};
