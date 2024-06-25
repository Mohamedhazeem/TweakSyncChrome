import { Attribute } from "@/types/attributeTypes";
import AttributeLayout from "./AttributeLayout";
import ClassAttribute from "./attributeComponents/classAttribute";

interface IAttributeFactory {
  key: number;
  attribute: Attribute;
  onChange?: (name: string, value: string | boolean) => void;
}

function AttributeFactory({ key, attribute }: IAttributeFactory) {
  switch (attribute.name) {
    case "class":
      return (
        <AttributeLayout key={key} attribute={attribute}>
          <div>Child component using attribute context</div>
          <ClassAttribute key={key} attribute={attribute} />
        </AttributeLayout>
      );
    default:
      return <div>INVALID ATTRIBUTE TYPE</div>;
  }
}

export default AttributeFactory;
