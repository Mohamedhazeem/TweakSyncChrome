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
  const [values, setValues] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!option && style?.value) {
      const initialOption = getOptionFromValue(style.value);
      setOption(initialOption);
      setValues((prevValues) => ({
        ...prevValues,
        [initialOption]: style.value,
      }));
    }
  }, [selector, style, option]);
  const dynamicOptions = ["text", "length", "number"];
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
    if (globalCssOptions.includes(value)) {
      return value;
    }
    return value;
  }
  const handlePopOverSelect = (newValue: string) => {
    if (style && style.name) {
      if (dynamicOptions.includes(newValue)) {
        onChange(selector, style.name, values[newValue] || " ");
      } else {
        onChange(selector, style.name, newValue);
      }
    }
    setOption(newValue);
    setOpen(false);
  };
  const handleValueChange = (newValue: string) => {
    if (style && style.name) {
      console.log(style.name);
      onChange(selector, style.name, newValue);
      setValues((prevValues) => ({
        ...prevValues,
        [option]: newValue,
      }));
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
            {`style value: ${style.value}`}
            {`value: ${value}`}
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
