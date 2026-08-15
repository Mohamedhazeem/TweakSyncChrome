import type { Attribute } from "@/types/attributeTypes";

export const FIELDSET_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "disabled",
    nameForTitle: "Disabled",
    value: false,
    type: "boolean",
    description: "Disables all form controls within the fieldset.",
  },
  {
    name: "form",
    nameForTitle: "Form",
    value: "",
    type: "string",
    description: "Specifies the ID of the form the fieldset belongs to.",
  },
  {
    name: "name",
    nameForTitle: "Name",
    value: "",
    type: "string",
    description: "Associates a name with the group of form controls.",
  },
];
