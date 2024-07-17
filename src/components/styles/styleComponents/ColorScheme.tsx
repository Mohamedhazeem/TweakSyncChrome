import { IStyleContext } from "@/types/styleTypes";
import { useStyleContext } from "@/utils/elementContext";
import { useEffect, useState } from "react";
import StyleOptions from "../styleHelperComponents/StyleOptions";
import StyleLayout from "../StyleLayout";

const ColorScheme = () => {
  const { selector, group, onChange } = useStyleContext() as IStyleContext;

  const [, setColor] = useState<string>("");
  const style = group?.groups.find((style) => style.name === "color-scheme");

  useEffect(() => {
    if (style && style.value) {
      setColor(style.value);
    } else {
      setColor("default");
    }
  }, [style]);

  const handleColorScheme = (newValue: string | boolean) => {
    if (style) {
      if (typeof newValue === "string") {
        onChange(selector, style.name, newValue);
        setColor(newValue);
      } else {
        console.warn("Unexpected boolean value for color interpolation");
      }
    }
  };

  return (
    <div>
      {style && (
        <StyleLayout style={style}>
          <span className="flex flex-col gap-1">
            <StyleOptions style={style} customOptionsCallback={handleColorScheme} />
          </span>
        </StyleLayout>
      )}
    </div>
  );
};

export default ColorScheme;
