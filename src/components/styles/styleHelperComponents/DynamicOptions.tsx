import { useState, useEffect } from "react";
import { globalCssOptions } from "@/utils/styles/globalStyles";
import { NumberInput } from "./NumberInput";
import { Length } from "./Length";
import { useClearLayoutContext } from "@/utils/elementContext";
import { TextInput } from "./TextInput";
import { ColorResult, SketchPicker } from "react-color";

type DynamicOptionType = {
  optionType: string;
  value: string;
  unit: string;
  isRange?: boolean;
  isDoubleQuotesText?: boolean;
  isSupportNegativeValue?: boolean;
  customOptionsCallback: (newValue: string) => void;
};

export function DynamicOptions({
  optionType,
  value,
  unit,
  isRange,
  isDoubleQuotesText,
  isSupportNegativeValue,
  customOptionsCallback,
}: DynamicOptionType) {
  const [newValue, setNewValue] = useState<string>(value);
  const [currentUnit, setCurrentUnit] = useState<string>(unit);
  const [open, setOpen] = useState(false);
  const clearLayout = useClearLayoutContext();

  useEffect(() => {
    if (clearLayout) {
      setNewValue("");
    } else {
      setNewValue(value);
    }
  }, [value, isRange, clearLayout]);

  useEffect(() => {
    if (clearLayout) {
      setCurrentUnit("");
    } else if (optionType === "length") {
      if (unit) {
        setCurrentUnit(unit);
      } else {
        setCurrentUnit("px");
      }
    }
  }, [unit, optionType, clearLayout]);

  useEffect(() => {
    handleApplyUnitChanges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApplyUnitChanges = () => {
    if (optionType === "length") {
      customOptionsCallback(`${newValue}${currentUnit}`);
    } else if (optionType === "number") {
      customOptionsCallback(`${newValue}`);
    }
  };

  const handleUnitSelect = (unit: string) => {
    setCurrentUnit(unit);
    if (optionType === "length") {
      customOptionsCallback(`${newValue}${unit}`);
    }
    setOpen(false);
  };
  const handleColorChange = (color: ColorResult) => {
    const colorValue = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    setNewValue(colorValue);
    customOptionsCallback(colorValue);
  };

  const isCustomValue = !globalCssOptions.includes(currentUnit);
  if (optionType === "color" && !clearLayout) {
    return (
      <div className="w-full">
        <SketchPicker color={newValue} onChange={handleColorChange} width="w-full" />
      </div>
    );
  }
  if (optionType === "length" && !clearLayout) {
    return Length({
      newValue,
      setNewValue,
      customOptionsCallback,
      currentUnit,
      open,
      setOpen,
      handleUnitSelect,
      isCustomValue,
      isSupportNegativeValue,
    });
  } else if (optionType === "number" && !clearLayout) {
    return NumberInput({
      newValue,
      setNewValue,
      customOptionsCallback,
      isRange,
      isSupportNegativeValue,
    });
  } else if (optionType === "text" && !clearLayout) {
    return TextInput({
      newValue,
      setNewValue,
      customOptionsCallback,
      isDoubleQuotesText,
    });
  }
  return <div></div>;
}
