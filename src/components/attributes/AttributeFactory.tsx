import { IAttributeContext } from "@/types/attributeTypes";
import {
  // AddAttribute,
  AttributeLayout,
  attributeComponents,
  patternComponents,
} from "./attributeFacade";

function AttributeFactory({
  key,
  attribute,
  index,
  onChange,
}: IAttributeContext) {
  const SpecificComponent = attributeComponents[attribute.name];

  const AttributeComponent =
    SpecificComponent || matchAttribute(attribute.name, patternComponents);

  return (
    <>
      <AttributeLayout
        key={key}
        attribute={attribute}
        onChange={onChange!}
        index={index}
      >
        <AttributeComponent />
      </AttributeLayout>
      {/* <AddAttribute /> */}
    </>
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
