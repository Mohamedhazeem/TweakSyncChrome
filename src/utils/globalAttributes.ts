import { Attribute } from "../types/attributeTypes";
import { ARIA_ROLES } from "./ariaRoles";

export const GLOBAL_ATTRIBUTES: Attribute[] = [
  ARIA_ROLES,
  {
    name: "accesskey",
    description:
      "Defines a keyboard shortcut to activate or focus on the element",
    value: "",
  },
  {
    name: "autocapitalize",
    description:
      "Specifies whether the element should be automatically capitalized",
    value: "",
    options: ["off", "none", "on", "sentences", "words", "characters"],
  },
  {
    name: "autofocus",
    description:
      "Specifies that the element should automatically get focus when the page loads",
    value: false,
  },
  {
    name: "class",
    description: "CSS classes for the element",
    value: "",
  },
  {
    name: "contenteditable",
    description: "Specifies whether the content of an element is editable",
    value: false,
  },
  {
    name: "data-*",
    description: "Allows you to store custom data attributes on the element",
    value: "",
  },
  {
    name: "dir",
    description: "Specifies the direction of the text/writing",
    value: "",
    options: ["ltr", "rtl", "auto"],
  },
  {
    name: "draggable",
    description: "Specifies whether an element is draggable",
    value: false,
  },
  {
    name: "enterkeyhint",
    description:
      "Specifies what action label (or icon) to present for the enter key on virtual keyboards",
    value: "",
    options: ["enter", "done", "go", "previous", "next", "search", "send"],
  },
  {
    name: "exportparts",
    description:
      "Allows to select and style elements existing in nested shadow trees, by exporting their part names",
    value: "",
  },
  {
    name: "hidden",
    description: "Specifies whether an element is visible or hidden",
    value: false,
  },
  { name: "id", description: "Unique identifier for the element", value: "" },
  {
    name: "inert",
    description: "makes the browser ignore input events sent by the user",
    value: "",
  },
  {
    name: "inputmode",
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
    description: "Specifies the language of the element",
    value: "",
  },
  {
    name: "part",
    description:
      "Allows CSS to select and style specific elements in a shadow tree",
    value: "",
  },
  {
    name: "popover",
    description: "Specifies element as a popover element",
    value: "",
    options: ["auto", "manual"],
  },

  {
    name: "spellcheck",
    description:
      "Specifies whether the element should have its spelling and grammar checked",
    value: false,
  },
  //   { name: 'style', description: 'inline styling an element', value: '' },
  {
    name: "tabindex",
    description: "Specifies the tab order of an element",
    value: "",
    options: ["0", "-1"],
  },
  {
    name: "title",
    description: "Text to display as a tooltip when hovering over the element",
    value: "",
  },
  {
    name: "translate",
    description:
      "Specifies whether the content of an element should be translated or not",
    value: true,
  },
];
