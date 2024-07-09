import { IStyleContext } from "@/types/styleTypes";
import { useStyleContext } from "@/utils/elementContext";
import { useEffect, useState } from "react";
import StyleOptions from "../styleHelperComponents/styleOptions";

const ColorScheme = () => {
  //convertToHex onChange
  const { selector, property, onChange, value, style } =
    useStyleContext() as IStyleContext;

  const [, setColor] = useState<string>();
  useEffect(() => {
    if (value) {
      setColor(value);
    }
  }, []);
  const handleColorChange = (newValue: string | boolean) => {
    if (typeof newValue === "string") {
      onChange(selector, property, newValue);
      setColor(newValue);
    } else {
      console.warn("Unexpected boolean value for color interpolation");
      // Handle the boolean case if needed
    }
  };
  return (
    <div>
      <span key={`${selector}-${property}`} className="flex flex-col gap-1">
        <StyleOptions
          style={style!}
          customOptionsCallback={handleColorChange}
        />
      </span>
    </div>
  );
};

export default ColorScheme;
