import { Button } from "@/components/ui/button";
import { IStyleContext } from "@/types/styleTypes";
import { useStyleContext } from "@/utils/elementContext";
import { useEffect, useState } from "react";
import { SketchPicker, ColorResult, HSLColor, RGBColor } from "react-color";
import { presetColors } from "@/utils/styles/colorUtils";

import { globalCssOptions } from "@/utils/styles/styles";
import StyleOptions from "../styleHelperComponents/StyleOptions";
import StyleLayout from "../StyleLayout";

type ColorPropType = {
  colorProp: string;
};
const Color = ({ colorProp }: ColorPropType) => {
  const { selector, onChange, group } = useStyleContext() as IStyleContext;
  const [color, setColor] = useState<string | RGBColor | HSLColor>();
  const [showColor, setShowColor] = useState<boolean>(false);
  const [showMoreColor, setShowMoreColor] = useState(false);
  const style = group?.groups.find((group) => group.name === colorProp);
  useEffect(() => {
    if (style) {
      if (globalCssOptions.includes(style.value)) {
        setShowColor(false);
      } else {
        setShowColor(true);
      }
      setColor(style.value);
    }
  }, [style]);
  const handleColorChange = (color: ColorResult) => {
    let colorValue: string;

    const preset = presetColors.find(
      (preset) => preset.color.toLowerCase() === color.hex.toLowerCase()
    );
    if (preset && style && colorProp) {
      setColor(preset.color);
      onChange(selector, colorProp, preset.title.toLowerCase());
      return;
    } else {
      if (color.rgb.a == 100) {
        colorValue = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
      } else {
        colorValue = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
      }

      onChange(selector, colorProp, colorValue);
      setColor(color.rgb);
    }
  };
  const handleShowColor = (newValue: string | boolean) => {
    if (typeof newValue === "boolean") {
      // onChange(selector, property, newValue);
      setShowColor(newValue);
    } else {
      console.log("Unexpected boolean value for color interpolation");
      // Handle the boolean case if needed
    }
  };
  return (
    <div>
      {style && (
        <StyleLayout title={style.nameForTitle || style.name} description={style.description}>
          <span key={`${selector}-${colorProp}`} className="flex flex-col gap-1">
            <StyleOptions style={style} customOptionsCallback={handleShowColor} />
            {showColor && (
              <div className="flex flex-col gap-1">
                <SketchPicker
                  color={color}
                  width="w-full"
                  presetColors={showMoreColor ? presetColors : undefined}
                  onChange={(e) => handleColorChange(e)}
                />
                <Button className="w-full" onClick={() => setShowMoreColor(!showMoreColor)}>
                  {showMoreColor ? "Show Less Colors" : "Show More Colors"}
                </Button>
              </div>
            )}
          </span>
        </StyleLayout>
      )}
    </div>
  );
};

export default Color;
