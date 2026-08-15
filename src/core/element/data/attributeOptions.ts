// Shared attribute option vocabularies used by the element attribute segments.

export const ACCEPT_CHARSETS: string[] = [
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
export const ACCEPT = [
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
export const REL_OPTIONS = [
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
];
export const REL_REV_TYPE = [
  {
    name: "rel",
    nameForTitle: "Rel",
    value: "",
    type: "string",
    description:
      "Specifies the relationship between the current and linked document",
    options: REL_OPTIONS,
  },
  {
    name: "rev",
    nameForTitle: "Rev",
    value: "",
    type: "string",
    description:
      "Specifies the reverse relationship between the current and linked document",
    options: REL_OPTIONS,
  },
];
export const SHARED_MIME_TYPE = [
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
