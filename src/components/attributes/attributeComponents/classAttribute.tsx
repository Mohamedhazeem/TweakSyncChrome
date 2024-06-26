import { IAttributeContext } from "@/types/attributeTypes";
function ClassAttribute({ key, attribute }: IAttributeContext) {
  if (!attribute) {
    return null;
  }

  return (
    <div key={key}>
      <h3>{attribute.name}</h3>
      <p>{attribute.description}</p>
      <p>
        {typeof attribute.value === "boolean"
          ? attribute.value.toString()
          : attribute.value}
      </p>
      {attribute.options && <p>Options: {attribute.options.join(", ")}</p>}
    </div>
  );
}

export default ClassAttribute;
