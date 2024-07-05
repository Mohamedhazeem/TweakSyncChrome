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
import StyleFactory from "@/components/styles/StyleFactory";
import { OutletContext } from "@/types/outletContext";
import { Style } from "@/types/styleTypes";
import { GLOBAL_STYLES } from "@/utils/styles/styles";

import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

function StyleInspector() {
  const { style, element } = useOutletContext<OutletContext>();
  const [styles, setStyles] = useState<Style[] | undefined>(undefined);
  const scrollableContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!style) return;
    const elementStyles: Style[] = [];
    // const dataAttributes: { [key: string]: string | number } = {};

    GLOBAL_STYLES.forEach((eachStyle) => {
      Object.entries(style.external).forEach(([category, styles]) => {
        if (typeof styles === "object" && styles !== null) {
          Object.entries(
            styles as { [key: string]: { [key: string]: string } }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ).forEach(([_selector, styleProps]) => {
            if (typeof styleProps === "object" && styleProps !== null) {
              Object.entries(styleProps as { [key: string]: string }).forEach(
                ([key, value]) => {
                  if (key === eachStyle.name) {
                    elementStyles.push({
                      ...eachStyle,
                      category,
                      value,
                    });
                  }
                }
              );
            }
          });
        }
      });
    });
    // GLOBAL_ATTRIBUTES.forEach((attr) => {
    //   if (element.attributes) {
    //     Object.entries(element.attributes).forEach(([name]) => {
    //       if (name === attr.name) {
    //         elementStyles.push({
    //           ...attr,
    //           value: element.attributes![attr.name] || "",
    //         });
    //       }
    //     });
    //   }
    //   // if (element.attributes && element.attributes[attr.name]) {
    //   //   elementAttributes.push({
    //   //     ...attr,
    //   //     value: element.attributes[attr.name] || "",
    //   //   });
    //   // }
    // });

    // if (styles.attributes) {
    //   Object.entries(element.attributes).forEach(([name, value]) => {
    //     if (name.startsWith("data-")) {
    //       dataAttributes[name] = value;
    //     }
    //   });
    // }

    // if (Object.keys(dataAttributes).length > 0) {
    //   elementStyles.push({
    //     name: "data-*",
    //     nameForTitle: "Data",
    //     type: "object",
    //     description: "Custom data attributes",
    //     value: dataAttributes,
    //   });
    // }

    // const specificAttributes =
    //   ELEMENT_SPECIFIC_ATTRIBUTES[element.tagName!.toLowerCase()];
    // specificAttributes?.forEach((attr) => {
    //   if (element.attributes![attr.name]) {
    //     elementStyles.push({
    //       ...attr,
    //       value: element.attributes![attr.name] || "",
    //     });
    //   }
    // });
    setStyles(elementStyles);
    setTimeout(() => {
      if (scrollableContainerRef.current) {
        scrollableContainerRef.current.scrollTop = 0; // Scroll to top
      }
    }, 50);
  }, [style, element]);

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
        {styles?.length ? (
          styles?.map((style, index) => {
            return (
              <div>
                <StyleFactory
                  key={index}
                  index={index}
                  style={style}
                  onChange={() => {}}
                  onRemove={() => {}}
                ></StyleFactory>
                {`${style.category} -> ${style.name}, ${style.nameForTitle} and  ${style.value} `}
              </div>
            );
          })
        ) : (
          <div>No Styles available</div>
        )}
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
