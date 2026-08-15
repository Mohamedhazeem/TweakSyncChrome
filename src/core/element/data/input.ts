import { ACCEPT_CHARSETS, ACCEPT, REL_REV_TYPE } from "./attributeOptions";

export const INPUT_SPECIFIC_ATTRIBUTES = [
  ...REL_REV_TYPE,
  {
    name: "accept",
    nameForTitle: "Accept",
    value: "",
    type: "string",
    description:
      "Specifies the types of files that the server accepts (only for type='file').",
    options: ACCEPT,
  },
  {
    name: "alt",
    nameForTitle: "Alt",
    value: "",
    type: "string",
    description:
      "Alternative text description of the image input (only for type='image').",
  },
  {
    name: "autocomplete",
    nameForTitle: "Autocomplete",
    value: "",
    type: "string",
    description:
      "Specifies whether the input field should have autocomplete enabled.",
    options: ["on", "off"],
  },
  {
    name: "checked",
    nameForTitle: "Checked",
    value: false,
    type: "boolean",
    description:
      "Specifies that a checkbox or radio button input should be pre-selected (only for type='checkbox' or 'radio').",
  },
  {
    name: "disabled",
    nameForTitle: "Disabled",
    value: false,
    type: "boolean",
    description:
      "Specifies that the input field is disabled and cannot be edited or submitted.",
  },
  {
    name: "form",
    nameForTitle: "Form",
    value: "",
    type: "string",
    description:
      "Associates the input field with a specific form by ID, even if the input is not nested within the form element.",
  },
  {
    name: "formaction",
    nameForTitle: "Formaction",
    value: "",
    type: "string",
    description:
      "Specifies the URL for form submission (only for type='submit' or 'image').",
  },
  {
    name: "formenctype",
    nameForTitle: "Formenctype",
    value: "",
    type: "string",
    description:
      "Specifies how form data should be encoded before sending it to a server (only for type='submit' or 'image').",
    options: [
      "application/x-www-form-urlencoded",
      "multipart/form-data",
      "text/plain",
    ],
  },
  {
    name: "formmethod",
    nameForTitle: "Formmethod",
    value: "",
    type: "string",
    description:
      "Specifies the HTTP method for form submission (only for type='submit' or 'image').",
    options: ["get", "post"],
  },
  {
    name: "formnovalidate",
    nameForTitle: "Formnovalidate",
    value: false,
    type: "boolean",
    description:
      "Specifies that form data should not be validated upon submission (only for type='submit' or 'image').",
  },
  {
    name: "formtarget",
    nameForTitle: "Formtarget",
    value: "",
    type: "string",
    description:
      "Specifies where to display the response after form submission (only for type='submit' or 'image').",
    options: ["_self", "_blank", "_parent", "_top"],
  },
  {
    name: "height",
    nameForTitle: "Height",
    value: "",
    type: "string",
    description:
      "Specifies the height of the input field (only for type='image').",
  },
  {
    name: "list",
    nameForTitle: "List",
    value: "",
    type: "string",
    description:
      "Identifies a <datalist> element that provides predefined options to suggest to the user.",
  },
  {
    name: "max",
    nameForTitle: "Max",
    value: "",
    type: "string",
    description:
      "Specifies the maximum value allowed (only for type='number', 'range', 'date', 'month', 'week', 'time').",
  },
  {
    name: "maxlength",
    nameForTitle: "Maxlength",
    value: "",
    type: "number",
    description:
      "Specifies the maximum number of characters allowed in the input field.",
  },
  {
    name: "min",
    nameForTitle: "Min",
    value: "",
    type: "string",
    description:
      "Specifies the minimum value allowed (only for type='number', 'range', 'date', 'month', 'week', 'time').",
  },
  {
    name: "minlength",
    nameForTitle: "Minlength",
    value: "",
    type: "number",
    description:
      "Specifies the minimum number of characters allowed in the input field.",
  },
  {
    name: "multiple",
    nameForTitle: "Multiple",
    value: false,
    type: "boolean",
    description:
      "Specifies that multiple values can be entered in an input field (only for type='email' or 'file').",
  },
  {
    name: "name",
    nameForTitle: "Name",
    value: "",
    type: "string",
    description: "Specifies the name of the input field.",
  },
  {
    name: "pattern",
    nameForTitle: "Pattern",
    value: "",
    type: "string",
    description:
      "Specifies a regular expression pattern that the input field's value is checked against.",
  },
  {
    name: "placeholder",
    nameForTitle: "Placeholder",
    value: "",
    type: "string",
    description:
      "Specifies a short hint that describes the expected value of the input field.",
  },
  {
    name: "readonly",
    nameForTitle: "Readonly",
    value: false,
    type: "boolean",
    description:
      "Specifies that the input field is read-only and cannot be edited.",
  },
  {
    name: "required",
    nameForTitle: "Required",
    value: false,
    type: "boolean",
    description:
      "Specifies that the input field must be filled out before submitting the form.",
  },
  {
    name: "size",
    nameForTitle: "Size",
    value: "",
    type: "number",
    description:
      "Specifies the width of the input field in characters (only for type='text', 'search', 'tel', 'url').",
  },
  {
    name: "src",
    nameForTitle: "Src",
    value: "",
    type: "string",
    description:
      "Specifies the URL of an image to display (only for type='image').",
  },
  {
    name: "step",
    nameForTitle: "Step",
    value: "",
    type: "string",
    description:
      "Specifies the legal number intervals for an input field (only for type='number' or 'range').",
  },
  {
    name: "type",
    nameForTitle: "Type",
    value: "text",
    type: "string",
    description:
      "Specifies the type of input field (e.g., text, password, checkbox, radio, etc.).",
    options: [
      "button",
      "checkbox",
      "color",
      "date",
      "datetime-local",
      "email",
      "file",
      "hidden",
      "image",
      "month",
      "number",
      "password",
      "radio",
      "range",
      "reset",
      "search",
      "submit",
      "tel",
      "text",
      "time",
      "url",
      "week",
    ],
  },
  {
    name: "value",
    nameForTitle: "Value",
    value: "",
    type: "string",
    description: "Specifies the initial value of the input field.",
  },
  {
    name: "width",
    nameForTitle: "Width",
    value: "",
    type: "string",
    description:
      "Specifies the width of the input field (only for type='image').",
  },
  {
    name: "accept-charset",
    nameForTitle: "Accept-charset",
    value: "",
    type: "string",
    description:
      "Specifies the character encodings that are to be used for form submission.",
    options: ACCEPT_CHARSETS,
  },
  {
    name: "crossorigin",
    nameForTitle: "Crossorigin",
    value: "",
    type: "string",
    description:
      "Specifies how the element handles cross-origin requests (e.g., for images or scripts).",
    options: ["anonymous", "use-credentials"],
  },
  {
    name: "is",
    nameForTitle: "Is",
    value: "",
    type: "string",
    description:
      "Experimental: Specifies the custom element tag name to use for the input field.",
  },
  {
    name: "loading",
    nameForTitle: "Loading",
    value: "",
    type: "string",
    description:
      "Indicates when the browser should load the image specified in the src attribute.",
    options: ["eager", "lazy"],
  },
  {
    name: "nonce",
    nameForTitle: "Nonce",
    value: "",
    type: "string",
    description:
      "Specifies a cryptographic nonce used to declare script execution policies.",
  },
  {
    name: "referrerpolicy",
    nameForTitle: "Referrerpolicy",
    value: "",
    type: "string",
    description:
      "Specifies which referrer to send when fetching the image's resource.",
    options: [
      "no-referrer",
      "no-referrer-when-downgrade",
      "origin",
      "origin-when-cross-origin",
      "same-origin",
      "strict-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url",
    ],
  },
  {
    name: "sizes",
    nameForTitle: "Sizes",
    value: "",
    type: "string",
    description:
      "Specifies the sizes of the images available for different viewport sizes.",
  },
  {
    name: "usemap",
    nameForTitle: "Usemap",
    value: "",
    type: "string",
    description:
      "Specifies an image map to use with the image input (only for type='image').",
  },
];
