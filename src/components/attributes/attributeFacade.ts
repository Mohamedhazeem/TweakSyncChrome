export { default as AttributeLayout } from "./AttributeLayout";
export { default as AddAttribute } from "./attributeComponents/AddAttribute";
import ClassAttribute from "./attributeComponents/ClassAttribute";
import DataAttribute from "./attributeComponents/DataAttribute";
import OptionsAttribute from "./attributeComponents/OptionsAttribute";
import StringAttribute from "./attributeComponents/StringAttribute";
import OptionsObjectAttribute from "./attributeComponents/OptionsObjectAttribute";
import AccessKeyAttribute from "./attributeComponents/AccessKeyAttribute";
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
  target: StringAttribute,
  rel: StringAttribute,
  type: OptionsAttribute,
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
