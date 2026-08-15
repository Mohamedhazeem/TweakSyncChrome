import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const AllGroup: StyleGroup = {
  groupName: "All",
  propertyNames: ["all"],
  groups: [
    {
      name: "all",
      nameForTitle: "All Property",
      type: "string",
      description: "Applies all styles to an element.",
      value: "",
      options: [...globalCssOptions],
    },
  ],
};
