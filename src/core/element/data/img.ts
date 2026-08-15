
export const IMG_SPECIFIC_ATTRIBUTES = [
  {
    name: "alt",
    nameForTitle: "Alt Text",
    value: "",
    type: "string",
    description:
      "Specifies alternative text for the image, which is displayed if the image cannot be loaded.",
  },
  {
    name: "src",
    nameForTitle: "Source",
    value: "",
    type: "string",
    description: "Specifies the URL of the image.",
  },
  {
    name: "srcset",
    nameForTitle: "Source Set",
    value: "",
    type: "string",
    description:
      "Specifies a list of possible image sources for the browser to choose from.",
  },
  {
    name: "sizes",
    nameForTitle: "Sizes",
    value: "",
    type: "string",
    description:
      "Specifies the sizes of the images for different page layouts.",
  },
  {
    name: "width",
    nameForTitle: "Width",
    value: "",
    type: "string",
    description: "Specifies the width of the image.",
  },
  {
    name: "height",
    nameForTitle: "Height",
    value: "",
    type: "string",
    description: "Specifies the height of the image.",
  },
  {
    name: "crossorigin",
    nameForTitle: "Cross-Origin",
    value: "",
    type: "string",
    description: "Specifies how the image should be handled regarding CORS.",
    options: ["anonymous", "use-credentials"],
  },
  {
    name: "usemap",
    nameForTitle: "Use Map",
    value: "",
    type: "string",
    description:
      "Specifies the name of an image map to be used with the image.",
  },
  {
    name: "ismap",
    nameForTitle: "Is Map",
    value: "",
    type: "boolean",
    description: "Specifies that the image is part of a server-side image map.",
  },
  {
    name: "loading",
    nameForTitle: "Loading",
    value: "",
    type: "string",
    description: "Specifies how the browser should load the image.",
    options: ["eager", "lazy"],
  },
  {
    name: "referrerpolicy",
    nameForTitle: "Referrer Policy",
    value: "",
    type: "string",
    description:
      "Specifies which referrer information to send when fetching the image.",
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
    name: "decoding",
    nameForTitle: "Decoding",
    value: "",
    type: "string",
    description: "Indicates how the browser should decode the image.",
    options: ["sync", "async", "auto"],
  },
  {
    name: "fetchpriority",
    nameForTitle: "Fetch Priority",
    value: "",
    type: "string",
    description: "Specifies the priority of the image fetch request.",
    options: ["auto", "high", "low"],
  },
];
