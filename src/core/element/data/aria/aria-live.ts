import type { Attribute } from "@/types/attributeTypes";

export const ARIA_ATTRIBUTES_LIVE: Attribute[] = [
  {
    name: "aria-level",
    nameForTitle: "ARIA - Level",
    type: "number",
    description:
      "Defines the hierarchical level of an element within a structure.",
    value: "",
  },
  {
    name: "aria-live",
    nameForTitle: "ARIA - Live",
    type: "string",
    description:
      "Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.",
    value: "",
    options: ["off", "polite", "assertive"],
  },
  {
    name: "aria-modal",
    nameForTitle: "ARIA - Modal",
    type: "boolean",
    description: "Indicates whether an element is modal when displayed.",
    value: "",
  },
  {
    name: "aria-multiline",
    nameForTitle: "ARIA - MultiLine",
    type: "boolean",
    description:
      "Indicates whether a text box accepts multiple lines of input or only a single line.",
    value: "",
  },
  {
    name: "aria-multiselectable",
    nameForTitle: "ARIA - MultiSelectable",
    type: "boolean",
    description:
      "Indicates that the user may select more than one item from the current selectable descendants.",
    value: "",
  },
  {
    name: "aria-orientation",
    nameForTitle: "ARIA - Orientation",
    type: "string",
    description:
      "Indicates whether the elements orientation is horizontal, vertical, or unknown/ambiguous.",
    value: "",
    options: ["horizontal", "vertical"],
  },
  {
    name: "aria-owns",
    nameForTitle: "ARIA - Owns",
    type: "string",
    description:
      "Identifies an element (or elements) in order to define a relationship between that element and the current element.",
    value: "",
  },
  {
    name: "aria-placeholder",
    nameForTitle: "ARIA - PlaceHolder",
    type: "string",
    description:
      "Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.",
    value: "",
  },
  {
    name: "aria-posinset",
    nameForTitle: "ARIA - Posinset",
    type: "number",
    description:
      "Defines an elements number or position in the current set of listitems or treeitems.",
    value: "",
  },
  {
    name: "aria-pressed",
    nameForTitle: "ARIA - Pressed",
    type: "boolean",
    description: 'Indicates the current "pressed" state of toggle buttons.',
    value: "",
    options: ["true", "false", "mixed"],
  },
  {
    name: "aria-readonly",
    nameForTitle: "ARIA - Readonly",
    type: "boolean",
    description:
      "Indicates that the element is not editable, but is otherwise operable.",
    value: "",
  },
  {
    name: "aria-relevant",
    nameForTitle: "ARIA - Relevant",
    type: "string",
    description:
      "Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.",
    value: "",
    options: ["additions", "removals", "text", "all"],
  },
  {
    name: "aria-required",
    nameForTitle: "ARIA - Required",
    type: "boolean",
    description:
      "Indicates that user input is required on the element before a form may be submitted.",
    value: "",
  },
  {
    name: "aria-roledescription",
    nameForTitle: "ARIA - RoleDescription",
    type: "string",
    description:
      "Defines a human-readable, author-localized description for the role of an element.",
    value: "",
  },
  {
    name: "aria-rowcount",
    nameForTitle: "ARIA - RowCount",
    type: "number",
    description: "Defines the number of rows in a table, grid, or treegrid.",
    value: "",
  },
  {
    name: "aria-rowindex",
    nameForTitle: "ARIA - RowIndex",
    type: "number",
    description:
      "Defines an elements row index or position with respect to the total number of rows within a table, grid, or treegrid.",
    value: "",
  },
  {
    name: "aria-rowspan",
    nameForTitle: "ARIA - RowSpan",
    type: "number",
    description:
      "Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.",
    value: "",
  },
  {
    name: "aria-selected",
    nameForTitle: "ARIA - Selected",
    type: "boolean",
    description: 'Indicates the current "selected" state of various widgets.',
    value: "",
  },
  {
    name: "aria-setsize",
    nameForTitle: "ARIA - SetSize",
    type: "number",
    description:
      "Defines the number of items in the current set of listitems or treeitems.",
    value: "",
  },
  {
    name: "aria-sort",
    nameForTitle: "ARIA - Sort",
    type: "string",
    description:
      "Indicates if items in a table or grid are sorted in ascending or descending order.",
    value: "",
    options: ["ascending", "descending", "none", "other"],
  },
  {
    name: "aria-valuemax",
    nameForTitle: "ARIA - ValueMax",
    type: "number",
    description: "Defines the maximum allowed value for a range widget.",
    value: "",
  },
  {
    name: "aria-valuemin",
    nameForTitle: "ARIA - ValueMin",
    type: "number",
    description: "Defines the minimum allowed value for a range widget.",
    value: "",
  },
  {
    name: "aria-valuenow",
    nameForTitle: "ARIA - ValueNow",
    type: "number",
    description: "Defines the current value for a range widget.",
    value: "",
  },
  {
    name: "aria-valuetext",
    nameForTitle: "ARIA - ValueText",
    type: "string",
    description:
      "Defines the human-readable text alternative of aria-valuenow for a range widget.",
    value: "",
  },
];
