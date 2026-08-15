import type { Attribute } from "@/types/attributeTypes";
import { ACCEPT_CHARSETS, REL_REV_TYPE } from "./attributeOptions";

export const FORM_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "accept-charset",
    nameForTitle: "Accept-Charset",
    value: "",
    type: "string",
    description:
      "Specifies the character encodings that are to be used for form submission.",
    options: ACCEPT_CHARSETS,
  },
  {
    name: "action",
    nameForTitle: "Action",
    value: "",
    type: "string",
    description:
      "Specifies the URL to which the form's data should be submitted.",
  },
  {
    name: "autocomplete",
    nameForTitle: "Autocomplete",
    value: "",
    type: "string",
    description:
      "Specifies whether a form or input field should have autocomplete enabled.",
    options: ["on", "off"],
  },
  {
    name: "enctype",
    nameForTitle: "Enctype",
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
    name: "method",
    nameForTitle: "Method",
    value: "",
    type: "string",
    description:
      "Specifies the HTTP method (GET or POST) to be used when submitting the form.",
    options: ["get", "post", "dialog", "submit"],
  },
  {
    name: "name",
    nameForTitle: "Name",
    value: "",
    type: "string",
    description:
      "Assigns a name to the form. The value must not be the empty string, and must be unique among the form elements in the forms collection.",
  },
  {
    name: "novalidate",
    nameForTitle: "Novalidate",
    value: false,
    type: "boolean",
    description:
      "Specifies that the form should not be validated upon submission.",
  },
  {
    name: "target",
    nameForTitle: "Target",
    value: "",
    type: "string",
    description:
      "Specifies where to display the response received after submitting the form.",
    options: ["_self", "_blank", "_parent", "_top", "framename"],
  },
  ...REL_REV_TYPE,
];
