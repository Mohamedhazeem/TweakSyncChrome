import { Attribute } from "@/types/attributeTypes";
import AttributeLayout from "./AttributeLayout";
import ClassAttribute from "./attributeComponents/classAttribute";

interface IAttributeFactory {
  key: number;
  attribute: Attribute;
  onChange?: (index: number, value: string) => void;
}

function AttributeFactory({ key, attribute, onChange }: IAttributeFactory) {
  switch (attribute.name) {
    case "class":
      return (
        <AttributeLayout key={key} attribute={attribute} onChange={onChange!}>
          <div>Child component using attribute context</div>
          <ClassAttribute />
        </AttributeLayout>
      );
    default:
      return <div>INVALID ATTRIBUTE TYPE</div>;
  }
}

export default AttributeFactory;
