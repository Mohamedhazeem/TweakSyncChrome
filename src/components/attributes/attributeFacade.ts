export { default as AttributeLayout } from "./AttributeLayout";
import ClassAttribute from "./attributeComponents/ClassAttribute";
import DataAttribute from "./attributeComponents/DataAttribute";
import OptionsAttribute from "./attributeComponents/OptionsAttribute";
import StringAttribute from "./attributeComponents/StringAttribute";
import LangAttribute from "./attributeComponents/LangAttribute";
// not add boolean attributes beacuse it only on attribute layout
export const attributeComponents: { [key: string]: React.ComponentType } = {
  accesskey: ClassAttribute, // need to be update
  autocapitalize: OptionsAttribute,
  class: ClassAttribute,
  dir: OptionsAttribute,
  enterkeyhint: OptionsAttribute,
  exportparts: ClassAttribute,
  id: ClassAttribute,
  inputmode: OptionsAttribute,
  lang: LangAttribute, // need to be update
  part: ClassAttribute,
  popover: OptionsAttribute,
  tabindex: OptionsAttribute, // need to be update
  role: OptionsAttribute,
  title: StringAttribute,
  translate: OptionsAttribute,
};
export const patternComponents: { [key: string]: React.ComponentType } = {
  "data-*": DataAttribute,
};
