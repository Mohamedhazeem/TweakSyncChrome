import type { Attribute } from "@/types/attributeTypes";

export const AUDIO_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "autoplay",
    nameForTitle: "Autoplay",
    value: false,
    type: "boolean",
    description: "Begins audio playback automatically as soon as possible.",
  },
  {
    name: "controls",
    nameForTitle: "Controls",
    value: false,
    type: "boolean",
    description:
      "Displays controls for audio playback (e.g., play, pause, volume).",
  },
  {
    name: "controlslist",
    nameForTitle: "Controls List",
    value: "",
    type: "string",
    description:
      "Helps the browser select which controls to display for the audio element.",
    options: ["nodownload", "nofullscreen", "noremoteplayback"],
  },
  {
    name: "crossorigin",
    nameForTitle: "Cross Origin",
    value: "",
    type: "string",
    description:
      "Determines if CORS should be used when fetching the audio file.",
    options: ["anonymous", "use-credentials"],
  },
  {
    name: "disableremoteplayback",
    nameForTitle: "Disable Remote Playback",
    value: false,
    type: "boolean",
    description:
      "Disables remote playback capabilities on connected devices (e.g., Miracast, AirPlay).",
  },
  {
    name: "loop",
    nameForTitle: "Loop",
    value: false,
    type: "boolean",
    description:
      "Causes audio playback to automatically seek back to the start upon reaching the end.",
  },
  {
    name: "muted",
    nameForTitle: "Muted",
    value: false,
    type: "boolean",
    description: "Starts audio playback with the sound muted.",
  },
  {
    name: "preload",
    nameForTitle: "Preload",
    value: "",
    type: "string",
    description: "Hints the browser about how to preload the audio file.",
    options: ["none", "metadata", "auto"],
  },
  {
    name: "src",
    nameForTitle: "Source",
    value: "",
    type: "string",
    description: "Specifies the URL of the audio file to embed.",
  },
];
