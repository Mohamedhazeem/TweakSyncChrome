import { useEffect, useRef, useState } from "react";
import { ElementStyles } from "../types/elementTypes";
// import Color from "./Color";
import { OutletContext } from "@/types/outletContext";
import { useOutletContext } from "react-router-dom";
import { GLOBAL_STYLES } from "@/utils/styles/styles";
import StyleFactory from "@/components/styles/StyleFactory";
import { StyleContext } from "@/utils/attributesContext";
// import StyleLayout from "@/components/styles/StyleLayout";
import StyleLayoutParent from "@/components/styles/StyleLayoutParent";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";
// import { Button } from "@/components/ui/button";

function StyleInspector() {
  const { style } = useOutletContext<OutletContext>();
  const initialStyles: ElementStyles = {
    inline: {},
    external: {
      classes: {},
      ids: {},
      tags: {},
      attribute: {},
      descendant: {},
      pseudoElementStyles: {},
      pseudoClassStyles: {},
      atRules: {},
    },
    temporaryId: "",
  };

  const [styles, setStyles] = useState<ElementStyles>(initialStyles);
  const scrollableContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (style) {
      console.log("Received style:", style);

      setStyles(style);
    }
  }, [style]); // Check if style needs to be updated when tag.path changes

  console.log("Rendering ColorStyle with styles:", styles);

  const handleColorChange = (
    selector: string,
    property: string,
    newValue: string
  ) => {
    setStyles((prevStyles) => {
      const updatedStyles = { ...prevStyles };
      if (selector === "inline") {
        // Update the color property directly in the inline styles
        updatedStyles.inline[property] = newValue;
      } else {
        if (updatedStyles.inline[selector]) {
          updatedStyles.inline[selector] = newValue;
        } else if (updatedStyles.external.classes[selector]) {
          updatedStyles.external.classes[selector][property] = newValue;
        } else if (updatedStyles.external.ids[selector]) {
          updatedStyles.external.ids[selector][property] = newValue;
        } else if (updatedStyles.external.tags[selector]) {
          updatedStyles.external.tags[selector][property] = newValue;
        } else if (updatedStyles.external.attribute[selector]) {
          updatedStyles.external.attribute[selector][property] = newValue;
        } else if (updatedStyles.external.descendant[selector]) {
          updatedStyles.external.descendant[selector][property] = newValue;
        } else if (updatedStyles.external.pseudoElementStyles[selector]) {
          updatedStyles.external.pseudoElementStyles[selector][property] =
            newValue;
        } else if (updatedStyles.external.pseudoClassStyles[selector]) {
          updatedStyles.external.pseudoClassStyles[selector][property] =
            newValue;
        } else if (updatedStyles.external.atRules[selector]) {
          for (const subSelector in updatedStyles.external.atRules[selector]) {
            updatedStyles.external.atRules[selector][subSelector][property] =
              newValue;
          }
        }
      }
      chrome.runtime.sendMessage({
        action: "updateStyles",
        selector,
        property,
        value: newValue,
        temporaryId: style.temporaryId,
      });
      return updatedStyles;
    });
  };

  const rgbToHex = (rgb: string): string => {
    const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb);
    return result
      ? `#${(+result[1]).toString(16).padStart(2, "0")}${(+result[2])
          .toString(16)
          .padStart(2, "0")}${(+result[3]).toString(16).padStart(2, "0")}`
      : rgb;
  };

  const namedColorsToHex = (color: string): string => {
    const ctx = document.createElement("canvas").getContext("2d");
    if (ctx) {
      ctx.fillStyle = color;
      return ctx.fillStyle;
    }
    return color;
  };

  const convertToHex = (color: string): string => {
    if (color.startsWith("#")) {
      return color;
    } else if (color.startsWith("rgb")) {
      return rgbToHex(color);
    } else {
      return namedColorsToHex(color);
    }
  };
  const renderStyles = (styles: {
    [key: string]: { [key: string]: string };
  }) => {
    // Group properties by selector
    const groupedStyles = Object.entries(styles).reduce(
      (acc, [selector, properties]) => {
        acc[selector] = acc[selector] || [];
        acc[selector].push(properties);
        return acc;
      },
      {} as { [key: string]: Array<{ [key: string]: string }> }
    );

    return Object.entries(groupedStyles).map(([selector, propertiesArray]) => (
      <StyleLayoutParent key={selector} selector={selector}>
        {propertiesArray.flatMap((properties) =>
          Object.entries(properties).map(([property, value]) => {
            const globalStyle = GLOBAL_STYLES.find(
              (style) => style.name === property
            );
            if (globalStyle) {
              return (
                <StyleContext.Provider
                  value={{
                    key: `${selector}-${property}`,
                    name: property,
                    selector,
                    property,
                    value,
                    style: globalStyle,
                    convertToHex,
                    onRemove: () => {},
                    onChange: handleColorChange,
                  }}
                  key={`${selector}-${property}`}
                >
                  <StyleFactory name={property} />
                </StyleContext.Provider>
              );
            }
            return null;
          })
        )}
      </StyleLayoutParent>
    ));
  };
  // const renderStyles = (styles: {
  //   [key: string]: { [key: string]: string };
  // }) => {
  //   return Object.entries(styles).flatMap(([selector, properties]) =>
  //     Object.entries(properties).map(([property, value]) => {
  //       const globalStyle = GLOBAL_STYLES.find(
  //         (style) => style.name === property
  //       );
  //       if (globalStyle) {
  //         return (
  //           <StyleContext.Provider
  //             value={{
  //               key: `${selector}-${property}`,
  //               name: property,
  //               selector,
  //               property,
  //               value,
  //               convertToHex,
  //               onRemove: () => {},
  //               onChange: handleColorChange,
  //             }}
  //           >
  //             {property}
  //             <StyleFactory name={property} />
  //           </StyleContext.Provider>
  //         );
  //       }
  //       return null;
  //       // property === "color" ? (
  //       //   <Color
  //       //     key={`${selector}-${property}`}
  //       //     selector={selector}
  //       //     property={property}
  //       //     value={value}
  //       //     convertToHex={convertToHex}
  //       //     onColorChange={handleColorChange}
  //       //   />
  //       // ) : null
  //     })
  //   );
  // };

  if (!style) {
    return null;
  }
  return (
    <div className="w-full h-[calc(100vh-65px)] flex items-center justify-center">
      <div
        ref={scrollableContainerRef}
        className="flex flex-col space-y-2 overflow-y-auto scroll-smooth h-full w-full p-4"
      >
        {/* {styles.inline &&
        Object.entries(styles.inline).map(([property, value]) =>
          property === "color" ? (
            <Color
              key={`inline-${property}`}
              selector="inline"
              property={property}
              value={value}
              convertToHex={convertToHex}
              onColorChange={handleColorChange}
            />
          ) : null
        )} */}
        {styles.external && (
          <>
            {renderStyles(styles.external.classes)}
            {renderStyles(styles.external.ids)}
            {renderStyles(styles.external.tags)}
            {renderStyles(styles.external.attribute)}
            {renderStyles(styles.external.descendant)}
            {renderStyles(styles.external.pseudoElementStyles)}
            {renderStyles(styles.external.pseudoClassStyles)}
            {/* {renderAtRules(styles.external.atRules)} */}
            {/* {styles.external.atRules &&
            Object.entries(styles.external.atRules).map(
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              ([, nestedSelectors]) =>
                Object.entries(nestedSelectors).map(([selector, properties]) =>
                  renderStyles({ [selector]: properties })
                )
            )} */}
          </>
        )}
      </div>
    </div>
  );
}

export default StyleInspector;
