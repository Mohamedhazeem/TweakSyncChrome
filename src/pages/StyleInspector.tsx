import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ElementStyles, ExternalStyles } from "../types/elementTypes";
import { OutletContext } from "../types/OutletContext";
import { useOutletContext } from "react-router-dom";
// import StyleFactory from "@/components/styles/StyleFactory";
// import { StyleContext } from "@/utils/elementContext";
import StyleLayoutParent from "@/components/styles/StyleLayoutParent";
// import AddStyleProperty from "@/components/styles/styleHelperComponents/AddStyleProperty";
import { StyleGroup } from "@/types/styleTypes";
import { STYLE_GROUPS } from "@/utils/styles/globalStyles";
import { Button } from "@/components/ui/button";
const VerticalStyleNavbar = lazy(() => import("@/components/VerticalStyleNavbar.tsx"));
const NoStylesMessage = lazy(() => import("@/components/NoStylesMessage.tsx"));
const NotFoundInspector = lazy(() => import("./NotFoundInspector.tsx"));

function StyleInspector() {
  const { style } = useOutletContext<OutletContext>();
  const totalButtonCount = 7;
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
  const [isVerticalStyleNavbarOpen, setIsVerticalStyleNavbarOpen] = useState<boolean>(true);
  const [verticalStyleNavbarIndex, setVerticalStyleNavbarIndex] = useState<number>(0);
  const [showApplyButton, setShowApplyButton] = useState<boolean>(true);

  const scrollableContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (style) {
      console.log("Received style:", style);
      setIsVerticalStyleNavbarOpen(true);
      setStyles(style);
      showFirstStyledContent(style);
    }
  }, [style]); // Check if style needs to be updated when tag.path changes
  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMessage = (message: any) => {
    if (message.action === "appliedStyleSucessfully") {
      setShowApplyButton(true);
    } else if (message.action === "failedToApply") {
      setShowApplyButton(true);
    }
  };

  const handleVerticalStyleNavbarOpen = (isopen: boolean) => {
    setIsVerticalStyleNavbarOpen(isopen);
  };
  const handleVerticalStyleNavbarIndex = (index: number) => {
    setVerticalStyleNavbarIndex(index);
  };
  const showFirstStyledContent = (styles: ElementStyles) => {
    let i = 0;
    while (i < totalButtonCount) {
      if (getHasStyles(styles)[i]) {
        handleVerticalStyleNavbarIndex(i);
        return;
      } else {
        i++;
      }
    }
  };
  const handleStyleChange = (selector: string, property: string, newValue: string | null) => {
    setStyles((prevStyles) => {
      const updatedStyles = { ...prevStyles };
      if (newValue === null) {
        // Remove the property
        if (selector === "inline") {
          updatedStyles.inline[property] = "";
        } else {
          if (updatedStyles.inline[selector]) {
            updatedStyles.inline[selector] = "";
          } else if (updatedStyles.external.classes[selector]) {
            updatedStyles.external.classes[selector][property] = "";
          } else if (updatedStyles.external.ids[selector]) {
            updatedStyles.external.ids[selector][property] = "";
          } else if (updatedStyles.external.tags[selector]) {
            updatedStyles.external.tags[selector][property] = "";
          } else if (updatedStyles.external.attribute[selector]) {
            updatedStyles.external.attribute[selector][property] = "";
          } else if (updatedStyles.external.descendant[selector]) {
            updatedStyles.external.descendant[selector][property] = "";
          } else if (updatedStyles.external.pseudoElementStyles[selector]) {
            updatedStyles.external.pseudoElementStyles[selector][property] = "";
          } else if (updatedStyles.external.pseudoClassStyles[selector]) {
            updatedStyles.external.pseudoClassStyles[selector][property] = "";
          } else if (updatedStyles.external.atRules[selector]) {
            for (const subSelector in updatedStyles.external.atRules[selector]) {
              updatedStyles.external.atRules[selector][subSelector][property] = "";
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
  const handleClearGroup = (selector: string, property: string) => {
    setStyles((prevStyles) => {
      const updatedStyles = { ...prevStyles };

      // Type assertion to avoid TypeScript error
      (Object.keys(updatedStyles.external) as Array<keyof ExternalStyles>).forEach((key) => {
        const group = updatedStyles.external[key];
        if (typeof group === "object" && group[selector]) {
          // Delete the specific property within the selector's styles
          delete group[selector][property];
        }
      });

      return updatedStyles;
    });
  };

  const groupStylesByStyleGroups = (properties: { [key: string]: string }) => {
    const groupedStyles: { [key: string]: StyleGroup } = {};
    for (const property in properties) {
      // const value = properties[property];
      // const group = STYLE_GROUP.find((group) => group.propertyNames.includes(property));
      STYLE_GROUPS.forEach((group) => {
        if (group.propertyNames.includes(property)) {
          // const styleMeta = group.groups.find((style) => style.name === property);
          groupedStyles[group.groupName] = {
            ...group,
            groups: group.groups.map((style) => ({
              ...style,
              value: properties[style.name] || "", // Initialize with property value or empty string
            })),
          };
        }
      });
    }

    return groupedStyles;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isEmpty = (obj: { [key: string]: any }): boolean => {
    return Object.keys(obj).length === 0;
  };
  const getHasStyles = (styles: ElementStyles): { [key: number]: boolean } => {
    return {
      0: styles.external.classes && Object.keys(styles.external.classes).length > 0,
      1: styles.external.ids && Object.keys(styles.external.ids).length > 0,
      2: styles.external.tags && Object.keys(styles.external.tags).length > 0,
      3: styles.external.attribute && Object.keys(styles.external.attribute).length > 0,
      4: styles.external.descendant && Object.keys(styles.external.descendant).length > 0,
      5:
        styles.external.pseudoElementStyles &&
        Object.keys(styles.external.pseudoElementStyles).length > 0,
      6:
        styles.external.pseudoClassStyles &&
        Object.keys(styles.external.pseudoClassStyles).length > 0,
    };
  };
  const renderStyles = (styles: { [key: string]: { [key: string]: string } }) => {
    if (isEmpty(styles)) {
      return;
      <Suspense fallback={<div>Loading Styles...</div>}>
        <NoStylesMessage verticalStyleNavbarIndex={verticalStyleNavbarIndex} />;
      </Suspense>;
    }
    // Group properties by selector
    const groupedStyles = Object.entries(styles).reduce((acc, [selector, properties]) => {
      acc[selector] = acc[selector] || [];
      acc[selector].push(properties);
      return acc;
    }, {} as { [key: string]: Array<{ [key: string]: string }> });

    return Object.entries(groupedStyles).map(([selector, propertiesArray]) => {
      const allProperties = propertiesArray.reduce((acc, properties) => {
        return { ...acc, ...properties };
      }, {});

      const groupedProperties = groupStylesByStyleGroups(allProperties);

      return (
        <StyleLayoutParent
          key={selector}
          selector={selector}
          groupedProperties={groupedProperties}
          setStyles={setStyles}
          addProperty={addProperty}
          handleStyleChange={handleStyleChange}
          onClear={handleClearGroup}
        />
      );
    });
  };

  function applyStyles() {
    setShowApplyButton(false);
    chrome.runtime.sendMessage({ action: "apply", apply: "styles" });
  }
  if (!style) {
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
            <span className="inspector-title">Style Inspector</span>
            <Button
              size={"default"}
              variant={"default"}
              type="button"
              id="applyElement"
              onClick={applyStyles}
              className="inspector-applyButton hover:bg-[#fbf6f6]"
              disabled={showApplyButton ? false : true}
            >
              {showApplyButton ? "Apply" : "Loading"}
            </Button>
          </div>
        </div>
        <div className="inspector-VerticalNavbarAndStylesContainer">
          <Suspense fallback={<div>Loading...</div>}>
            <VerticalStyleNavbar
              verticalStyleNavbarIndex={verticalStyleNavbarIndex}
              isVerticalStyleNavbarOpen={isVerticalStyleNavbarOpen}
              handleVerticalStyleNavbarOpen={handleVerticalStyleNavbarOpen}
              handleVerticalStyleNavbarIndex={handleVerticalStyleNavbarIndex}
              hasStyles={getHasStyles(styles)}
            />
          </Suspense>

          <div
            className={`styleInspectorTransition-VerticalNavbarOpen ${
              isVerticalStyleNavbarOpen ? "ml-[70px]" : "ml-3"
            }`}
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
                {verticalStyleNavbarIndex == 0 && renderStyles(styles.external.classes)}
                {verticalStyleNavbarIndex == 1 && renderStyles(styles.external.ids)}
                {verticalStyleNavbarIndex == 2 && renderStyles(styles.external.tags)}
                {verticalStyleNavbarIndex == 3 && renderStyles(styles.external.attribute)}
                {verticalStyleNavbarIndex == 4 && renderStyles(styles.external.descendant)}
                {verticalStyleNavbarIndex == 5 && renderStyles(styles.external.pseudoElementStyles)}
                {verticalStyleNavbarIndex == 6 && renderStyles(styles.external.pseudoClassStyles)}
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
      </div>
    </div>
  );
}

export default StyleInspector;
