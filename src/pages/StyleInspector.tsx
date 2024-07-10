import { useEffect, useRef, useState } from "react";
import { ElementStyles } from "../types/elementTypes";
// import Color from "./Color";
import { OutletContext } from "@/types/outletContext";
import { useOutletContext } from "react-router-dom";
import { GLOBAL_STYLES } from "@/utils/styles/styles";
import StyleFactory from "@/components/styles/StyleFactory";
import { StyleContext } from "@/utils/elementContext";
import StyleLayoutParent from "@/components/styles/StyleLayoutParent";
import AddStyleProperty from "@/components/styles/styleHelperComponents/AddStyleProperty";

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

  const handleStyleChange = (selector: string, property: string, newValue: string | null) => {
    setStyles((prevStyles) => {
      const updatedStyles = { ...prevStyles };
      if (newValue === null) {
        // Remove the property
        if (selector === "inline") {
          delete updatedStyles.inline[property];
        } else {
          if (updatedStyles.inline[selector]) {
            delete updatedStyles.inline[selector];
          } else if (updatedStyles.external.classes[selector]) {
            delete updatedStyles.external.classes[selector][property];
          } else if (updatedStyles.external.ids[selector]) {
            delete updatedStyles.external.ids[selector][property];
          } else if (updatedStyles.external.tags[selector]) {
            delete updatedStyles.external.tags[selector][property];
          } else if (updatedStyles.external.attribute[selector]) {
            delete updatedStyles.external.attribute[selector][property];
          } else if (updatedStyles.external.descendant[selector]) {
            delete updatedStyles.external.descendant[selector][property];
          } else if (updatedStyles.external.pseudoElementStyles[selector]) {
            delete updatedStyles.external.pseudoElementStyles[selector][property];
          } else if (updatedStyles.external.pseudoClassStyles[selector]) {
            delete updatedStyles.external.pseudoClassStyles[selector][property];
          } else if (updatedStyles.external.atRules[selector]) {
            for (const subSelector in updatedStyles.external.atRules[selector]) {
              delete updatedStyles.external.atRules[selector][subSelector][property];
            }
          }
        }
      } else {
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
            updatedStyles.external.pseudoElementStyles[selector][property] = newValue;
          } else if (updatedStyles.external.pseudoClassStyles[selector]) {
            updatedStyles.external.pseudoClassStyles[selector][property] = newValue;
          } else if (updatedStyles.external.atRules[selector]) {
            for (const subSelector in updatedStyles.external.atRules[selector]) {
              updatedStyles.external.atRules[selector][subSelector][property] = newValue;
            }
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
  const addProperty = (selector: string, property: string) => {
    const temporaryId = styles.temporaryId; // Ensure that temporaryId is accessible here

    chrome.runtime.sendMessage({
      action: "updateStyles",
      selector,
      property,
      value: "",
      temporaryId, // Ensure this value is correctly passed
    });
  };
  const renderStyles = (styles: { [key: string]: { [key: string]: string } }) => {
    // Group properties by selector
    const groupedStyles = Object.entries(styles).reduce((acc, [selector, properties]) => {
      acc[selector] = acc[selector] || [];
      acc[selector].push(properties);
      return acc;
    }, {} as { [key: string]: Array<{ [key: string]: string }> });

    return Object.entries(groupedStyles).map(([selector, propertiesArray]) => (
      <StyleLayoutParent key={selector} selector={selector}>
        {propertiesArray.flatMap((properties) =>
          Object.entries(properties).map(([property, value]) => {
            const globalStyle = GLOBAL_STYLES.find((style) => style.name === property);
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
                    // convertToHex,
                    onRemove: (property: string) => handleStyleChange(selector, property, null),
                    onChange: handleStyleChange,
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
        <AddStyleProperty
          selector={selector}
          setStyles={setStyles}
          addStyleProperty={addProperty}
        />
      </StyleLayoutParent>
    ));
  };

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
