import { useEffect, useState } from "react";
import { ElementDetails, ElementStyles } from "../types/ElementTypes";
import Color from "./Color";

type PTagTypes = {
  tag?: ElementDetails;
};

function ColorStyle({ tag }: PTagTypes) {
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
    },
  };

  const [styles, setStyles] = useState<ElementStyles>(initialStyles);

  useEffect(() => {
    if (tag?.styles) {
      setStyles(tag.styles);
    }
  }, [tag]);

  const handleColorChange = (
    selector: string,
    property: string,
    newColor: string
  ) => {
    setStyles((prevStyles) => {
      const updatedStyles = { ...prevStyles };

      if (updatedStyles.inline[selector]) {
        updatedStyles.inline[selector] = newColor;
      } else if (updatedStyles.external.classes[selector]) {
        updatedStyles.external.classes[selector][property] = newColor;
      } else if (updatedStyles.external.ids[selector]) {
        updatedStyles.external.ids[selector][property] = newColor;
      } else if (updatedStyles.external.tags[selector]) {
        updatedStyles.external.tags[selector][property] = newColor;
      } else if (updatedStyles.external.attribute[selector]) {
        updatedStyles.external.attribute[selector][property] = newColor;
      } else if (updatedStyles.external.descendant[selector]) {
        updatedStyles.external.descendant[selector][property] = newColor;
      } else if (updatedStyles.external.pseudoElementStyles[selector]) {
        updatedStyles.external.pseudoElementStyles[selector][property] =
          newColor;
      } else if (updatedStyles.external.pseudoClassStyles[selector]) {
        updatedStyles.external.pseudoClassStyles[selector][property] = newColor;
      }
      chrome.runtime.sendMessage({
        action: "updateStyles",
        property,
        value: newColor,
        temporaryId: tag?.temporaryId,
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

  const renderColorStyles = (styles: {
    [key: string]: { [key: string]: string };
  }) => {
    return Object.entries(styles).flatMap(([selector, properties]) =>
      Object.entries(properties).map(([property, value]) =>
        property === "color" ? (
          <Color
            key={`${selector}-${property}`}
            selector={selector}
            property={property}
            value={value}
            convertToHex={convertToHex}
            onColorChange={handleColorChange}
          />
        ) : null
      )
    );
  };

  if (!tag || !tag.styles) {
    return null;
  }

  return (
    <div>
      {styles.inline &&
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
        )}
      {styles.external && (
        <>
          {renderColorStyles(styles.external.classes)}
          {renderColorStyles(styles.external.ids)}
          {renderColorStyles(styles.external.tags)}
          {renderColorStyles(styles.external.attribute)}
          {renderColorStyles(styles.external.descendant)}
          {renderColorStyles(styles.external.pseudoElementStyles)}
          {renderColorStyles(styles.external.pseudoClassStyles)}
        </>
      )}
    </div>
  );
}

export default ColorStyle;
