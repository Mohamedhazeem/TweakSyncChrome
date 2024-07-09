import { Button } from "@/components/ui/button";
import { IStyleContext } from "@/types/styleTypes";
import { useStyleContext } from "@/utils/attributesContext";
import { useEffect, useState } from "react";
import { SketchPicker, ColorResult, HSLColor, RGBColor } from "react-color";
import StyleOptions from "../styleHelperComponents/styleOptions";
import { presetColors } from "@/utils/styles/colorUtils";

const Color = () => {
  //convertToHex onChange
  const { selector, property, onChange, value, style } =
    useStyleContext() as IStyleContext;

  const [color, setColor] = useState<string | RGBColor | HSLColor>();
  const [showColor, setShowColor] = useState(false);
  const [showMoreColor, setShowMoreColor] = useState(false);
  useEffect(() => {
    if (
      ["inherit", "initial", "revert", "revert-layer", "unset"].includes(value)
    ) {
      setShowColor(false);
    } else {
      setShowColor(true);
    }
    setColor(value);
  }, []);
  const handleColorChange = (color: ColorResult) => {
    let colorValue: string;

    const preset = presetColors.find(
      (preset) => preset.color.toLowerCase() === color.hex.toLowerCase()
    );
    if (preset) {
      setColor(preset.color);
      onChange(selector, property, preset.title.toLowerCase());
      return;
    } else {
      if (color.rgb.a == 100) {
        colorValue = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
      } else {
        colorValue = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
      }

      onChange(selector, property, colorValue);
      setColor(color.rgb);
    }
  };
  return (
    <div>
      <span key={`${selector}-${property}`} className="flex flex-col gap-1">
        <StyleOptions style={style!} customOptionsCallback={setShowColor} />
        {showColor && (
          <div className="flex flex-col gap-1">
            <SketchPicker
              color={color}
              width="w-full"
              presetColors={showMoreColor ? presetColors : undefined}
              onChange={(e) => handleColorChange(e)}
            />
            <Button
              className="w-full"
              onClick={() => setShowMoreColor(!showMoreColor)}
            >
              {showMoreColor ? "Show Less Colors" : "Show More Colors"}
            </Button>
          </div>
        )}
      </span>
    </div>
  );
};

export default Color;
