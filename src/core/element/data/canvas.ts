import type { Attribute } from "@/types/attributeTypes";

export const CANVAS_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "height",
    nameForTitle: "Height",
    value: "150",
    type: "string",
    description: "Specifies the height of the canvas drawing area.",
  },
  {
    name: "width",
    nameForTitle: "Width",
    value: "300",
    type: "string",
    description: "Specifies the width of the canvas drawing area.",
  },
];
