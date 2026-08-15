import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const TableGroup: StyleGroup = {
  groupName: "Table",
  propertyNames: ["empty-cells", "caption-side", "table-layout"],
  groups: [
    {
      name: "caption-side",
      nameForTitle: "Caption Side",
      type: "string",
      description: "Specifies the placement of the caption for a table element.",
      value: "",
      options: ["top", "bottom", ...globalCssOptions],
    },
    {
      name: "empty-cells",
      nameForTitle: "Empty Cells",
      type: "string",
      description:
        "Specifies whether to display or hide borders and backgrounds of empty table cells.",
      value: "",
      options: ["show", "hide", ...globalCssOptions],
    },
    {
      name: "table-layout",
      nameForTitle: "Table Layout",
      type: "string",
      description: "Defines the algorithm used to lay out the table cells, rows, and columns.",
      value: "",
      options: ["auto", "fixed", ...globalCssOptions],
    },
  ],
};
