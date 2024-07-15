import { Button } from "@/components/ui/button";
import { IStyleContext } from "@/types/styleTypes";
import { useStyleContext } from "@/utils/elementContext";
import { useEffect, useState } from "react";
import { SketchPicker, ColorResult, HSLColor, RGBColor } from "react-color";
import { presetColors } from "@/utils/styles/colorUtils";
import StyleOptions from "../styleHelperComponents/styleOptions";
import { globalCssOptions } from "@/utils/styles/styles";

type ColorPropType = {
  colorProp: string;
};
const Color = ({ colorProp }: ColorPropType) => {
  const { selector, onChange, group } = useStyleContext() as IStyleContext;
  const [color, setColor] = useState<string | RGBColor | HSLColor>();
  const [showColor, setShowColor] = useState<boolean>(false);
  const [showMoreColor, setShowMoreColor] = useState(false);
  const style = group?.groups.filter((group) => group.name === colorProp);
  useEffect(() => {
    if (style) {
      if (globalCssOptions.includes(style[0]?.value)) {
        setShowColor(false);
      } else {
        setShowColor(true);
      }
      setColor(style[0]?.value);
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
      <span
        key={`${selector}-${style![0].name ? style![0].name : ""}`}
        className="flex flex-col gap-1"
      >
        {colorProp}
        <StyleOptions style={style![0]} customOptionsCallback={handleShowColor} />
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
    </div>
  );
};

export default Color;
