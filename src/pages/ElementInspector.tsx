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
  useEffect(() => {
    if (!element) return;
    const elementAttributes: Attribute[] = [];
    const dataAttributes: { [key: string]: string } = {};
    GLOBAL_ATTRIBUTES.forEach((attr) => {
      if (element.attributes && element.attributes[attr.name]) {
        elementAttributes.push({
          ...attr,
          value: element.attributes[attr.name] || "",
        });
      }
    });

    if (element.attributes) {
      Object.entries(element.attributes).forEach(([name, value]) => {
        if (name.startsWith("data-")) {
          dataAttributes[name] = value;
        }
      });
    }

    if (Object.keys(dataAttributes).length > 0) {
      elementAttributes.push({
        name: "data-*",
        type: "object",
        description: "Custom data attributes",
        value: dataAttributes,
      });
    }

    setAttributes(elementAttributes);
    //setDataAttributes(dataAttr);
  }, [element]);

  // const handleAttributeChange = (index: number, newValue: string | object) => {
  //   setAttributes((prevAttributes) =>
  //     prevAttributes?.map((attr, idx) =>
  //       idx === index ? { ...attr, value: newValue } : attr
  //     )
  //   );
  //   if (attributes) {
  //     const updatedAttribute = attributes[index];
  //     if (updatedAttribute) {
  //       chrome.runtime.sendMessage({
  //         action: "updateAttributes",
  //         name: updatedAttribute.name,
  //         value: newValue,
  //       });
  //     }
  //   }
  // };
  const handleAttributeChange = (index: number, newValue: string | object) => {
    setAttributes((prevAttributes) => {
      if (!prevAttributes) return prevAttributes;

      const updatedAttributes = prevAttributes.map((attr, idx) => {
        if (idx === index) {
          if (typeof newValue === "object" && !Array.isArray(newValue)) {
            // Update data-* attributes
            if (typeof attr.value === "object" && !Array.isArray(attr.value)) {
              return { ...attr, value: { ...attr.value, ...newValue } };
            } else {
              // Handle case where attr.value is not an object (e.g., string, boolean, number)
              return { ...attr, value: newValue };
            }
          } else {
            // Update normal attributes
            return { ...attr, value: newValue };
          }
        }
        return attr;
      });

      return updatedAttributes;
    });

    // Example: Sending message to background script in Chrome extension
    if (Array.isArray(attributes) && attributes[index]) {
      const updatedAttribute = attributes[index];
      chrome.runtime.sendMessage({
        action: "updateAttributes",
        name: updatedAttribute.name,
        value: newValue,
      });
    }
  };
  if (!element) {
    return <div> Not element selected</div>;
  }
  return (
    <div className="w-full h-[calc(100vh-65px)] flex items-center justify-center">
      <div className="flex flex-col space-y-4 overflow-y-auto h-full w-full p-4">
        {attributes?.map((attribute) => {
          return <div>{`${attribute.name} and  ${attribute.value} `}</div>;
        })}
        <PTag tag={element} />
        {attributes?.length ? (
          attributes.map((attribute, index) => (
            <div>
              {`${attribute.name} and  ${index} `}
              <AttributeFactory
                key={index}
                index={index}
                attribute={attribute}
                onChange={handleAttributeChange}
              />
            </div>
          ))
        ) : (
          <div>No attributes available</div>
        )}
      </div>
    </div>
  );
}

export default ElementInspector;
