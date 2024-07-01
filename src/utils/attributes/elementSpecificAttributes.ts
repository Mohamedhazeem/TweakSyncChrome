import { Attribute } from "@/types/attributeTypes";
import { languageTags } from "./lang";
const ACCEPT_CHARSETS: string[] = [
  "Big5", // Traditional Chinese character set
  "EUC-JP", // Extended Unix Code - Japanese
  "EUC-KR", // Extended Unix Code - Korean
  "GB2312", // Chinese Simplified character set
  "GBK", // Chinese Simplified character set
  "IBM-Thai", // IBM Thai character set
  "IBM00858", // IBM OEM character set for multilingual Latin-1
  "IBM01140", // IBM OEM character set for US and Western Europe
  "IBM01141", // IBM OEM character set for Germany
  "IBM01142", // IBM OEM character set for Denmark/Norway
  "IBM01143", // IBM OEM character set for Finland/Sweden
  "IBM01144", // IBM OEM character set for Italy
  "IBM01145", // IBM OEM character set for Spain
  "IBM01146", // IBM OEM character set for UK
  "IBM01147", // IBM OEM character set for France
  "IBM01148", // IBM OEM character set for International Latin-1
  "IBM01149", // IBM OEM character set for Icelandic
  "ISO-2022-JP", // Japanese character set
  "ISO-2022-JP-2", // Japanese character set (JIS X 0208-1990)
  "ISO-2022-KR", // Korean character set
  "ISO-8859-1", // Western European (Latin-1) character set
  "ISO-8859-2", // Central European (Latin-2) character set
  "ISO-8859-3", // South European (Latin-3) character set
  "ISO-8859-4", // North European (Baltic Rim) (Latin-4) character set
  "ISO-8859-5", // Cyrillic character set
  "ISO-8859-6", // Arabic character set
  "ISO-8859-7", // Greek character set
  "ISO-8859-8", // Hebrew character set
  "ISO-8859-9", // Turkish character set (Latin-5)
  "ISO-8859-10", // Nordic character set (Latin-6)
  "KOI8-R", // Russian character set
  "KOI8-U", // Ukrainian character set
  "Shift_JIS", // Japanese character set
  "TIS-620", // Thai character set
  "US-ASCII", // Basic Latin character set (ASCII)
  "UTF-16", // Unicode Transformation Format, 16-bit
  "UTF-16BE", // Unicode Transformation Format, 16-bit big-endian byte order
  "UTF-16LE", // Unicode Transformation Format, 16-bit little-endian byte order
  "UTF-32", // Unicode Transformation Format, 32-bit
  "UTF-32BE", // Unicode Transformation Format, 32-bit big-endian byte order
  "UTF-32LE", // Unicode Transformation Format, 32-bit little-endian byte order
  "UTF-7", // Unicode Transformation Format, 7-bit
  "UTF-8", // Unicode Transformation Format, 8-bit
  "VISCII", // Vietnamese character set
];
const ACCEPT = [
  ".aac",
  ".ai",
  ".apk",
  ".app",
  ".asf",
  ".asx",
  ".avi",
  ".bat",
  ".bin",
  ".bmp",
  ".bz2",
  ".c",
  ".cbr",
  ".cbz",
  ".cc",
  ".class",
  ".com",
  ".cpp",
  ".css",
  ".csv",
  ".cxx",
  ".deb",
  ".dll",
  ".dmg",
  ".doc",
  ".docx",
  ".dot",
  ".dotx",
  ".dtd",
  ".eot",
  ".eps",
  ".exe",
  ".fla",
  ".flv",
  ".fnt",
  ".fon",
  ".gadget",
  ".gif",
  ".gz",
  ".gzip",
  ".h",
  ".htm",
  ".html",
  ".ico",
  ".ics",
  ".iso",
  ".jar",
  ".jpeg",
  ".jpg",
  ".js",
  ".json",
  ".jsp",
  ".key",
  ".keynote",
  ".kml",
  ".kmz",
  ".log",
  ".m4a",
  ".m4v",
  ".mdb",
  ".mid",
  ".midi",
  ".mobi",
  ".mov",
  ".mp3",
  ".mp4",
  ".mpeg",
  ".mpg",
  ".msi",
  ".odp",
  ".ods",
  ".odt",
  ".ogg",
  ".otf",
  ".pages",
  ".part",
  ".pcx",
  ".pdb",
  ".pdf",
  ".php",
  ".pkg",
  ".pl",
  ".plugin",
  ".png",
  ".pps",
  ".ppt",
  ".pptx",
  ".ps",
  ".psd",
  ".py",
  ".qt",
  ".rar",
  ".rm",
  ".rom",
  ".rpm",
  ".rss",
  ".rtf",
  ".sdf",
  ".sit",
  ".sitx",
  ".svg",
  ".swf",
  ".sys",
  ".tar",
  ".tgz",
  ".tif",
  ".tiff",
  ".tmp",
  ".ttf",
  ".txt",
  ".vb",
  ".vcd",
  ".vcf",
  ".vob",
  ".wav",
  ".wma",
  ".wmv",
  ".woff",
  ".wpd",
  ".wps",
  ".wsf",
  ".xhtml",
  ".xls",
  ".xlsx",
  ".xml",
  ".xul",
  ".zip",
];

