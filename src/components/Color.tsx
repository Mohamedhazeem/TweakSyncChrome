import React from "react";

type ColorProps = {
  selector: string;
  property: string;
  value: string;
  convertToHex: (value: string) => string;
  onColorChange: (selector: string, property: string, newColor: string) => void;
};

const Color: React.FC<ColorProps> = ({
  selector,
  property,
  value,
  convertToHex,
  onColorChange,
}) => {
  return (
    <div>
      <span key={`${selector}-${property}`}>
        {property} : {value}
        {selector}
        <input
          type="color"
          value={convertToHex(value)}
          onChange={(e) => onColorChange(selector, property, e.target.value)}
        />
      </span>
    </div>
  );
};

export default Color;
