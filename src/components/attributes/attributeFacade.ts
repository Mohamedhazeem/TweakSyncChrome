export { default as AttributeLayout } from "./AttributeLayout";
export { default as AddAttribute } from "./attributeComponents/AddAttribute";
import ClassAttribute from "./attributeComponents/ClassAttribute";
import DataAttribute from "./attributeComponents/DataAttribute";
import OptionsAttribute from "./attributeComponents/OptionsAttribute";
import StringAttribute from "./attributeComponents/StringAttribute";
import OptionsObjectAttribute from "./attributeComponents/OptionsObjectAttribute";
import AccessKeyAttribute from "./attributeComponents/AccessKeyAttribute";
import MultiOptionsAttribute from "./attributeComponents/MultiOptionsAttributes";
// not add boolean attributes beacuse it only on attribute layout

const ARIA_ATTRIBUTES: { [key: string]: React.ComponentType } = {
  "aria-activedescendant": StringAttribute,
  // aria-atomic: boolean,
  "aria-autocomplete": OptionsAttribute,
  //"aria-busy": boolean,
  "aria-checked": OptionsAttribute,
  "aria-colcount": StringAttribute, // number
  "aria-colindex": StringAttribute, //number
  "aria-colspan": StringAttribute, //number
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
  "aria-level": StringAttribute, //number
  "aria-live": OptionsAttribute,
  //"aria-modal": boolean,
  //"aria-multiline": boolean,
  //"aria-multiselectable": boolean,
  "aria-orientation": OptionsAttribute,
  "aria-owns": StringAttribute,
  "aria-placeholder": StringAttribute,
  "aria-posinset": StringAttribute, //number
  "aria-pressed": OptionsAttribute,
  //"aria-readonly": boolean,
  "aria-relevant": OptionsAttribute,
  //"aria-required": boolean,
  "aria-roledescription": StringAttribute,
  "aria-rowcount": StringAttribute, //number
  "aria-rowindex": StringAttribute, //number
  "aria-rowspan": StringAttribute, //number
  //"aria-selected": boolean,
  "aria-setsize": StringAttribute, //number
  "aria-sort": OptionsAttribute,
  "aria-valuemax": StringAttribute, //number
  "aria-valuemin": StringAttribute, //number
  "aria-valuenow": StringAttribute, //number
  "aria-valuetext": StringAttribute,
};
const ELEMENT_SPECIFIC_ATTRIBUTES: { [key: string]: React.ComponentType } = {
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
  volume: StringAttribute, //number
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
  span: StringAttribute, // number
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
  accept: MultiOptionsAttribute, // multiple options attribute with comma
  dirname: OptionsAttribute,
  list: StringAttribute,
  max: StringAttribute,
  min: StringAttribute,
  minlength: StringAttribute, // number
  maxlength: StringAttribute, // number
  low: StringAttribute, //number
  high: StringAttribute, //number
  optimum: StringAttribute, //number
  pattern: StringAttribute, // need to update (type="text" type="email" type="password" type="search" type="tel" (telephone number) type="url" (URL))
  placeholder: StringAttribute,
  size: StringAttribute, // number
  step: StringAttribute, // need to update. The step attribute in HTML is used with <input> elements of type number, range, date, datetime-local, month, time, and week.
  is: StringAttribute,
  nonce: StringAttribute,
  for: StringAttribute,
  media: StringAttribute, // need to update o future
  as: OptionsAttribute,
  integrity: StringAttribute, // need to update /research
  charset: OptionsAttribute,
  start: StringAttribute, // number
  label: StringAttribute,
  colspan: StringAttribute, //number
  rowspan: StringAttribute, //number
  headers: ClassAttribute,
  shadowrootmode: OptionsAttribute,
  cols: StringAttribute, //number
  rows: StringAttribute, //number
  wrap: OptionsAttribute,
  abbr: StringAttribute,
  scope: OptionsAttribute,
  kind: OptionsAttribute,
  srclang: OptionsAttribute,
  poster: StringAttribute,
};
export const attributeComponents: { [key: string]: React.ComponentType } = {
  ...ARIA_ATTRIBUTES,
  ...ELEMENT_SPECIFIC_ATTRIBUTES,
  accesskey: AccessKeyAttribute,
  autocapitalize: OptionsAttribute,
  class: ClassAttribute,
  dir: OptionsAttribute,
  enterkeyhint: OptionsAttribute,
  exportparts: ClassAttribute,
  id: ClassAttribute,
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
