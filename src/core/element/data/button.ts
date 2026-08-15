import type { Attribute } from "@/types/attributeTypes";

export const BUTTON_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "disabled",
    nameForTitle: "Disabled",
    value: false,
    type: "boolean",
    description: "Specifies that the button is disabled.",
  },
  {
    name: "form",
    nameForTitle: "Form",
    value: "",
    type: "string",
    description: "Specifies one or more forms the button belongs to.",
  },
  {
    name: "formaction",
    nameForTitle: "Form Action",
    value: "",
    type: "string",
    description: "Specifies the URL for form submission.",
  },
  {
    name: "formenctype",
    nameForTitle: "Form Encoding Type",
    value: "",
    type: "string",
    description:
      "Specifies how form data should be encoded before sending it to a server.",
    options: [
      "application/x-www-form-urlencoded",
      "multipart/form-data",
      "text/plain",
    ],
  },
  {
    name: "formmethod",
    nameForTitle: "Form Method",
    value: "",
    type: "string",
    description: "Specifies the HTTP method to use when submitting the form.",
    options: ["get", "post", "dialog"],
  },
  {
    name: "formnovalidate",
    nameForTitle: "Form No Validate",
    value: false,
    type: "boolean",
    description:
      "Specifies that the form should not be validated when submitted.",
  },
  {
    name: "formtarget",
    nameForTitle: "Form Target",
    value: "",
    type: "string",
    description:
      "Specifies where to display the response after submitting the form.",
    options: ["_self", "_blank", "_parent", "_top"],
  },
  {
    name: "name",
    nameForTitle: "Name",
    value: "",
    type: "string",
    description: "Specifies the name of the button.",
  },
  {
    name: "type",
    nameForTitle: "Type",
    value: "submit",
    type: "string",
    description: "Specifies the type of button.",
    options: ["submit", "reset", "button"],
  },
  {
    name: "value",
    nameForTitle: "Value",
    value: "",
    type: "string",
    description: "Specifies the initial value of the button.",
  },
];
