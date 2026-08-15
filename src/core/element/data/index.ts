// Thin accessor over the per-element attribute segments (O(1) lookup by tag name).
import type { Attribute } from "@/types/attributeTypes";
import { SHARED_ATTRIBUTES } from "./shared";
import { AREA_SPECIFIC_ATTRIBUTES } from "./area";
import { AUDIO_SPECIFIC_ATTRIBUTES } from "./audio";
import { BASE_SPECIFIC_ATTRIBUTES } from "./base";
import { BLOCKQUOTE_SPECIFIC_ATTRIBUTES } from "./blockquote";
import { BUTTON_SPECIFIC_ATTRIBUTES } from "./button";
import { CANVAS_SPECIFIC_ATTRIBUTES } from "./canvas";
import { COL_SPECIFIC_ATTRIBUTES } from "./col";
import { DATA_SPECIFIC_ATTRIBUTES } from "./data";
import { DEL_SPECIFIC_ATTRIBUTES } from "./del";
import { DETAILS_SPECIFIC_ATTRIBUTES } from "./details";
import { DIALOG_SPECIFIC_ATTRIBUTES } from "./dialog";
import { EMBED_SPECIFIC_ATTRIBUTES } from "./embed";
import { FIELDSET_SPECIFIC_ATTRIBUTES } from "./fieldset";
import { FORM_SPECIFIC_ATTRIBUTES } from "./form";
import { IFRAME_SPECIFIC_ATTRIBUTES } from "./iframe";
import { IMG_SPECIFIC_ATTRIBUTES } from "./img";
import { INPUT_SPECIFIC_ATTRIBUTES } from "./input";
import { LABEL_SPECIFIC_ATTRIBUTES } from "./label";
import { LIST_SPECIFIC_ATTRIBUTES } from "./list";
import { LINK_SPECIFIC_ATTRIBUTES } from "./link";
import { MAP_SPECIFIC_ATTRIBUTES } from "./map";
import { METER_SPECIFIC_ATTRIBUTES } from "./meter";
import { ORDEREDLIST_SPECIFIC_ATTRIBUTES } from "./orderedlist";
import { OPTGROUP_SPECIFIC_ATTRIBUTES } from "./optgroup";
import { OPTION_SPECIFIC_ATTRIBUTES } from "./option";
import { OUTPUT_SPECIFIC_ATTRIBUTES } from "./output";
import { PROGRESS_SPECIFIC_ATTRIBUTES } from "./progress";
import { SELECT_SPECIFIC_ATTRIBUTES } from "./select";
import { SLOT_SPECIFIC_ATTRIBUTES } from "./slot";
import { SOURCE_SPECIFIC_ATTRIBUTES } from "./source";
import { TABLEDATA_SPECIFIC_ATTRIBUTES } from "./tabledata";
import { TEMPLATE_SPECIFIC_ATTRIBUTES } from "./template";
import { TEXTAREA_SPECIFIC_ATTRIBUTES } from "./textarea";
import { TABLEHEADER_SPECIFIC_ATTRIBUTES } from "./tableheader";
import { TIME_SPECIFIC_ATTRIBUTES } from "./time";
import { TRACK_SPECIFIC_ATTRIBUTES } from "./track";
import { VIDEO_SPECIFIC_ATTRIBUTES } from "./video";

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

const ELEMENT_ATTRIBUTE_INDEX = new Map<string, Attribute[]>(
  Object.entries(ELEMENT_SPECIFIC_ATTRIBUTES)
);

/** O(1) lookup of the attributes supported by a tag name. */
export function getElementSpecificAttributes(tagName: string): Attribute[] | undefined {
  return ELEMENT_ATTRIBUTE_INDEX.get(tagName.toLowerCase());
}

export { SHARED_ATTRIBUTES };
export { AREA_SPECIFIC_ATTRIBUTES };
export { AUDIO_SPECIFIC_ATTRIBUTES };
export { BASE_SPECIFIC_ATTRIBUTES };
export { BLOCKQUOTE_SPECIFIC_ATTRIBUTES };
export { BUTTON_SPECIFIC_ATTRIBUTES };
export { CANVAS_SPECIFIC_ATTRIBUTES };
export { COL_SPECIFIC_ATTRIBUTES };
export { DATA_SPECIFIC_ATTRIBUTES };
export { DEL_SPECIFIC_ATTRIBUTES };
export { DETAILS_SPECIFIC_ATTRIBUTES };
export { DIALOG_SPECIFIC_ATTRIBUTES };
export { EMBED_SPECIFIC_ATTRIBUTES };
export { FIELDSET_SPECIFIC_ATTRIBUTES };
export { FORM_SPECIFIC_ATTRIBUTES };
export { IFRAME_SPECIFIC_ATTRIBUTES };
export { IMG_SPECIFIC_ATTRIBUTES };
export { INPUT_SPECIFIC_ATTRIBUTES };
export { LABEL_SPECIFIC_ATTRIBUTES };
export { LIST_SPECIFIC_ATTRIBUTES };
export { LINK_SPECIFIC_ATTRIBUTES };
export { MAP_SPECIFIC_ATTRIBUTES };
export { METER_SPECIFIC_ATTRIBUTES };
export { ORDEREDLIST_SPECIFIC_ATTRIBUTES };
export { OPTGROUP_SPECIFIC_ATTRIBUTES };
export { OPTION_SPECIFIC_ATTRIBUTES };
export { OUTPUT_SPECIFIC_ATTRIBUTES };
export { PROGRESS_SPECIFIC_ATTRIBUTES };
export { SELECT_SPECIFIC_ATTRIBUTES };
export { SLOT_SPECIFIC_ATTRIBUTES };
export { SOURCE_SPECIFIC_ATTRIBUTES };
export { TABLEDATA_SPECIFIC_ATTRIBUTES };
export { TEMPLATE_SPECIFIC_ATTRIBUTES };
export { TEXTAREA_SPECIFIC_ATTRIBUTES };
export { TABLEHEADER_SPECIFIC_ATTRIBUTES };
export { TIME_SPECIFIC_ATTRIBUTES };
export { TRACK_SPECIFIC_ATTRIBUTES };
export { VIDEO_SPECIFIC_ATTRIBUTES };
