import PTag from "@/components/P_Tag";
import AttributeFactory from "@/components/attributes/AttributeFactory";
import { OutletContext } from "@/types/OutletContext";
import { Attribute } from "@/types/attributeTypes";
import { GLOBAL_ATTRIBUTES } from "@/utils/globalAttributes";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function ElementInspector() {
  const { element } = useOutletContext<OutletContext>();
  const [attributes, setAttributes] = useState<Attribute[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (!element) return;
    const elementAttributes: Attribute[] = [];

    // Extract common attributes
    GLOBAL_ATTRIBUTES.forEach((attr) => {
      if (element.attributes && element.attributes[attr.name]) {
        elementAttributes.push({
          ...attr,
          value: element.attributes[attr.name] || "",
        });
      }
    });

    // Extract specific attributes
    // const specificAttributes = ELEMENT_SPECIFIC_ATTRIBUTES[element.tagName.toLowerCase()];
    // specificAttributes?.forEach(attr => {
    //   if (element.hasAttribute(attr.name)) {
    //     elementAttributes.push({ ...attr, value: element.getAttribute(attr.name) || '' });
    //   }
    // });

    setAttributes(elementAttributes);
  }, [element]);
  const handleAttributeChange = () => {
    //name: string, value: string | boolean
    // element.setAttribute(name, value as string);
    // setAttributes(attributes.map(attr => attr.name === name ? { ...attr, value } : attr));
  };
  if (!element) {
    return <div> Not element selected</div>;
  }
  return (
    <div className="w-full h-[calc(100vh-65px)] flex items-center justify-center">
      <div className="flex flex-col space-y-4 overflow-y-auto h-full w-full p-4">
        <PTag tag={element} />
        {attributes?.length ? (
          attributes.map((attribute, index) => (
            <AttributeFactory
              key={index}
              attribute={attribute}
              onChange={handleAttributeChange}
            />
            // <div key={index}>
            //   <h3>{attribute.name}</h3>
            //   <p>{attribute.description}</p>
            //   <p>
            //     {typeof attribute.value === "boolean"
            //       ? attribute.value.toString()
            //       : attribute.value}
            //   </p>
            //   {attribute.options && (
            //     <p>Options: {attribute.options.join(", ")}</p>
            //   )}
            // </div>
          ))
        ) : (
          <div>No attributes available</div>
        )}
      </div>
    </div>
  );
}

export default ElementInspector;
