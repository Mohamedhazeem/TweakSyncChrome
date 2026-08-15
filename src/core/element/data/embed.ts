import type { Attribute } from "@/types/attributeTypes";
import { SHARED_MIME_TYPE } from "./attributeOptions";

export const EMBED_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "src",
    nameForTitle: "Source",
    value: "",
    type: "string",
    description: "The URL of the resource being embedded.",
  },
  {
    name: "type",
    nameForTitle: "Type",
    value: "",
    type: "string",
    description: "The MIME type of the embedded content.",
    options: SHARED_MIME_TYPE,
  },
  {
    name: "width",
    nameForTitle: "Width",
    value: "",
    type: "string",
    description:
      "The width of the embedded content in pixels or as a percentage.",
  },
  {
    name: "height",
    nameForTitle: "Height",
    value: "",
    type: "string",
    description:
      "The height of the embedded content in pixels or as a percentage.",
  },
];
