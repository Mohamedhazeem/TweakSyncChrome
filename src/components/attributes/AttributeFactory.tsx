import { Attribute } from "@/types/attributeTypes";
import AttributeLayout from "./AttributeLayout";
import ClassAttribute from "./attributeComponents/classAttribute";

interface IAttributeFactory {
  key: number;
  index: number;
  attribute: Attribute;
  onChange?: (index: number, value: string) => void;
}

function AttributeFactory({
  key,
  attribute,
  index,
  onChange,
}: IAttributeFactory) {
  switch (attribute.name) {
    case "class":
      return (
        <AttributeLayout
          key={key}
          attribute={attribute}
          onChange={onChange!}
          index={index}
        >
          <div>{attribute.name}</div>
          <div>Child component using attribute context</div>
          <ClassAttribute />
        </AttributeLayout>
      );
    case "role":
      return (
        <AttributeLayout
          key={key}
          attribute={attribute}
          onChange={onChange!}
          index={index}
        >
          <div>{attribute.name}</div>
          <div>Child component using attribute context</div>
          <ClassAttribute />
        </AttributeLayout>
      );
    default:
      return <div>{`invalid attribute ${attribute.name}`}</div>;
  }
}

export default AttributeFactory;
