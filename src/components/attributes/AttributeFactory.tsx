import { IAttributeContext } from "@/types/attributeTypes";
import AttributeLayout from "./AttributeLayout";
import ClassAttribute from "./attributeComponents/classAttribute";
import DataAttribute from "./attributeComponents/dataAttribute";

function AttributeFactory({
  key,
  attribute,
  index,
  onChange,
}: IAttributeContext) {
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
    case "data-*":
      return (
        <AttributeLayout
          key={key}
          attribute={attribute}
          onChange={onChange!}
          index={index}
        >
          <div>{attribute.name}</div>
          <div>Child component using attribute context</div>
          <DataAttribute />
        </AttributeLayout>
      );
    default:
      return <div>{`invalid attribute ${attribute.name}`}</div>;
  }
}

export default AttributeFactory;
