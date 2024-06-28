import { IAttributeContext } from "@/types/attributeTypes";
import {
  AttributeLayout,
  ClassAttribute,
  DataAttribute,
} from "./attributeFacade";

function AttributeFactory({
  key,
  attribute,
  index,
  onChange,
}: IAttributeContext) {
  const attributeComponents: { [key: string]: React.ComponentType } = {
    class: ClassAttribute,
    role: ClassAttribute,
  };
  const patternComponents: { [key: string]: React.ComponentType } = {
    "data-*": DataAttribute,
  };
  const SpecificComponent = attributeComponents[attribute.name];

  const AttributeComponent =
    SpecificComponent || matchAttribute(attribute.name, patternComponents);

  return (
    <AttributeLayout
      key={key}
      attribute={attribute}
      onChange={onChange!}
      index={index}
    >
      <div>{attribute.name}</div>
      <AttributeComponent />
    </AttributeLayout>
  );
}

export default AttributeFactory;

const DefaultAttribute: React.FC = () => {
  return <div>Default Attribute Component</div>;
};
function matchAttribute(
  name: string,
  patterns: { [key: string]: React.ComponentType }
): React.ComponentType {
  for (const pattern in patterns) {
    const regex = new RegExp(`^${pattern.replace(/\*/g, ".*")}$`);
    if (regex.test(name)) {
      return patterns[pattern];
    }
  }
  return DefaultAttribute;
}
