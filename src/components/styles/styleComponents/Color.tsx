import { Button } from "@/components/ui/button";
import { IStyleContext } from "@/types/styleTypes";
import { useClearLayoutContext, useStyleContext } from "@/utils/elementContext";
import { lazy, Suspense, useEffect, useState } from "react";
import { ColorResult, HSLColor, RGBColor } from "react-color";
import { presetColors } from "@/utils/styles/colorUtils";
import StyleLayout from "../StyleLayout";
import { globalCssOptions } from "@/utils/styles/globalStyles";

const SketchPicker = lazy(() =>
  import("react-color").then((module) => ({ default: module.SketchPicker }))
);
const SingleStyleOptions = lazy(() => import("../styleHelperComponents/SingleStyleOptions"));

type ColorPropType = {
  colorProp: string;
};
const Color = ({ colorProp }: ColorPropType) => {
  const { selector, onChange, group } = useStyleContext() as IStyleContext;
  const clearLayout = useClearLayoutContext();
  const [color, setColor] = useState<string | RGBColor | HSLColor>();
  const [showColor, setShowColor] = useState<boolean>(false);
  const [showMoreColor, setShowMoreColor] = useState(false);
  const style = group?.groups.find((group) => group.name === colorProp);
  useEffect(() => {
    if (style) {
      if (clearLayout) {
        setColor(undefined);
        setShowColor(false);
      } else if (globalCssOptions.includes(style.value)) {
        setShowColor(false);
      } else if (style.value) {
        setColor(style.value);
        setShowColor(true);
      } else {
        setShowColor(false);
      }
    } else {
      setShowColor(false);
    }
  }, [style, style?.value, clearLayout]);

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
      setShowColor(newValue);
    }
  };
  return (
    <div>
      {style && (
        <StyleLayout style={style}>
          <Suspense fallback={<div></div>}>
            <SingleStyleOptions
              style={style}
              customOptionsCallback={handleShowColor}
              isCapitalized={true}
            />
          </Suspense>
          {showColor && (
            <div className="flex flex-col gap-1">
              <Suspense fallback={<div></div>}>
                <SketchPicker
                  color={color}
                  width="w-full"
                  presetColors={showMoreColor ? presetColors : undefined}
                  onChange={(e) => handleColorChange(e)}
                />
                <Button
                  className="addMultiPropertyOrAttribute hover:bg-green-600"
                  onClick={() => setShowMoreColor(!showMoreColor)}
                >
                  {showMoreColor ? "Show Less Colors" : "Show More Colors"}
                </Button>
              </Suspense>
            </div>
          )}
        </StyleLayout>
      )}
    </div>
  );
};

export default Color;
