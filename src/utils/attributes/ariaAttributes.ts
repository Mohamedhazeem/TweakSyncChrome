import { Attribute } from "../../types/attributeTypes";

export const ARIA_ATTRIBUTES: Attribute[] = [
  {
    name: "aria-activedescendant",
    type: "string",
    description:
      "Identifies the currently active element when focus is on a composite widget, textbox, group, or application.",
    value: "",
  },
  {
    name: "aria-atomic",
    type: "boolean",
    description:
      "Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.",
    value: "",
  },
  {
    name: "aria-autocomplete",
    type: "string",
    description:
      "Indicates whether user input completion suggestions are provided.",
    value: "",
    options: ["inline", "list", "both", "none"],
  },
  {
    name: "aria-busy",
    type: "boolean",
    description:
      "Indicates whether an element, and its subtree, are currently being updated.",
    value: "",
  },
  {
    name: "aria-checked",
    type: "boolean",
    description:
      'Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.',
    value: "",
    options: ["true", "false", "mixed"],
  },
  {
    name: "aria-colcount",
    type: "number",
    description: "Defines the number of columns in a table, grid, or treegrid.",
    value: "",
  },
  {
    name: "aria-colindex",
    type: "number",
    description:
      "Defines an element’s column index or position with respect to the total number of columns within a table, grid, or treegrid.",
    value: "",
  },
  {
    name: "aria-colspan",
    type: "number",
    description:
      "Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.",
    value: "",
  },
  {
    name: "aria-controls",
    type: "string",
    description:
      "Identifies the element (or elements) whose contents or presence are controlled by the current element.",
    value: "",
  },
  {
    name: "aria-current",
    type: "string",
    description:
      "Indicates the element that represents the current item within a container or set of related elements.",
    value: "",
    options: ["page", "step", "location", "date", "time", "true", "false"],
  },
  {
    name: "aria-describedby",
    type: "string",
    description:
      "Identifies the element (or elements) that describes the object.",
    value: "",
  },
  {
    name: "aria-details",
    type: "string",
    description:
      "Identifies the element that provides a detailed, extended description for the object.",
    value: "",
  },
  {
    name: "aria-disabled",
    type: "boolean",
    description:
      "Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.",
    value: "",
  },
  {
    name: "aria-dropeffect",
    type: "string",
    description:
      "Indicates what functions can be performed when the dragged object is released on the drop target.",
    value: "",
    options: ["copy", "move", "link", "execute", "popup", "none"],
  },
  {
    name: "aria-errormessage",
    type: "string",
    description:
      "Identifies the element that provides an error message for the object.",
    value: "",
  },
  {
    name: "aria-expanded",
    type: "boolean",
    description:
      "Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.",
    value: "",
  },
  {
    name: "aria-flowto",
    type: "string",
    description:
      "Identifies the next element (or elements) in an alternate reading order of content which, at the user’s discretion, allows assistive technology to override the general default reading order.",
    value: "",
  },
  {
    name: "aria-grabbed",
    type: "boolean",
    description:
      'Indicates an element’s "grabbed" state in a drag-and-drop operation.',
    value: "",
  },
  {
    name: "aria-haspopup",
    type: "string",
    description:
      "Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.",
    value: "",
    options: ["false", "true", "menu", "listbox", "tree", "grid", "dialog"],
  },
  {
    name: "aria-hidden",
    type: "boolean",
    description:
      "Indicates whether the element is exposed to an accessibility API.",
    value: "",
  },
  {
    name: "aria-invalid",
    type: "string",
    description:
      "Indicates the entered value does not conform to the format expected by the application.",
    value: "",
    options: ["grammar", "false", "spelling", "true"],
  },
  {
    name: "aria-keyshortcuts",
    type: "string",
    description:
      "Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.",
    value: "",
  },
  {
    name: "aria-label",
    type: "string",
    description: "Defines a string value that labels the current element.",
    value: "",
  },
  {
    name: "aria-labelledby",
    type: "string",
    description:
      "Identifies the element (or elements) that labels the current element.",
    value: "",
  },
  {
    name: "aria-level",
    type: "number",
    description:
      "Defines the hierarchical level of an element within a structure.",
    value: "",
  },
  {
    name: "aria-live",
    type: "string",
    description:
      "Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.",
    value: "",
    options: ["off", "polite", "assertive"],
  },
  {
    name: "aria-modal",
    type: "boolean",
    description: "Indicates whether an element is modal when displayed.",
    value: "",
  },
  {
    name: "aria-multiline",
    type: "boolean",
    description:
      "Indicates whether a text box accepts multiple lines of input or only a single line.",
    value: "",
  },
  {
    name: "aria-multiselectable",
    type: "boolean",
    description:
      "Indicates that the user may select more than one item from the current selectable descendants.",
    value: "",
  },
  {
    name: "aria-orientation",
    type: "string",
    description:
      "Indicates whether the element’s orientation is horizontal, vertical, or unknown/ambiguous.",
    value: "",
    options: ["horizontal", "vertical"],
  },
  {
    name: "aria-owns",
    type: "string",
    description:
      "Identifies an element (or elements) in order to define a relationship between that element and the current element.",
    value: "",
  },
  {
    name: "aria-placeholder",
    type: "string",
    description:
      "Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.",
    value: "",
  },
  {
    name: "aria-posinset",
    type: "number",
    description:
      "Defines an element’s number or position in the current set of listitems or treeitems.",
    value: "",
  },
  {
    name: "aria-pressed",
    type: "boolean",
    description: 'Indicates the current "pressed" state of toggle buttons.',
    value: "",
    options: ["true", "false", "mixed"],
  },
  {
    name: "aria-readonly",
    type: "boolean",
    description:
      "Indicates that the element is not editable, but is otherwise operable.",
    value: "",
  },
  {
    name: "aria-relevant",
    type: "string",
    description:
      "Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.",
    value: "",
    options: ["additions", "removals", "text", "all"],
  },
  {
    name: "aria-required",
    type: "boolean",
    description:
      "Indicates that user input is required on the element before a form may be submitted.",
    value: "",
  },
  {
    name: "aria-roledescription",
    type: "string",
    description:
      "Defines a human-readable, author-localized description for the role of an element.",
    value: "",
  },
  {
    name: "aria-rowcount",
    type: "number",
    description: "Defines the number of rows in a table, grid, or treegrid.",
    value: "",
  },
  {
    name: "aria-rowindex",
    type: "number",
    description:
      "Defines an element’s row index or position with respect to the total number of rows within a table, grid, or treegrid.",
    value: "",
  },
  {
    name: "aria-rowspan",
    type: "number",
    description:
      "Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.",
    value: "",
  },
  {
    name: "aria-selected",
    type: "boolean",
    description: 'Indicates the current "selected" state of various widgets.',
    value: "",
  },
  {
    name: "aria-setsize",
    type: "number",
    description:
      "Defines the number of items in the current set of listitems or treeitems.",
    value: "",
  },
  {
    name: "aria-sort",
    type: "string",
    description:
      "Indicates if items in a table or grid are sorted in ascending or descending order.",
    value: "",
    options: ["ascending", "descending", "none", "other"],
  },
  {
    name: "aria-valuemax",
    type: "number",
    description: "Defines the maximum allowed value for a range widget.",
    value: "",
  },
  {
    name: "aria-valuemin",
    type: "number",
    description: "Defines the minimum allowed value for a range widget.",
    value: "",
  },
  {
    name: "aria-valuenow",
    type: "number",
    description: "Defines the current value for a range widget.",
    value: "",
  },
  {
    name: "aria-valuetext",
    type: "string",
    description:
      "Defines the human-readable text alternative of aria-valuenow for a range widget.",
    value: "",
  },
];
