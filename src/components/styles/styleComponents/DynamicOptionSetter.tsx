import { useEffect, useState } from "react";
import { useStyleContext } from "@/utils/elementContext";
import { IStyleContext } from "@/types/styleTypes";
import { DynamicOptions } from "../styleHelperComponents/DynamicOptions";
import { PopOver } from "../styleHelperComponents/PopOver";
import StyleLayout from "../StyleLayout";
import { extractString, extractUnit, extractValue } from "@/utils/styles/extractUnits";
import { globalCssOptions, lengthUnits } from "@/utils/styles/globalStyles";

type DynamicOptionType = {
  name: string;
  isRange?: boolean;
  isDoubleQuotesText?: boolean;
};
export default function DynamicOptionSetter({
  name,
  isRange,
  isDoubleQuotesText,
}: DynamicOptionType) {
  const { selector, onChange, group } = useStyleContext() as IStyleContext;

  const style = group?.groups.find((style) => style.name === name);
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("");

  useEffect(() => {
    if (!option && style?.value) {
      const initialOption = getOptionFromValue(style.value);
      setOption(initialOption);
    }
  }, [selector, style, option]);

  function getOptionFromValue(value: string): string {
    if (isDoubleQuotesText) {
      return "text";
    }
    const lengthUnitRegex = new RegExp(`^\\d+(\\.\\d+)?(${lengthUnits.join("|")})$`);
    if (lengthUnitRegex.test(value)) {
      return "length";
    }
    const numberRegex = new RegExp(`^[+-]?\\d+(\\.\\d+)?$`);
    if (numberRegex.test(value)) {
      return "number";
    }
    // Check if value is in global CSS options
    if (globalCssOptions.includes(value)) {
      return value;
    }

    // Default to an empty string or a default option if needed
    return value;
  }
  const handlePopOverSelect = (newValue: string) => {
    if (style && style.name) {
      onChange(selector, style.name, newValue);
    }
    setOption(newValue);
    setOpen(false);
  };
  const handleValueChange = (newValue: string) => {
    if (style && style.name) {
      console.log(style.name);
      onChange(selector, style.name, newValue);
    } else {
      console.log("name");
    }
  };

  const isCustomValue = !globalCssOptions.includes(option);
  const value = style?.value ? extractValue(style.value) : "";
  const unit = style?.value ? extractUnit(style.value) : "";
  return (
    <div>
      {style && (
        <StyleLayout style={style}>
          <div className="position">
            <div key={`option-${option}`} className="positionAndUnits">
              <PopOver
                open={open}
                setOpen={setOpen}
                style={style}
                handleSelect={handlePopOverSelect}
                isCustomValue={isCustomValue}
                isCaptilized={true}
                option={option}
              />
            </div>
            {
              <DynamicOptions
                optionType={option}
                value={isDoubleQuotesText ? extractString(style.value) : value}
                unit={unit}
                isRange={isRange}
                isDoubleQuotesText={isDoubleQuotesText}
                customOptionsCallback={handleValueChange}
              />
            }
          </div>
        </StyleLayout>
      )}
    </div>
  );
}
