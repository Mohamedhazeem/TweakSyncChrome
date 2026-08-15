import type { Attribute } from "@/types/attributeTypes";

export const DETAILS_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "open",
    nameForTitle: "Open",
    value: false,
    type: "boolean",
    description:
      "Indicates whether the details content is visible (open) on page load.",
  },
  {
    name: "name",
    nameForTitle: "Name",
    value: "",
    type: "string",
    description:
      "Specifies a group name to connect multiple <details> elements. Only one can be open at a time within the same group.",
  },
];
