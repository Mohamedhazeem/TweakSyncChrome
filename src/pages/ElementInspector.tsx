import AttributeFactory from "@/components/attributes/AttributeFactory";
import TextContent from "@/components/attributes/attributeComponents/TextContent";
import { AddAttribute } from "@/components/attributes/attributeFacade";
import { Button } from "@/components/ui/button";
import { Attribute } from "@/types/attributeTypes";
import { OutletContext } from "../types/OutletContext";
import { ELEMENT_SPECIFIC_ATTRIBUTES } from "@/utils/attributes/elementSpecificAttributes";
import { GLOBAL_ATTRIBUTES } from "@/utils/attributes/globalAttributes";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
const NotFoundInspector = lazy(() => import("./NotFoundInspector"));

function ElementInspector() {
  const { element } = useOutletContext<OutletContext>();
  const [attributes, setAttributes] = useState<Attribute[] | undefined>(undefined);
  const scrollableContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!element) return;
    const elementAttributes: Attribute[] = [];
    const dataAttributes: { [key: string]: string | number } = {};

    GLOBAL_ATTRIBUTES.forEach((attr) => {
      if (element.attributes) {
        Object.entries(element.attributes).forEach(([name]) => {
          if (name === attr.name) {
            elementAttributes.push({
              ...attr,
              value: element.attributes![attr.name] || "",
            });
          }
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
        nameForTitle: "Data",
        type: "object",
        description: "Custom data attributes",
        value: dataAttributes,
      });
    }

    const specificAttributes = ELEMENT_SPECIFIC_ATTRIBUTES[element.tagName!.toLowerCase()];
    specificAttributes?.forEach((attr) => {
      if (element.attributes![attr.name]) {
        elementAttributes.push({
          ...attr,
          value: element.attributes![attr.name] || "",
        });
      }
    });
    setAttributes(elementAttributes);
    setTimeout(() => {
      if (scrollableContainerRef.current) {
        scrollableContainerRef.current.scrollTop = 0; // Scroll to top
      }
    }, 50);
  }, [element]);

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
  const addAttribute = (newAttributeName: string) => {
    chrome.runtime.sendMessage({
      action: "updateAttributes",
      name: newAttributeName,
      // value: newValue,
    });
  };
  const removeAttribute = (attributeToRemoveName: string) => {
    setAttributes((prevAttributes) => {
      if (!prevAttributes) return [];

      const updatedAttributes = prevAttributes.filter(
        (attr) => attr.name !== attributeToRemoveName
      );

      // Example: Sending message to background script in Chrome extension
      const removedAttribute = prevAttributes.find((attr) => attr.name === attributeToRemoveName);
      if (removedAttribute) {
        chrome.runtime.sendMessage({
          action: "updateAttributes",
          name: removedAttribute.name,
          value: "",
        });
      }

      return updatedAttributes;
    });
  };
  function applyElement() {
    chrome.runtime.sendMessage({ action: "apply", apply: "element" });
  }
  const hasTweakSyncId = attributes?.some((attr) => {
    if (attr.name === "data-*") {
      // Check if any of the data-* attributes include the `data-tweaksync-id`
      return Object.keys(attr.value).includes("data-tweaksync-id");
    }
    return attr.name === "data-tweaksync-id";
  });

  if (!element) {
    return (
      <Suspense fallback={<div>Loading Inspector...</div>}>
        <NotFoundInspector inspectorName="Element Inspector" />
      </Suspense>
    );
  }
  return (
    <div className="inspector-container">
      <div ref={scrollableContainerRef} className="inspector-scroll">
        <div className="inspector-component">
          <div className="inspector-header">
            <span className="inspector-title">Element Inspector</span>
            {hasTweakSyncId && (
              <Button
                size={"default"}
                variant={"default"}
                type="button"
                id="applyElement"
                onClick={applyElement}
                className="inspector-applyButton hover:bg-[#fbf6f6]"
              >
                Apply
              </Button>
            )}
          </div>
          <TextContent tag={element} />
          {attributes?.length ? (
            attributes.map((attribute, index) => (
              <div key={attribute.name}>
                <AttributeFactory
                  index={index}
                  attribute={attribute}
                  onChange={handleAttributeChange}
                  onRemove={removeAttribute}
                />
              </div>
            ))
          ) : (
            <div>No attributes available</div>
          )}

          <AddAttribute
            selectedAttributeName={element.tagName!}
            setAttributes={setAttributes}
            addAttribute={addAttribute}
          />
        </div>
      </div>
    </div>
  );
}

export default ElementInspector;
