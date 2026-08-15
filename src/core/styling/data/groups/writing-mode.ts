import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const WritingModeGroup: StyleGroup = {
  groupName: "Writing",
  propertyNames: ["writing-mode"],
  groups: [
    {
      name: "writing-mode",
      nameForTitle: "Writing Mode",
      type: "string",
      description: "Defines the direction and orientation of text.",
      value: "",
      options: [
        "horizontal-tb",
        "vertical-rl",
        "vertical-lr",
        "sideways-rl",
        "sideways-lr",
        ...globalCssOptions,
      ],
    },
  ],
};
