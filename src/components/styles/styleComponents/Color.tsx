import { IStyleContext } from "@/types/styleTypes";
import { useStyleContext } from "@/utils/attributesContext";
import { useEffect, useState } from "react";

// type ColorProps = {
//   selector: string;
//   property: string;
//   value: string;
//   convertToHex: (value: string) => string;
//   onColorChange: (selector: string, property: string, newColor: string) => void;
// };
// {
//   selector,
//   property,
//   value,
//   convertToHex,
//   onColorChange,
// }
const Color = () => {
  const { selector, property, value, convertToHex, onChange } =
    useStyleContext() as IStyleContext;

  const [color, setColor] = useState<string | number>();
  useEffect(() => {
    setColor(convertToHex!(value));
  }, []);
  return (
    <div>
      <span key={`${selector}-${property}`}>
        {property} : {color}
        {selector}
        <input
          type="color"
          value={color}
          onChange={(e) => {
            onChange(selector, property, e.target.value);
            setColor(e.target.value);
          }}
        />
      </span>
    </div>
  );
};

export default Color;
