import type { Attribute } from "@/types/attributeTypes";

export const DIALOG_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "open",
    nameForTitle: "Open",
    value: false,
    type: "boolean",
    description:
      "Indicates whether the dialog box is visible (open) on page load.",
  },
];
