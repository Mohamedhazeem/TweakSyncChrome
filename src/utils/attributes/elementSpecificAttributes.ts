import { Attribute } from "@/types/attributeTypes";

export const ELEMENT_SPECIFIC_ATTRIBUTES: { [key: string]: Attribute[] } = {
  a: [
    {
      name: "href",
      nameForTitle: "href",
      value: "",
      type: "string",
      description: "URL that the hyperlink points to",
    },
    {
      name: "target",
      nameForTitle: "Target",
      value: "",
      type: "string",
      description: "Specifies where to open the linked document",
    },
    {
      name: "rel",
      nameForTitle: "rel",
      value: "",
      type: "string",
      description:
        "Specifies the relationship between the current and linked document",
    },
    // ...other anchor-specific attributes
  ],
  input: [
    {
      name: "type",
      nameForTitle: "Type",
      value: "",
      type: "string",
      description: "Input Types",
      options: [
        "",
        "text",
        "password",
        "datetime",
        "datetime-local",
        "date",
        "month",
        "time",
        "week",
        "number",
        "email",
        "url",
        "search",
        "tel",
        "color",
      ],
    },
  ],
  button: [
    {
      name: "type",
      nameForTitle: "Type",
      value: "",
      type: "string",
      description: "Button Types",
      options: ["button", "submit", "reset"],
    },
  ],
  // ...other element-specific attributes
};
