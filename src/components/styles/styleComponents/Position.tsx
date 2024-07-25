import { useEffect, useState } from "react";
import { useStyleContext } from "@/utils/elementContext";
import { IStyleContext } from "@/types/styleTypes";
import { PositionUnits } from "../styleHelperComponents/PositionUnits";
import { PopOver } from "../styleHelperComponents/PopOver";
import { getButtonText } from "@/utils/styles/getButtonTextForPopver";
import StyleLayout from "../StyleLayout";
import { extractUnit, extractValue } from "@/utils/styles/extractUnits";
import { globalCssOptions, lengthUnits } from "@/utils/styles/globalStyles";

type PositionType = {
  name: string;
};
export default function Position({ name }: PositionType) {
  const { selector, onChange, group } = useStyleContext() as IStyleContext;

  const style = group?.groups.find((style) => style.name === name);
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("");

  useEffect(() => {
    if (!option && style!.value) {
      const initialOption = getOptionFromValue(style!.value);
      setOption(initialOption);
    }
  }, [selector, style, option]);

  function getOptionFromValue(value: string): string {
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
  const handleSelect = (newValue: string) => {
    if (style && style.name) {
      onChange(selector, style.name, newValue);
    }
    setOption(newValue);
    setOpen(false);
  };
  const handleValueChange = (newValue: string) => {
    if (style && style.name) {
      onChange(selector, style.name, newValue);
    }
  };

  const isCustomValue = !globalCssOptions.includes(option);
  const value = style?.value ? extractValue(style.value) : "";
  const unit = style?.value ? extractUnit(style.value) : "";
  return (
    <div>
      {style && (
        <StyleLayout style={style}>
          <span className="flex flex-col gap-1">
            <div className="flex flex-col gap-2 items-center">
              <div key={`option-${option}`} className="flex gap-2 items-center w-full">
                <PopOver
                  open={open}
                  setOpen={setOpen}
                  getButtonText={getButtonText(option, style!, true)}
                  style={style}
                  handleSelect={handleSelect}
                  isCustomValue={isCustomValue}
                  isCaptilized={true}
                  option={option}
                />
              </div>
              {
                <PositionUnits
                  optionType={option}
                  value={value}
                  unit={unit}
                  customOptionsCallback={handleValueChange}
                />
              }
            </div>
          </span>
        </StyleLayout>
      )}
    </div>
  );
}
