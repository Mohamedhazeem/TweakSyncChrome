
export const VIDEO_SPECIFIC_ATTRIBUTES = [
  {
    name: "autoplay",
    nameForTitle: "Autoplay",
    value: "",
    type: "boolean",
    description:
      "Specifies that the video will start playing as soon as it is ready.",
  },
  {
    name: "controls",
    nameForTitle: "Controls",
    value: "",
    type: "boolean",
    description:
      "Specifies that video controls should be displayed (such as play/pause buttons, volume control, etc.).",
  },
  {
    name: "crossorigin",
    nameForTitle: "Cross-Origin Resource Sharing (CORS)",
    value: "",
    type: "string",
    description:
      "Sets the CORS settings for the video element's request for resources from another domain.",
    options: ["anonymous", "use-credentials"],
  },
  {
    name: "loop",
    nameForTitle: "Loop",
    value: "",
    type: "boolean",
    description:
      "Specifies that the video should start over again when it reaches the end.",
  },
  {
    name: "muted",
    nameForTitle: "Muted",
    value: "",
    type: "boolean",
    description:
      "Specifies that the audio output of the video should be muted.",
  },
  {
    name: "preload",
    nameForTitle: "Preload",
    value: "",
    type: "string",
    description:
      "Specifies how the video should be loaded when the page loads.",
    options: ["auto", "metadata", "none"],
  },
  {
    name: "src",
    nameForTitle: "Source",
    value: "",
    type: "string",
    description: "Specifies the URL of the video file.",
  },
  {
    name: "width",
    nameForTitle: "Width",
    value: "",
    type: "integer",
    description: "Specifies the width of the video player (in pixels).",
  },
  {
    name: "height",
    nameForTitle: "Height",
    value: "",
    type: "integer",
    description: "Specifies the height of the video player (in pixels).",
  },
  {
    name: "poster",
    nameForTitle: "Poster",
    value: "",
    type: "string",
    description:
      "Specifies an image to be shown while the video is downloading, or until the user hits the play button.",
  },
];
