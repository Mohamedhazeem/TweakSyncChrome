export { default as AttributeLayout } from "./AttributeLayout";
import ClassAttribute from "./attributeComponents/ClassAttribute";
import DataAttribute from "./attributeComponents/DataAttribute";
import OptionsAttribute from "./attributeComponents/OptionsAttribute";
import StringAttribute from "./attributeComponents/StringAttribute";
import OptionsObjectAttribute from "./attributeComponents/OptionsObjectAttribute";
import AccessKeyAttribute from "./attributeComponents/AccessKeyAttribute";
// not add boolean attributes beacuse it only on attribute layout
export const attributeComponents: { [key: string]: React.ComponentType } = {
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