const REL_TYPE = {
  name: "rel",
  nameForTitle: "Rel",
  value: "",
  type: "string",
  description:
    "Specifies the relationship between the current and linked document",
  options: [
    "alternate",
    "author",
    "bookmark",
    "canonical",
    "external",
    "help",
    "icon",
    "license",
    "manifest",
    "me",
    "modulepreload",
    "next",
    "nofollow",
    "noopener",
    "noreferrer",
    "opener",
    "pingback",
    "preconnect",
    "prefetch",
    "preload",
    "prerender",
    "prev",
    "search",
    "shortlink",
    "stylesheet",
    "tag",
  ],
};
const SHARED_MIME_TYPE = [
  "application/json",
  "application/msword",
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.oasis.opendocument.text",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/zip",
  "audio/mpeg",
  "audio/ogg",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "text/css",
  "text/csv",
  "text/html",
  "text/javascript",
  "text/plain",
  "text/xml",
  "video/mp4",
  "video/mpeg",
  "video/ogg",
  "video/webm",
];
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
  REL_TYPE,
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

// const ANCHOR_SPECIFIC_ATTRIBUTES: Attribute[] =  [

//   ];
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
  {
    name: "volume",
    nameForTitle: "Volume",
    value: "",
    type: "number",
    description:
      "Sets the volume level of the audio, from 0.0 (silent) to 1.0 (maximum volume).",
  },
];
export const BASE_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "href",
    nameForTitle: "HREF",
    value: "",
    type: "string",
    description:
      "Specifies the base URL for all relative URLs in the document.",
  },
  {
    name: "target",
    nameForTitle: "Target",
    value: "",
    type: "string",
    description:
      "Specifies the default target for all hyperlinks and forms in the document.",
    options: ["_blank", "_self", "_parent", "_top"],
  },
];
export const BLOCKQUOTE_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "cite",
    nameForTitle: "Cite",
    value: "",
    type: "string",
    description: "Specifies the source of the quotation.",
  },
];
export const BUTTON_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "disabled",
    nameForTitle: "Disabled",
    value: false,
    type: "boolean",
    description: "Specifies that the button is disabled.",
  },
  {
    name: "form",
    nameForTitle: "Form",
    value: "",
    type: "string",
    description: "Specifies one or more forms the button belongs to.",
  },
  {
    name: "formaction",
    nameForTitle: "Form Action",
    value: "",
    type: "string",
    description: "Specifies the URL for form submission.",
  },
  {
    name: "formenctype",
    nameForTitle: "Form Encoding Type",
    value: "",
    type: "string",
    description:
      "Specifies how form data should be encoded before sending it to a server.",
    options: [
      "application/x-www-form-urlencoded",
      "multipart/form-data",
      "text/plain",
    ],
  },
  {
    name: "formmethod",
    nameForTitle: "Form Method",
    value: "",
    type: "string",
    description: "Specifies the HTTP method to use when submitting the form.",
    options: ["get", "post", "dialog"],
  },
  {
    name: "formnovalidate",
    nameForTitle: "Form No Validate",
    value: false,
    type: "boolean",
    description:
      "Specifies that the form should not be validated when submitted.",
  },
  {
    name: "formtarget",
    nameForTitle: "Form Target",
    value: "",
    type: "string",
    description:
      "Specifies where to display the response after submitting the form.",
    options: ["_self", "_blank", "_parent", "_top"],
  },
  {
    name: "name",
    nameForTitle: "Name",
    value: "",
    type: "string",
    description: "Specifies the name of the button.",
  },
  {
    name: "type",
    nameForTitle: "Type",
    value: "submit",
    type: "string",
    description: "Specifies the type of button.",
    options: ["submit", "reset", "button"],
  },
  {
    name: "value",
    nameForTitle: "Value",
    value: "",
    type: "string",
    description: "Specifies the initial value of the button.",
  },
];
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
export const COL_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "span",
    nameForTitle: "Span",
    value: "",
    type: "number",
    description:
      "Specifies the number of columns that the <col> | <colgroup> element should span.",
  },
];

export const DATA_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "value",
    nameForTitle: "Value",
    value: "",
    type: "string",
    description: "Specifies the value associated with the data.",
  },
];
export const DEL_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "cite",
    nameForTitle: "Cite",
    value: "",
    type: "string",
    description: "Specifies a URL that explains the reason for the change.",
  },
  {
    name: "datetime",
    nameForTitle: "Datetime",
    value: "",
    type: "string",
    description: "Specifies the date and time of the change.",
  },
];

