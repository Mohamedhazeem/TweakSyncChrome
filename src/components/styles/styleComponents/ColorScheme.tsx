import { IStyleContext } from "@/types/styleTypes";
import { useStyleContext } from "@/utils/elementContext";
import { useEffect, useState } from "react";
import StyleOptions from "../styleHelperComponents/styleOptions";

const ColorScheme = () => {
  const { selector, group, onChange } = useStyleContext() as IStyleContext;

  const [color, setColor] = useState<string>("");
  const style = group?.groups.filter((style) => style.name === "color-scheme");

  useEffect(() => {
    if (style && style[0]?.value) {
      setColor(style[0].value);
    } else {
      setColor("default");
    }
  }, [style]);

  const handleColorChange = (newValue: string | boolean) => {
    if (style && style[0]) {
      if (typeof newValue === "string") {
        onChange(selector, style[0].name, newValue);
        setColor(newValue);
      } else {
        console.warn("Unexpected boolean value for color interpolation");
      }
    }
  };

  return (
    <div>
      <span className="flex flex-col gap-1">
        {color}
        {style && style[0]?.options && (
          <StyleOptions style={style[0]} customOptionsCallback={handleColorChange} />
        )}
      </span>
    </div>
  );
};

export default ColorScheme;
