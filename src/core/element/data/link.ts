import { ACCEPT_CHARSETS, REL_REV_TYPE } from "./attributeOptions";

export const LINK_SPECIFIC_ATTRIBUTES = [
  ...REL_REV_TYPE,
  {
    name: "href",
    nameForTitle: "Href",
    value: "",
    type: "string",
    description: "Specifies the URL of the linked document or resource.",
  },
  {
    name: "type",
    nameForTitle: "Type",
    value: "",
    type: "string",
    description: "Specifies the media type of the linked document.",
  },
  {
    name: "sizes",
    nameForTitle: "Sizes",
    value: "",
    type: "string",
    description:
      "Specifies the sizes of the icons for visual media such as images or icons.",
  },
  {
    name: "media",
    nameForTitle: "Media",
    value: "",
    type: "string",
    description:
      "Specifies the media query or media queries for which the linked resource is relevant.",
  },
  {
    name: "as",
    nameForTitle: "As",
    value: "",
    type: "string",
    description:
      "Specifies the preferred/preload fetch type of the linked document.",
    options: [
      "audio",
      "document",
      "embed",
      "fetch",
      "font",
      "image",
      "object",
      "script",
      "style",
      "track",
      "video",
    ],
  },
  {
    name: "integrity",
    nameForTitle: "Integrity",
    value: "",
    type: "string",
    description:
      "Specifies the cryptographic hash of the linked resource to verify its integrity.",
  },
  {
    name: "crossorigin",
    nameForTitle: "Crossorigin",
    value: "",
    type: "string",
    description: "Specifies how the element handles crossorigin requests.",
    options: ["anonymous", "use-credentials"],
  },
  {
    name: "referrerpolicy",
    nameForTitle: "Referrer Policy",
    value: "",
    type: "string",
    description:
      "Specifies which referrer to send when fetching the linked resource.",
    options: [
      "no-referrer",
      "no-referrer-when-downgrade",
      "origin",
      "origin-when-cross-origin",
      "same-origin",
      "strict-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url",
    ],
  },
  {
    name: "disabled",
    nameForTitle: "Disabled",
    value: false,
    type: "boolean",
    description: "Specifies whether the link element is disabled or not.",
  },
  {
    name: "charset",
    nameForTitle: "Charset",
    value: "",
    type: "string",
    description: "Specifies the character encoding of the linked resource.",
    options: ACCEPT_CHARSETS,
  },
  {
    name: "target",
    nameForTitle: "Target",
    value: "",
    type: "string",
    description: "Specifies where to open the linked document.",
    options: ["_blank", "_self", "_parent", "_top", "framename"],
  },
  {
    name: "download",
    nameForTitle: "Download",
    value: "",
    type: "string",
    description:
      "Specifies that the target will be downloaded when a user clicks on the hyperlink.",
  },
];
