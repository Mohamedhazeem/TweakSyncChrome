import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const ZoomGroup: StyleGroup = {
  groupName: "Zoom",
  propertyNames: ["zoom"],
  groups: [
    {
      name: "zoom",
      nameForTitle: "Zoom",
      type: "string",
      description: "Defines the zoom level of the element.",
      value: "",
      options: ["length", "number", "normal", "reset", ...globalCssOptions],
    },
  ],
};
