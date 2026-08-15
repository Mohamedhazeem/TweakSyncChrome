import type { StyleGroup } from "@/types/styleTypes";

export const BackfaceVisibilityGroup: StyleGroup = {
  groupName: "Backface Visibility",
  propertyNames: ["backface-visibility"],
  groups: [
    {
      name: "backface-visibility",
      nameForTitle: "Backface Visibility",
      type: "string",
      description: "Determines whether the back face of an element is visible when turned.",
      value: "",
      options: ["visible", "hidden"],
    },
  ],
};
