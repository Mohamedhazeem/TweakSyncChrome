import type { Attribute } from "@/types/attributeTypes";

export const BASE_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "href",
    nameForTitle: "HREF",
    value: "",
    type: "string",
    description:
      "Specifies the base URL for all relative URLs in the document.",
  },
  {
    name: "target",
    nameForTitle: "Target",
    value: "",
    type: "string",
    description:
      "Specifies the default target for all hyperlinks and forms in the document.",
    options: ["_blank", "_self", "_parent", "_top"],
  },
];
