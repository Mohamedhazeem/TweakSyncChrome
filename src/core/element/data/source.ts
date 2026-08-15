import { SHARED_MIME_TYPE } from "./attributeOptions";

export const SOURCE_SPECIFIC_ATTRIBUTES = [
  {
    name: "type",
    nameForTitle: "Type",
    value: "",
    type: "string",
    description:
      "Specifies the MIME media type of the image or other media type, optionally including a codecs parameter.",
    options: SHARED_MIME_TYPE,
  },
  {
    name: "src",
    nameForTitle: "Source",
    value: "",
    type: "string",
    description:
      "Specifies the URL of the media resource. Required if the parent of <source> is <audio> or <video>. Not allowed if the parent is <picture>.",
  },
  {
    name: "srcset",
    nameForTitle: "Source Set",
    value: "",
    type: "string",
    description:
      "Specifies a comma-separated list of one or more image URLs and their descriptors. Required if the parent of <source> is <picture>. Not allowed if the parent is <audio> or <video>.",
  },
  {
    name: "sizes",
    nameForTitle: "Sizes",
    value: "",
    type: "string",
    description:
      "Specifies a list of source sizes that describe the final rendered width of the image. Allowed if the parent of <source> is <picture>. Not allowed if the parent is <audio> or <video>.",
  },
  {
    name: "media",
    nameForTitle: "Media",
    value: "",
    type: "string",
    description: "Specifies the media query for the resource's intended media.",
  },
  {
    name: "height",
    nameForTitle: "Height",
    value: "",
    type: "string",
    description:
      "Specifies the intrinsic height of the image in pixels. Allowed if the parent of <source> is a <picture>. Not allowed if the parent is <audio> or <video>.",
  },
  {
    name: "width",
    nameForTitle: "Width",
    value: "",
    type: "string",
    description:
      "Specifies the intrinsic width of the image in pixels. Allowed if the parent of <source> is a <picture>. Not allowed if the parent is <audio> or <video>.",
  },
];
