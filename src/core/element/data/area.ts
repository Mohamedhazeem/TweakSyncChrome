import type { Attribute } from "@/types/attributeTypes";

export const AREA_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "coords",
    nameForTitle: "Coords",
    value: "",
    type: "string",
    description: "Specifies the coordinates of the area",
  },
  {
    name: "shape",
    nameForTitle: "Shape",
    value: "",
    type: "string",
    description: "Specifies the shape of the area",
    options: ["default", "rect", "circle", "poly"],
  },
  {
    name: "alt",
    nameForTitle: "Alt",
    value: "",
    type: "string",
    description: "Specifies an alternate text for the area",
  },
];
