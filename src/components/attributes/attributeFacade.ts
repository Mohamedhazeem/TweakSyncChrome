export { default as AttributeLayout } from "./AttributeLayout";
export { default as AddAttribute } from "./attributeComponents/AddAttribute";
import ClassAttribute from "./attributeComponents/ClassAttribute";
import DataAttribute from "./attributeComponents/DataAttribute";
import OptionsAttribute from "./attributeComponents/OptionsAttribute";
import StringAttribute from "./attributeComponents/StringAttribute";
import NumberAttribute from "./attributeComponents/NumberAttribute";
import OptionsObjectAttribute from "./attributeComponents/OptionsObjectAttribute";
import AccessKeyAttribute from "./attributeComponents/AccessKeyAttribute";
import MultiOptionsAttribute from "./attributeComponents/MultiOptionsAttributes";
import { ATTRIBUTE_ENUMS } from "@/types/attributeTypes";

// not add boolean attributes beacuse it only on attribute layout

const ARIA_ATTRIBUTES: { [key: string]: React.ComponentType } = {
  "aria-activedescendant": StringAttribute,
  // aria-atomic: boolean,
  "aria-autocomplete": OptionsAttribute,
  //"aria-busy": boolean,
  "aria-checked": OptionsAttribute,
  "aria-colcount": NumberAttribute,
  "aria-colindex": NumberAttribute,
  "aria-colspan": NumberAttribute,
  "aria-controls": StringAttribute,
  "aria-current": OptionsAttribute,
  "aria-describedby": StringAttribute,
  "aria-details": StringAttribute,
  //"aria-disabled": boolean,
  "aria-dropeffect": OptionsAttribute,
  "aria-errormessage": StringAttribute,
  //"aria-expanded": boolean,
  "aria-flowto": StringAttribute,
  //"aria-grabbed": boolean,
  "aria-haspopup": OptionsAttribute,
  //"aria-hidden": boolean,
  "aria-invalid": OptionsAttribute,
  "aria-keyshortcuts": StringAttribute,
  "aria-label": StringAttribute,
  "aria-labelledby": StringAttribute,
  "aria-level": NumberAttribute,
  "aria-live": OptionsAttribute,
  //"aria-modal": boolean,
  //"aria-multiline": boolean,
  //"aria-multiselectable": boolean,
  "aria-orientation": OptionsAttribute,
  "aria-owns": StringAttribute,
  "aria-placeholder": StringAttribute,
  "aria-posinset": NumberAttribute,
  "aria-pressed": OptionsAttribute,
  //"aria-readonly": boolean,
  "aria-relevant": OptionsAttribute,
  //"aria-required": boolean,
  "aria-roledescription": StringAttribute,
  "aria-rowcount": NumberAttribute,
  "aria-rowindex": NumberAttribute,
  "aria-rowspan": NumberAttribute,
  //"aria-selected": boolean,
  "aria-setsize": NumberAttribute,
  "aria-sort": OptionsAttribute,
  "aria-valuemax": NumberAttribute,
  "aria-valuemin": NumberAttribute,
  "aria-valuenow": NumberAttribute,
  "aria-valuetext": StringAttribute,
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ELEMENT_SPECIFIC_ATTRIBUTES: { [key: string]: React.ComponentType<any> } = {
  href: StringAttribute,
  target: OptionsAttribute,
  rel: MultiOptionsAttribute,
  rev: MultiOptionsAttribute,
  download: StringAttribute,
  hreflang: OptionsObjectAttribute,
  type: OptionsAttribute,
  referrerpolicy: OptionsAttribute,
  ping: StringAttribute,
  alt: StringAttribute,
  shape: OptionsAttribute,
  coords: StringAttribute,
  controlslist: MultiOptionsAttribute,
  crossorigin: OptionsAttribute,
  preload: OptionsAttribute,
  src: StringAttribute, // need to update check url like that
  cite: StringAttribute, // need to check
  form: StringAttribute,
  formaction: StringAttribute,
  formenctype: OptionsAttribute,
  formmethod: OptionsAttribute,
  formtarget: OptionsAttribute,
  name: StringAttribute,
  value: StringAttribute,
  height: StringAttribute,
  width: StringAttribute,
  span: NumberAttribute,
  datetime: StringAttribute, // datetime attribute
  "accept-charset": OptionsAttribute,
  action: StringAttribute,
  autocomplete: OptionsAttribute,
  enctype: OptionsAttribute,
  method: OptionsAttribute,
  allow: MultiOptionsAttribute,
  csp: StringAttribute, // need to update on future
  loading: OptionsAttribute,
  sandbox: MultiOptionsAttribute,
  srcdoc: StringAttribute, // need to update on future
  srcset: StringAttribute, // need to update on future (width/pixels)
  sizes: StringAttribute, // need to update on future
  usemap: StringAttribute, // need to update on future (suuport name of the map) #mapname
  decoding: OptionsAttribute,
  fetchpriority: OptionsAttribute,
  accept: MultiOptionsAttribute,
  dirname: OptionsAttribute,
  list: StringAttribute,
  max: StringAttribute,
  min: StringAttribute,
  minlength: NumberAttribute,
  maxlength: NumberAttribute,
  low: NumberAttribute,
  high: NumberAttribute,
  optimum: NumberAttribute,
  pattern: StringAttribute, // need to update (type="text" type="email" type="password" type="search" type="tel" (telephone number) type="url" (URL))
  placeholder: StringAttribute,
  size: NumberAttribute,
  step: StringAttribute, // need to update. The step attribute in HTML is used with <input> elements of type number, range, date, datetime-local, month, time, and week.
  is: StringAttribute,
  nonce: StringAttribute,
  for: StringAttribute,
  media: StringAttribute, // need to update o future
  as: OptionsAttribute,
  integrity: StringAttribute, // need to update /research
  charset: OptionsAttribute,
  start: NumberAttribute,
  label: StringAttribute,
  colspan: NumberAttribute,
  rowspan: NumberAttribute,
  headers: ClassAttribute,
  shadowrootmode: OptionsAttribute,
  cols: NumberAttribute,
  rows: NumberAttribute,
  wrap: OptionsAttribute,
  abbr: StringAttribute,
  scope: OptionsAttribute,
  kind: OptionsAttribute,
  srclang: OptionsAttribute,
  poster: StringAttribute,
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const attributeComponents: { [key: string]: React.ComponentType<any> } = {
  ...ARIA_ATTRIBUTES,
  ...ELEMENT_SPECIFIC_ATTRIBUTES,
  accesskey: AccessKeyAttribute,
  autocapitalize: OptionsAttribute,
  class: () => ClassAttribute(ATTRIBUTE_ENUMS.class),
  dir: OptionsAttribute,
  enterkeyhint: OptionsAttribute,
  exportparts: ClassAttribute,
  id: () => ClassAttribute(ATTRIBUTE_ENUMS.id),
  inputmode: OptionsAttribute,
  lang: OptionsObjectAttribute,
  part: ClassAttribute,
  popover: OptionsAttribute,
  tabindex: OptionsObjectAttribute,
  role: OptionsAttribute,
  title: StringAttribute,
  translate: OptionsAttribute,
};
export const patternComponents: { [key: string]: React.ComponentType } = {
  "data-*": DataAttribute,
};
