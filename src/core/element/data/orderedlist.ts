
export const ORDEREDLIST_SPECIFIC_ATTRIBUTES = [
  {
    name: "start",
    nameForTitle: "Start",
    value: "",
    type: "number",
    description: "Specifies the starting value of the list.",
  },
  {
    name: "type",
    nameForTitle: "Type",
    value: "1",
    type: "string",
    description: "Specifies the type of marker for the list items.",
    options: ["1", "A", "a", "I", "i"], // { numbers:"1", Uppercase:"A",Lowercase: "a",Uppercase_Roman_Numerals: "I",Lowercase_Roman_Numerals "i"}
  },
  {
    name: "reversed",
    nameForTitle: "Reversed",
    value: false,
    type: "boolean",
    description: "Specifies if the list should be displayed in reverse order.",
  },
];