export const DETAILS_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "open",
    nameForTitle: "Open",
    value: false,
    type: "boolean",
    description:
      "Indicates whether the details content is visible (open) on page load.",
  },
  {
    name: "name",
    nameForTitle: "Name",
    value: "",
    type: "string",
    description:
      "Specifies a group name to connect multiple <details> elements. Only one can be open at a time within the same group.",
  },
];
export const DIALOG_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "open",
    nameForTitle: "Open",
    value: false,
    type: "boolean",
    description:
      "Indicates whether the dialog box is visible (open) on page load.",
  },
];
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
export const FIELDSET_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "disabled",
    nameForTitle: "Disabled",
    value: false,
    type: "boolean",
    description: "Disables all form controls within the fieldset.",
  },
  {
    name: "form",
    nameForTitle: "Form",
    value: "",
    type: "string",
    description: "Specifies the ID of the form the fieldset belongs to.",
  },
  {
    name: "name",
    nameForTitle: "Name",
    value: "",
    type: "string",
    description: "Associates a name with the group of form controls.",
  },
];
export const FORM_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "accept-charset",
    nameForTitle: "Accept-Charset",
    value: "",
    type: "string",
    description:
      "Specifies the character encodings that are to be used for form submission.",
    options: ACCEPT_CHARSETS,
  },
  {
    name: "action",
    nameForTitle: "Action",
    value: "",
    type: "string",
    description:
      "Specifies the URL to which the form's data should be submitted.",
  },
  {
    name: "autocomplete",
    nameForTitle: "Autocomplete",
    value: "",
    type: "string",
    description:
      "Specifies whether a form or input field should have autocomplete enabled.",
    options: ["on", "off"],
  },
  {
    name: "enctype",
    nameForTitle: "Enctype",
    value: "",
    type: "string",
    description:
      "Specifies how form data should be encoded before sending it to a server.",
    options: [
      "application/x-www-form-urlencoded",
      "multipart/form-data",
      "text/plain",
    ],
  },
  {
    name: "method",
    nameForTitle: "Method",
    value: "",
    type: "string",
    description:
      "Specifies the HTTP method (GET or POST) to be used when submitting the form.",
    options: ["get", "post", "dialog", "submit"],
  },
  {
    name: "name",
    nameForTitle: "Name",
    value: "",
    type: "string",
    description:
      "Assigns a name to the form. The value must not be the empty string, and must be unique among the form elements in the forms collection.",
  },
  {
    name: "novalidate",
    nameForTitle: "Novalidate",
    value: false,
    type: "boolean",
    description:
      "Specifies that the form should not be validated upon submission.",
  },
  {
    name: "target",
    nameForTitle: "Target",
    value: "",
    type: "string",
    description:
      "Specifies where to display the response received after submitting the form.",
    options: ["_self", "_blank", "_parent", "_top", "framename"],
  },
  REL_TYPE,
];
const IFRAME_SPECIFIC_ATTRIBUTES: Attribute[] = [
  {
    name: "allow",
    nameForTitle: "Allow",
    value: "",
    type: "string",
    description: "Specifies a Permissions Policy for the <iframe>.",
    options: [
      "accelerometer",
      "ambient-light-sensor",
      "autoplay",
      "battery",
      "camera",
      "cross-origin-isolated",
      "display-capture",
      "document-domain",
      "encrypted-media",
      "fullscreen",
      "geolocation",
      "gyroscope",
      "magnetometer",
      "microphone",
      "midi",
      "payment",
      "picture-in-picture",
      "publickey-credentials-get",
      "screen-wake-lock",
      "sync-xhr",
      "usb",
      "web-share",
      "xr-spatial-tracking",
    ],
  },
  {
    name: "allowfullscreen",
    nameForTitle: "Allow Fullscreen",
    value: "",
    type: "boolean",
    description: "Allows the <iframe> to activate fullscreen mode.",
  },
  {
    name: "allowpaymentrequest",
    nameForTitle: "Allow Payment Request",
    value: "",
    type: "boolean",
    description: "Deprecated: Use allow='payment' instead.",
  },
  {
    name: "browsingtopics",
    nameForTitle: "Browsing Topics",
    value: "",
    type: "boolean",
    description:
      "Experimental: Specifies that the selected topics for the current user should be sent with the request for the <iframe>'s source.",
  },
  {
    name: "credentialless",
    nameForTitle: "Credentialless",
    value: "",
    type: "boolean",
    description: "Experimental: Makes the <iframe> credentialless.",
  },
  {
    name: "csp",
    nameForTitle: "Content Security Policy",
    value: "",
    type: "string",
    description:
      "Experimental: A Content Security Policy enforced for the embedded resource.",
  },
  {
    name: "height",
    nameForTitle: "Height",
    value: "",
    type: "string",
    description: "The height of the frame in CSS pixels.",
  },
  {
    name: "loading",
    nameForTitle: "Loading",
    value: "",
    type: "string",
    description:
      "Indicates when the browser should load the iframe ('eager' or 'lazy').",
    options: ["eager", "lazy"],
  },
  {
    name: "name",
    nameForTitle: "Name",
    value: "",
    type: "string",
    description: "A targetable name for the embedded browsing context.",
  },
  {
    name: "referrerpolicy",
    nameForTitle: "Referrer Policy",
    value: "",
    type: "string",
    description:
      "Indicates which referrer to send when fetching the frame's resource.",
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
    name: "sandbox",
    nameForTitle: "Sandbox",
    value: "",
    type: "string",
    description:
      "Controls the restrictions applied to the content embedded in the <iframe>.",
    options: [
      "allow-downloads",
      "allow-forms",
      "allow-modals",
      "allow-orientation-lock",
      "allow-pointer-lock",
      "allow-popups",
      "allow-popups-to-escape-sandbox",
      "allow-presentation",
      "allow-same-origin",
      "allow-scripts",
      "allow-storage-access-by-user-activation",
      "allow-top-navigation",
      "allow-top-navigation-by-user-activation",
      "allow-top-navigation-to-custom-protocols",
    ],
  },
  {
    name: "src",
    nameForTitle: "Source",
    value: "",
    type: "string",
    description: "The URL of the page to embed.",
  },
  {
    name: "srcdoc",
    nameForTitle: "Source Document",
    value: "",
    type: "string",
    description:
      "Inline HTML to embed, overriding the src attribute. For example -> <iframe srcdoc=<p>Hello, world!</p>></iframe>",
  },
  {
    name: "width",
    nameForTitle: "Width",
    value: "",
    type: "string",
    description: "The width of the frame in CSS pixels.",
  },
];
const IMG_SPECIFIC_ATTRIBUTES = [
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
const INPUT_SPECIFIC_ATTRIBUTES = [
  {
    name: "accept",
    nameForTitle: "Accept",
    value: "",
    type: "string",
    description:
      "Specifies the types of files that the server accepts (only for type='file').",
    options: ACCEPT,
  },
  {
    name: "alt",
    nameForTitle: "Alt",
    value: "",
    type: "string",
    description:
      "Alternative text description of the image input (only for type='image').",
  },
  {
    name: "autocomplete",
    nameForTitle: "Autocomplete",
    value: "",
    type: "string",
    description:
      "Specifies whether the input field should have autocomplete enabled.",
    options: ["on", "off"],
  },
  {
    name: "autofocus",
    nameForTitle: "Autofocus",
    value: false,
    type: "boolean",
    description:
      "Specifies that the input field should automatically get focus when the page loads.",
  },
  {
    name: "checked",
    nameForTitle: "Checked",
    value: false,
    type: "boolean",
    description:
      "Specifies that a checkbox or radio button input should be pre-selected (only for type='checkbox' or 'radio').",
  },
  {
    name: "dirname",
    nameForTitle: "Dirname",
    value: "",
    type: "string",
    description: "Specifies the direction of text input for submission.",
    options: ["ltr", "rtl"],
  },
  {
    name: "disabled",
    nameForTitle: "Disabled",
    value: false,
    type: "boolean",
    description:
      "Specifies that the input field is disabled and cannot be edited or submitted.",
  },
  {
    name: "form",
    nameForTitle: "Form",
    value: "",
    type: "string",
    description:
      "Associates the input field with a specific form by ID, even if the input is not nested within the form element.",
  },
  {
    name: "formaction",
    nameForTitle: "Formaction",
    value: "",
    type: "string",
    description:
      "Specifies the URL for form submission (only for type='submit' or 'image').",
  },
  {
    name: "formenctype",
    nameForTitle: "Formenctype",
    value: "",
    type: "string",
    description:
      "Specifies how form data should be encoded before sending it to a server (only for type='submit' or 'image').",
    options: [
      "application/x-www-form-urlencoded",
      "multipart/form-data",
      "text/plain",
    ],
  },
  {
    name: "formmethod",
    nameForTitle: "Formmethod",
    value: "",
    type: "string",
    description:
      "Specifies the HTTP method for form submission (only for type='submit' or 'image').",
    options: ["get", "post"],
  },
  {
    name: "formnovalidate",
    nameForTitle: "Formnovalidate",
    value: false,
    type: "boolean",
    description:
      "Specifies that form data should not be validated upon submission (only for type='submit' or 'image').",
  },
  {
    name: "formtarget",
    nameForTitle: "Formtarget",
    value: "",
    type: "string",
    description:
      "Specifies where to display the response after form submission (only for type='submit' or 'image').",
    options: ["_self", "_blank", "_parent", "_top"],
  },
  {
    name: "height",
    nameForTitle: "Height",
    value: "",
    type: "string",
    description:
      "Specifies the height of the input field (only for type='image').",
  },
  {
    name: "list",
    nameForTitle: "List",
    value: "",
    type: "string",
    description:
      "Identifies a <datalist> element that provides predefined options to suggest to the user.",
  },
  {
    name: "max",
    nameForTitle: "Max",
    value: "",
    type: "string",
    description:
      "Specifies the maximum value allowed (only for type='number', 'range', 'date', 'month', 'week', 'time').",
  },
  {
    name: "maxlength",
    nameForTitle: "Maxlength",
    value: "",
    type: "number",
    description:
      "Specifies the maximum number of characters allowed in the input field.",
  },
  {
    name: "min",
    nameForTitle: "Min",
    value: "",
    type: "string",
    description:
      "Specifies the minimum value allowed (only for type='number', 'range', 'date', 'month', 'week', 'time').",
  },
  {
    name: "minlength",
    nameForTitle: "Minlength",
    value: "",
    type: "number",
    description:
      "Specifies the minimum number of characters allowed in the input field.",
  },
  {
    name: "multiple",
    nameForTitle: "Multiple",
    value: false,
    type: "boolean",
    description:
      "Specifies that multiple values can be entered in an input field (only for type='email' or 'file').",
  },
  {
    name: "name",
    nameForTitle: "Name",
    value: "",
    type: "string",
    description: "Specifies the name of the input field.",
  },
  {
    name: "pattern",
    nameForTitle: "Pattern",
    value: "",
    type: "string",
    description:
      "Specifies a regular expression pattern that the input field's value is checked against.",
  },
  {
    name: "placeholder",
    nameForTitle: "Placeholder",
    value: "",
    type: "string",
    description:
      "Specifies a short hint that describes the expected value of the input field.",
  },
  {
    name: "readonly",
    nameForTitle: "Readonly",
    value: false,
    type: "boolean",
    description:
      "Specifies that the input field is read-only and cannot be edited.",
  },
  {
    name: "required",
    nameForTitle: "Required",
    value: false,
    type: "boolean",
    description:
      "Specifies that the input field must be filled out before submitting the form.",
  },
  {
    name: "size",
    nameForTitle: "Size",
    value: "",
    type: "number",
    description:
      "Specifies the width of the input field in characters (only for type='text', 'search', 'tel', 'url').",
  },
  {
    name: "src",
    nameForTitle: "Src",
    value: "",
    type: "string",
    description:
      "Specifies the URL of an image to display (only for type='image').",
  },
  {
    name: "step",
    nameForTitle: "Step",
    value: "",
    type: "string",
    description:
      "Specifies the legal number intervals for an input field (only for type='number' or 'range').",
  },
  {
    name: "type",
    nameForTitle: "Type",
    value: "text",
    type: "string",
    description:
      "Specifies the type of input field (e.g., text, password, checkbox, radio, etc.).",
    options: [
      "button",
      "checkbox",
      "color",
      "date",
      "datetime-local",
      "email",
      "file",
      "hidden",
      "image",
      "month",
      "number",
      "password",
      "radio",
      "range",
      "reset",
      "search",
      "submit",
      "tel",
      "text",
      "time",
      "url",
      "week",
    ],
  },
  {
    name: "value",
    nameForTitle: "Value",
    value: "",
    type: "string",
    description: "Specifies the initial value of the input field.",
  },
  {
    name: "width",
    nameForTitle: "Width",
    value: "",
    type: "string",
    description:
      "Specifies the width of the input field (only for type='image').",
  },
  {
    name: "accept-charset",
    nameForTitle: "Accept-charset",
    value: "",
    type: "string",
    description:
      "Specifies the character encodings that are to be used for form submission.",
    options: ACCEPT_CHARSETS,
  },
  {
    name: "crossorigin",
    nameForTitle: "Crossorigin",
    value: "",
    type: "string",
    description:
      "Specifies how the element handles cross-origin requests (e.g., for images or scripts).",
    options: ["anonymous", "use-credentials"],
  },
  {
    name: "is",
    nameForTitle: "Is",
    value: "",
    type: "string",
    description:
      "Experimental: Specifies the custom element tag name to use for the input field.",
  },
  {
    name: "loading",
    nameForTitle: "Loading",
    value: "",
    type: "string",
    description:
      "Indicates when the browser should load the image specified in the src attribute.",
    options: ["eager", "lazy"],
  },
  {
    name: "nonce",
    nameForTitle: "Nonce",
    value: "",
    type: "string",
    description:
      "Specifies a cryptographic nonce used to declare script execution policies.",
  },
  {
    name: "referrerpolicy",
    nameForTitle: "Referrerpolicy",
    value: "",
    type: "string",
    description:
      "Specifies which referrer to send when fetching the image's resource.",
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
    name: "sizes",
    nameForTitle: "Sizes",
    value: "",
    type: "string",
    description:
      "Specifies the sizes of the images available for different viewport sizes.",
  },
  {
    name: "usemap",
    nameForTitle: "Usemap",
    value: "",
    type: "string",
    description:
      "Specifies an image map to use with the image input (only for type='image').",
  },
];
const LABEL_SPECIFIC_ATTRIBUTES = [
  {
    name: "for",
    nameForTitle: "For",
    value: "",
    type: "string",
    description: "Specifies which form element a label is bound to.",
  },
];
const LIST_SPECIFIC_ATTRIBUTES = [
  {
    name: "value",
    nameForTitle: "Value",
    value: "",
    type: "string",
    description: "Specifies the value of the list item.",
  },
];
const LINK_SPECIFIC_ATTRIBUTES = [
  REL_TYPE,
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
const MAP_SPECIFIC_ATTRIBUTES = [
  {
    name: "name",
    nameForTitle: "Name",
    value: "",
    type: "string",
    description: "Specifies the name of the image map.",
  },
];
const METER_SPECIFIC_ATTRIBUTES = [
  {
    name: "value",
    nameForTitle: "Value",
    value: "",
    type: "number",
    description: "Specifies the current value of the gauge.",
  },
  {
    name: "min",
    nameForTitle: "Min",
    value: "",
    type: "number",
    description: "Specifies the minimum value of the gauge.",
  },
  {
    name: "max",
    nameForTitle: "Max",
    value: "",
    type: "number",
    description: "Specifies the maximum value of the gauge.",
  },
  {
    name: "low",
    nameForTitle: "Low",
    value: "",
    type: "number",
    description: "Specifies the lower bound of the low range.",
  },
  {
    name: "high",
    nameForTitle: "High",
    value: "",
    type: "number",
    description: "Specifies the upper bound of the high range.",
  },
  {
    name: "optimum",
    nameForTitle: "Optimum",
    value: "",
    type: "number",
    description: "Specifies the optimum value of the gauge.",
  },
];
const ORDEREDLIST_SPECIFIC_ATTRIBUTES = [
  {
    name: "start",
    nameForTitle: "Start",
    value: "",
    type: "number",
    description: "Specifies the starting value of the list.",
  },
  {
    name: "type",
    nameForTitle: "Type",
    value: "1",
    type: "string",
    description: "Specifies the type of marker for the list items.",
    options: ["1", "A", "a", "I", "i"], // { numbers:"1", Uppercase:"A",Lowercase: "a",Uppercase_Roman_Numerals: "I",Lowercase_Roman_Numerals "i"}
  },
  {
    name: "reversed",
    nameForTitle: "Reversed",
    value: false,
    type: "boolean",
    description: "Specifies if the list should be displayed in reverse order.",
  },
];
const OPTGROUP_SPECIFIC_ATTRIBUTES = [
  {
    name: "disabled",
    nameForTitle: "Disabled",
    value: "",
    type: "boolean",
    description:
      "If true, the option group is disabled and cannot be interacted with.",
  },
  {
    name: "label",
    nameForTitle: "Label",
    value: "",
    type: "string",
    description: "Specifies a label for the option group.",
  },
];
const OPTION_SPECIFIC_ATTRIBUTES = [
  {
    name: "disabled",
    nameForTitle: "Disabled",
    value: false,
    type: "boolean",
    description: "Indicates whether the option is disabled or not.",
  },
  {
    name: "label",
    nameForTitle: "Label",
    value: "",
    type: "string",
    description: "Defines a label for the option element.",
  },
  {
    name: "selected",
    nameForTitle: "Selected",
    value: false,
    type: "boolean",
    description: "Indicates whether the option is selected by default or not.",
  },
  {
    name: "value",
    nameForTitle: "Value",
    value: "",
    type: "string",
    description:
      "Defines the value to be sent to the server when the form is submitted.",
  },
];
const OUTPUT_SPECIFIC_ATTRIBUTES = [
  {
    name: "for",
    nameForTitle: "For",
    value: "",
    type: "string",
    description:
      "Specifies the IDs of the elements whose values should be included in the output calculation.",
  },
  {
    name: "form",
    nameForTitle: "Form",
    value: "",
    type: "string",
    description:
      "Specifies the form ID that the output element is associated with.",
  },
  {
    name: "name",
    nameForTitle: "Name",
    value: "",
    type: "string",
    description: "Specifies a name for the output element.",
  },
];
const PROGRESS_SPECIFIC_ATTRIBUTES = [
  {
    name: "value",
    nameForTitle: "Value",
    value: "",
    type: "number",
    description: "Specifies the current value of the progress.",
  },
  {
    name: "max",
    nameForTitle: "Max",
    value: "",
    type: "number",
    description: "Specifies the maximum value of the progress.",
  },
];
const SELECT_SPECIFIC_ATTRIBUTES = [
  {
    name: "autocomplete",
    nameForTitle: "Autocomplete",
    value: "",
    type: "string",
    description:
      "Specifies whether a user agent should automatically complete the input value based on the user's input history.",
    options: ["on", "off"],
  },
  {
    name: "disabled",
    nameForTitle: "Disabled",
    value: "",
    type: "boolean",
    description: "Disables user interaction with the <select> element.",
  },
  {
    name: "form",
    nameForTitle: "Form",
    value: "",
    type: "string",
    description:
      "Specifies the <form> element that the <select> element is associated with.",
  },
  {
    name: "multiple",
    nameForTitle: "Multiple",
    value: "",
    type: "boolean",
    description: "Allows multiple options to be selected simultaneously.",
  },
  {
    name: "name",
    nameForTitle: "Name",
    value: "",
    type: "string",
    description: "Specifies the name of the <select> element.",
  },
  {
    name: "required",
    nameForTitle: "Required",
    value: "",
    type: "boolean",
    description:
      "Indicates that a selection must be made before the form can be submitted.",
  },
  {
    name: "size",
    nameForTitle: "Size",
    value: "",
    type: "number",
    description:
      "Specifies the number of visible options in the dropdown list.",
  },
];
const SLOT_SPECIFIC_ATTRIBUTES = [
  {
    name: "name",
    nameForTitle: "Name",
    value: "",
    type: "string",
    description: "Specifies the name of the slot.",
  },
];
const SOURCE_SPECIFIC_ATTRIBUTES = [
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
const TABLEDATA_SPECIFIC_ATTRIBUTES = [
  {
    name: "colspan",
    nameForTitle: "Column Span",
    value: "",
    type: "number",
    description: "Specifies the number of columns a table cell should span.",
  },
  {
    name: "rowspan",
    nameForTitle: "Row Span",
    value: "",
    type: "number",
    description: "Specifies the number of rows a table cell should span.",
  },
  {
    // space separated list
    name: "headers",
    nameForTitle: "Headers",
    value: "",
    type: "string",
    description:
      "Specifies one or more header cells a table cell is related to.",
  },
];
const TEMPLATE_SPECIFIC_ATTRIBUTES = [
  {
    name: "shadowrootmode",
    nameForTitle: "Shadow Root Mode",
    value: "",
    type: "string",
    description:
      "Specifies the mode of the shadow root created by the parent element.",
    options: ["open", "closed"],
  },
];
const TEXTAREA_SPECIFIC_ATTRIBUTES = [
  {
    name: "autocomplete",
    nameForTitle: "Autocomplete",
    value: "",
    type: "string",
    description:
      "Specifies whether the textarea should have autocomplete enabled.",
    options: ["on", "off"],
  },
  {
    name: "cols",
    nameForTitle: "Columns",
    value: "",
    type: "integer",
    description:
      "Specifies the visible width of the textarea, in average character widths.",
  },
  {
    name: "disabled",
    nameForTitle: "Disabled",
    value: "",
    type: "boolean",
    description:
      "Specifies that the textarea should be disabled and cannot be interacted with.",
  },
  {
    name: "form",
    nameForTitle: "Form",
    value: "",
    type: "string",
    description:
      "Specifies the form that the textarea belongs to, using the form's ID.",
  },
  {
    name: "maxlength",
    nameForTitle: "Max Length",
    value: "",
    type: "integer",
    description:
      "Specifies the maximum number of characters allowed in the textarea.",
    options: [],
  },
  {
    name: "minlength",
    nameForTitle: "Min Length",
    value: "",
    type: "integer",
    description:
      "Specifies the minimum number of characters required in the textarea.",
    options: [],
  },
  {
    name: "placeholder",
    nameForTitle: "Placeholder",
    value: "",
    type: "string",
    description:
      "Specifies a short hint that describes the expected value of the textarea.",
    options: [],
  },
  {
    name: "readonly",
    nameForTitle: "Read-only",
    value: "",
    type: "boolean",
    description:
      "Specifies that the textarea is read-only and cannot be edited.",
    options: [],
  },
  {
    name: "required",
    nameForTitle: "Required",
    value: "",
    type: "boolean",
    description:
      "Specifies that the textarea must be filled out before submitting the form.",
    options: [],
  },
  {
    name: "rows",
    nameForTitle: "Rows",
    value: "",
    type: "integer",
    description:
      "Specifies the visible height of the textarea, in lines of text.",
    options: [],
  },
  {
    name: "wrap",
    nameForTitle: "Wrap",
    value: "",
    type: "string",
    description:
      "Specifies how the text in the textarea is to be wrapped when submitted in a form.",
    options: ["soft", "hard"],
  },
];
const TABLEHEADER_SPECIFIC_ATTRIBUTES = [
  {
    name: "abbr",
    nameForTitle: "Abbreviation",
    value: "",
    type: "string",
    description: "Specifies an abbreviated version of the cell's content.",
  },
  {
    name: "colspan",
    nameForTitle: "Column Span",
    value: "",
    type: "number",
    description: "Specifies the number of columns that the cell should span.",
  },
  {
    name: "rowspan",
    nameForTitle: "Row Span",
    value: "",
    type: "number",
    description: "Specifies the number of rows that the cell should span.",
  },
  {
    name: "headers",
    nameForTitle: "Header Cells",
    value: "",
    type: "string",
    description:
      "Space-separated list of header cells IDs that the cell is related to.",
  },
  {
    name: "scope",
    nameForTitle: "Scope",
    value: "",
    type: "string",
    description:
      "Specifies the set of data cells for which the current header cell provides header information.",
    options: ["row", "col", "rowgroup", "colgroup"],
  },
];
const TIME_SPECIFIC_ATTRIBUTES = [
  {
    name: "datetime",
    nameForTitle: "Datetime",
    value: "",
    type: "string",
    description: "Specifies the date and time. This attribute is mandatory.",
  },
];
const TRACK_SPECIFIC_ATTRIBUTES = [
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
const VIDEO_SPECIFIC_ATTRIBUTES = [
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

export const ELEMENT_SPECIFIC_ATTRIBUTES: { [key: string]: Attribute[] } = {
  a: [...SHARED_ATTRIBUTES],
  area: [...SHARED_ATTRIBUTES, ...AREA_SPECIFIC_ATTRIBUTES],
  audio: [...AUDIO_SPECIFIC_ATTRIBUTES],
  base: [...BASE_SPECIFIC_ATTRIBUTES],
  blockquote: [...BLOCKQUOTE_SPECIFIC_ATTRIBUTES],
  button: [...BUTTON_SPECIFIC_ATTRIBUTES],
  canvas: [...CANVAS_SPECIFIC_ATTRIBUTES],
  col: [...COL_SPECIFIC_ATTRIBUTES],
  colgroup: [...COL_SPECIFIC_ATTRIBUTES],
  data: [...DATA_SPECIFIC_ATTRIBUTES],
  del: [...DEL_SPECIFIC_ATTRIBUTES],
  details: [...DETAILS_SPECIFIC_ATTRIBUTES],
  dialog: [...DIALOG_SPECIFIC_ATTRIBUTES],
  embed: [...EMBED_SPECIFIC_ATTRIBUTES],
  fieldset: [...FIELDSET_SPECIFIC_ATTRIBUTES],
  iframe: [...IFRAME_SPECIFIC_ATTRIBUTES],
  img: [...IMG_SPECIFIC_ATTRIBUTES],
  input: [...INPUT_SPECIFIC_ATTRIBUTES],
  ins: [...DEL_SPECIFIC_ATTRIBUTES],
  label: [...LABEL_SPECIFIC_ATTRIBUTES],
  li: [...LIST_SPECIFIC_ATTRIBUTES],
  link: [...LINK_SPECIFIC_ATTRIBUTES],
  map: [...MAP_SPECIFIC_ATTRIBUTES],
  meter: [...METER_SPECIFIC_ATTRIBUTES],
  ol: [...ORDEREDLIST_SPECIFIC_ATTRIBUTES],
  optgroup: [...OPTGROUP_SPECIFIC_ATTRIBUTES],
  option: [...OPTION_SPECIFIC_ATTRIBUTES],
  output: [...OUTPUT_SPECIFIC_ATTRIBUTES],
  progress: [...PROGRESS_SPECIFIC_ATTRIBUTES],
  q: [...BLOCKQUOTE_SPECIFIC_ATTRIBUTES],
  select: [...SELECT_SPECIFIC_ATTRIBUTES],
  slot: [...SLOT_SPECIFIC_ATTRIBUTES],
  source: [...SOURCE_SPECIFIC_ATTRIBUTES],
  td: [...TABLEDATA_SPECIFIC_ATTRIBUTES],
  template: [...TEMPLATE_SPECIFIC_ATTRIBUTES],
  textarea: [...TEXTAREA_SPECIFIC_ATTRIBUTES],
  th: [...TABLEHEADER_SPECIFIC_ATTRIBUTES],
  time: [...TIME_SPECIFIC_ATTRIBUTES],
  track: [...TRACK_SPECIFIC_ATTRIBUTES],
  video: [...VIDEO_SPECIFIC_ATTRIBUTES],
};
