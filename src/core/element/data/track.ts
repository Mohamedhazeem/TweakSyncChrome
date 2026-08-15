import { languageTags } from "./languageTags";

export const TRACK_SPECIFIC_ATTRIBUTES = [
  {
    name: "default",
    nameForTitle: "Default",
    value: "",
    type: "boolean",
    description:
      "Indicates that the track should be enabled unless overridden by user preferences.",
  },
  {
    name: "kind",
    nameForTitle: "Kind",
    value: "",
    type: "string",
    description: "Specifies how the text track is intended to be used.",
    options: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
  },
  {
    name: "label",
    nameForTitle: "Label",
    value: "",
    type: "string",
    description:
      "A user-readable title of the text track, used by the browser when listing available tracks.",
  },
  {
    name: "src",
    nameForTitle: "Source",
    value: "",
    type: "string",
    description:
      "The URL of the track file (.vtt format), specifying the text track's content.",
  },
  {
    name: "srclang",
    nameForTitle: "Source Language",
    value: "",
    type: "string",
    description:
      "The language of the text track content, using a valid BCP 47 language tag.",
    options: languageTags,
  },
];
