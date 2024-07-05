// import ColorStyle from "@/components/ColorStyle";
// import { OutletContext } from "@/types/OutletContext";
// // import { useEffect, useState } from "react";
// import { useOutletContext } from "react-router-dom";

// function StyleInspector() {
//   const { style } = useOutletContext<OutletContext>();
//   if (!style) {
//     return <div> Not style selected</div>;
//   } else {
//     return (
//       <div className="w-full h-[calc(100vh-65px)] flex items-center justify-center">
//         <div className="flex flex-col space-y-4 overflow-y-auto h-full w-full p-4">
//           {style && (
//             <ColorStyle temporaryId={style.temporaryId} style={style} />
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// export default StyleInspector;
import { OutletContext } from "@/types/outletContext";

import { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";

function StyleInspector() {
  const { style } = useOutletContext<OutletContext>();
  // const [attributes, setAttributes] = useState<Attribute[] | undefined>(
  //   undefined
  // );
  const scrollableContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (scrollableContainerRef.current) {
        scrollableContainerRef.current.scrollTop = 0; // Scroll to top
      }
    }, 50);
  }, [style]);

  // const handleAttributeChange = (index: number, newValue: string | object) => {
  //   setAttributes((prevAttributes) => {
  //     if (!prevAttributes) return prevAttributes;

  //     const updatedAttributes = prevAttributes.map((attr, idx) => {
  //       if (idx === index) {
  //         if (typeof newValue === "object" && !Array.isArray(newValue)) {
  //           // Update data-* attributes
  //           if (typeof attr.value === "object" && !Array.isArray(attr.value)) {
  //             return { ...attr, value: { ...attr.value, ...newValue } };
  //           } else {
  //             // Handle case where attr.value is not an object (e.g., string, boolean, number)
  //             return { ...attr, value: newValue };
  //           }
  //         } else {
  //           // Update normal attributes
  //           return { ...attr, value: newValue };
  //         }
  //       }
  //       return attr;
  //     });

  //     return updatedAttributes;
  //   });

  //   // Example: Sending message to background script in Chrome extension
  //   if (Array.isArray(attributes) && attributes[index]) {
  //     const updatedAttribute = attributes[index];
  //     chrome.runtime.sendMessage({
  //       action: "updateAttributes",
  //       name: updatedAttribute.name,
  //       value: newValue,
  //     });
  //   }
  // };
  // const addAttribute = (newAttributeName: string) => {
  //   chrome.runtime.sendMessage({
  //     action: "updateAttributes",
  //     name: newAttributeName,
  //     // value: newValue,
  //   });
  // };
  // const removeAttribute = (attributeToRemoveName: string) => {
  //   setAttributes((prevAttributes) => {
  //     if (!prevAttributes) return [];

  //     const updatedAttributes = prevAttributes.filter(
  //       (attr) => attr.name !== attributeToRemoveName
  //     );

  //     // Example: Sending message to background script in Chrome extension
  //     const removedAttribute = prevAttributes.find(
  //       (attr) => attr.name === attributeToRemoveName
  //     );
  //     if (removedAttribute) {
  //       chrome.runtime.sendMessage({
  //         action: "updateAttributes",
  //         name: removedAttribute.name,
  //         value: "",
  //       });
  //     }

  //     return updatedAttributes;
  //   });
  // };
  if (!style) {
    return <div> Not element selected</div>;
  }
  return (
    <div className="w-full h-[calc(100vh-65px)] flex items-center justify-center">
      <div
        ref={scrollableContainerRef}
        className="flex flex-col space-y-2 overflow-y-auto scroll-smooth h-full w-full p-4"
      >
        {/* {attributes?.map((attribute) => {
          return (
            <div>{`${attribute.name}, ${attribute.nameForTitle} and  ${attribute.value} `}</div>
          );
        })} */}
        {/* <div className="flex flex-col gap-1">
          
          {attributes?.length ? (
            attributes.map((attribute, index) => (
              <div>
                <AttributeFactory
                  key={index}
                  index={index}
                  attribute={attribute}
                  onChange={handleAttributeChange}
                  onRemove={removeAttribute}
                />
              </div>
            ))
          ) : (
            <div>No attributes available</div>
          )} */}

        {/* <AddAttribute
            selectedAttributeName={element.tagName!}
            setAttributes={setAttributes}
            addAttribute={addAttribute}
          /> */}
      </div>
    </div>
    // </div>
  );
}

export default StyleInspector;
