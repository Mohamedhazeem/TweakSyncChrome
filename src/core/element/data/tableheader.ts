
export const TABLEHEADER_SPECIFIC_ATTRIBUTES = [
  {
    name: "abbr",
    nameForTitle: "Abbreviation",
    value: "",
    type: "string",
    description: "Specifies an abbreviated version of the cell's content.",
  },
  {
    name: "colspan",
    nameForTitle: "Column Span",
    value: "",
    type: "number",
    description: "Specifies the number of columns that the cell should span.",
  },
  {
    name: "rowspan",
    nameForTitle: "Row Span",
    value: "",
    type: "number",
    description: "Specifies the number of rows that the cell should span.",
  },
  {
    name: "headers",
    nameForTitle: "Header Cells",
    value: "",
    type: "string",
    description:
      "Space-separated list of header cells IDs that the cell is related to.",
  },
  {
    name: "scope",
    nameForTitle: "Scope",
    value: "",
    type: "string",
    description:
      "Specifies the set of data cells for which the current header cell provides header information.",
    options: ["row", "col", "rowgroup", "colgroup"],
  },
];
