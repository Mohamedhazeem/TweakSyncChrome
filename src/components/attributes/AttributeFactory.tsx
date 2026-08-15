import { IAttributeContext } from "@/types/attributeTypes";
import { AttributeLayout, attributeComponents, patternComponents } from "./attributeFacade";

function AttributeFactory({ attribute, index, onChange, onRemove }: IAttributeContext) {
  const SpecificComponent = attributeComponents[attribute.name];

  const AttributeComponent = SpecificComponent || matchAttribute(attribute.name, patternComponents);

  return (
    <>
      <AttributeLayout attribute={attribute} onChange={onChange!} onRemove={onRemove} index={index}>
        <AttributeComponent />
      </AttributeLayout>
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
