import { Attribute } from "../../types/attributeTypes";
import { ARIA_ATTRIBUTES } from "./ariaAttributes";
import { ARIA_ROLES } from "./ariaRoles";

export const GLOBAL_ATTRIBUTES: Attribute[] = [
  ARIA_ROLES,
  ...ARIA_ATTRIBUTES,
  {
    name: "accesskey",
    type: "string",
    description:
      "Defines a keyboard shortcut to activate or focus on the element",
    value: "",
  },
  {
    name: "autocapitalize",
    type: "string",
    description:
      "Specifies whether the element should be automatically capitalized",
    value: "",
    options: ["off", "none", "on", "sentences", "words", "characters"],
  },
  {
    name: "autofocus",
    nameForTitile: "Auto Focus",
    type: "boolean",
    description:
      "Specifies that the element should automatically get focus when the page loads",
    value: false,
  },
  {
    name: "class",
    nameForTitile: "Class",
    type: "string",
    description: "CSS classes for the element",
    value: "",
  },
  {
    name: "contenteditable",
    nameForTitile: "Content Editable",
    type: "boolean",
    description: "Specifies whether the content of an element is editable",
    value: false,
  },
  {
    name: "data-*",
    nameForTitile: "Data",
    type: "object",
    description: "Allows you to store custom data attributes on the element",
    value: {},
  },
  {
    name: "dir",
    type: "string",
    description: "Specifies the direction of the text/writing",
    value: "",
    options: ["ltr", "rtl", "auto"],
  },
  {
    name: "draggable",
    nameForTitile: "Draggable",
    type: "boolean",
    description: "Specifies whether an element is draggable",
    value: false,
  },
  {
    name: "enterkeyhint",
    type: "string",
    description:
      "Specifies what action label or icon to present for the enter key on virtual keyboards",
    value: "",
    options: ["enter", "done", "go", "previous", "next", "search", "send"],
  },
  {
    name: "exportparts",
    type: "string",
    description:
      "Allows to select and style elements existing in nested shadow trees, by exporting their part names",
    value: "",
  },
  {
    name: "hidden",
    nameForTitile: "Hidden",
    type: "boolean",
    description: "Specifies whether an element is visible or hidden",
    value: false,
  },
  {
    name: "id",
    nameForTitile: "Id",
    type: "string",
    description: "Unique identifier for the element",
    value: "",
  },
  {
    name: "inert",
    nameForTitile: "Inert",
    type: "boolean",
    description: "Makes the browser ignore input events sent by the user",
    value: false,
  },
  {
    name: "inputmode",
    type: "string",
    description:
      "This allows a browser to display an appropriate virtual keyboard",
    value: "",
    options: [
      "none",
      "text",
      "decimal",
      "numeric",
      "tel",
      "search",
      "email",
      "url",
    ],
  },
  {
    name: "lang",
    type: "string",
    description: "Specifies the language of the element",
    value: "",
  },
  {
    name: "part",
    type: "string",
    description:
      "Allows CSS to select and style specific elements in a shadow tree",
    value: "",
  },
  {
    name: "popover",
    type: "string",
    description: "Specifies element as a popover element",
    value: "",
    options: ["auto", "manual"],
  },
  {
    name: "spellcheck",
    nameForTitile: "Spell Check",
    type: "boolean",
    description:
      "Specifies whether the element should have its spelling and grammar checked",
    value: false,
  },
  {
    name: "tabindex",
    type: "number",
    description: "Specifies the tab order of an element",
    value: 0,
    options: ["0", "-1"],
  },
  {
    name: "title",
    type: "string",
    description: "Text to display as a tooltip when hovering over the element",
    value: "",
  },
  {
    name: "translate",
    nameForTitile: "Translate",
    type: "string",
    description:
      "Specifies whether the content of an element should be translated or not",
    value: "yes",
    options: ["yes", "no"],
  },
];
