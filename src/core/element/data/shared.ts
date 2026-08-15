import type { Attribute } from "@/types/attributeTypes";
import { REL_REV_TYPE, SHARED_MIME_TYPE } from "./attributeOptions";
import { languageTags } from "./languageTags";

export const SHARED_ATTRIBUTES: Attribute[] = [
  {
    name: "href",
    nameForTitle: "Href",
    value: "",
    type: "string",
    description: "URL that the hyperlink points to",
  },
  {
    name: "target",
    nameForTitle: "Target",
    value: "",
    type: "string",
    description: "Specifies where to open the linked document",
    options: ["_blank", "_self", "_parent", "_top"],
  },
  ...REL_REV_TYPE,
  {
    name: "download",
    nameForTitle: "Download",
    value: "",
    type: "string",
    description:
      "Specifies that the target will be downloaded when a user clicks on the hyperlink",
  },
  {
    name: "hreflang",
    nameForTitle: "HrefLang",
    value: "",
    type: "string",
    description: "Specifies the language of the linked document",
    options: languageTags,
  },
  {
    name: "type",
    nameForTitle: "Type",
    value: "",
    type: "string",
    description: "Specifies the media type of the linked document",
    options: SHARED_MIME_TYPE,
  },
  {
    name: "referrerpolicy",
    nameForTitle: "Referrer Policy",
    value: "",
    type: "string",
    description:
      "Specifies the referrer information to be sent along with the request",
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
    name: "ping",
    nameForTitle: "Ping",
    value: "",
    type: "string",
    description:
      "Specifies a space-separated list of URLs to which, when the link is followed, post requests with body ping will be sent by the browser (in the background)",
  },
];
