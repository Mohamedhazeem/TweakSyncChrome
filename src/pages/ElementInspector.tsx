import PTag from "@/components/P_Tag";
import AttributeFactory from "@/components/attributes/AttributeFactory";
import { OutletContext } from "@/types/OutletContext";
import { Attribute } from "@/types/attributeTypes";
import { GLOBAL_ATTRIBUTES } from "@/utils/attributes/globalAttributes";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function ElementInspector() {
  const { element } = useOutletContext<OutletContext>();
  const [attributes, setAttributes] = useState<Attribute[] | undefined>(
    undefined
  );
  // const [attr, setAttribute] = useState<Attribute>(attribute);

  useEffect(() => {
    if (!element) return;
    const elementAttributes: Attribute[] = [];
    GLOBAL_ATTRIBUTES.forEach((attr) => {
      if (element.attributes && element.attributes[attr.name]) {
        elementAttributes.push({
          ...attr,
          value: element.attributes[attr.name] || "",
        });
      }
    });
    setAttributes(elementAttributes);
  }, [element]);

  const handleAttributeChange = (index: number, newValue: string) => {
    setAttributes((prevAttributes) =>
      prevAttributes?.map((attr, idx) =>
        idx === index ? { ...attr, value: newValue } : attr
      )
    );
    if (attributes) {
      const updatedAttribute = attributes[index];
      if (updatedAttribute) {
        chrome.runtime.sendMessage({
          action: "updateAttributes",
          name: updatedAttribute.name,
          value: newValue,
        });
      }
    }

    console.log(
      attributes?.map((attribute) => {
        attribute.value;
      })
    );
    // Here you can also add code to update the service worker or perform other actions
  };

  if (!element) {
    return <div> Not element selected</div>;
  }
  return (
    <div className="w-full h-[calc(100vh-65px)] flex items-center justify-center">
      <div className="flex flex-col space-y-4 overflow-y-auto h-full w-full p-4">
        {attributes?.map((attribute) => {
          return <div>{attribute.value}</div>;
        })}
        <PTag tag={element} />
        {attributes?.length ? (
          attributes.map((attribute, index) => (
            <AttributeFactory
              key={index}
              attribute={attribute}
              onChange={handleAttributeChange}
            />
          ))
        ) : (
          <div>No attributes available</div>
        )}
      </div>
    </div>
  );
}

export default ElementInspector;
