import { useState, useEffect } from "react";
import { globalCssOptions } from "@/utils/styles/globalStyles";
import { NumberInput } from "./NumberInput";
import { Length } from "./Length";
import { useClearLayoutContext } from "@/utils/elementContext";
import { TextInput } from "./TextInput";

type PositionUnitType = {
  optionType: string;
  value: string;
  unit: string;
  isRange?: boolean;
  isDoubleQuotesText?: boolean;
  customOptionsCallback: (newValue: string) => void;
};

export function DynamicOptions({
  optionType,
  value,
  unit,
  isRange,
  isDoubleQuotesText,
  customOptionsCallback,
}: PositionUnitType) {
  const [number, setNumber] = useState<string>(value);
  const [currentUnit, setCurrentUnit] = useState<string>(unit);
  const [open, setOpen] = useState(false);
  const clearLayout = useClearLayoutContext();

  useEffect(() => {
    if (clearLayout) {
      setNumber("");
    } else {
      setNumber(value);
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
  }, []);

  const handleApplyUnitChanges = () => {
    if (optionType === "length") {
      customOptionsCallback(`${number}${currentUnit}`);
    } else if (optionType === "number") {
      customOptionsCallback(`${number}`);
    }
  };

  const handleUnitSelect = (unit: string) => {
    setCurrentUnit(unit);
    if (optionType === "length") {
      customOptionsCallback(`${number}${unit}`);
    }
    setOpen(false);
  };

  const isCustomValue = !globalCssOptions.includes(currentUnit);
  if (optionType === "length" && !clearLayout) {
    return Length({
      number,
      setNumber,
      customOptionsCallback,
      currentUnit,
      open,
      setOpen,
      handleUnitSelect,
      isCustomValue,
    });
  } else if (optionType === "number" && !clearLayout) {
    return NumberInput({ number, setNumber, customOptionsCallback, isRange });
  } else if (optionType === "text" && !clearLayout) {
    return TextInput({
      string: number,
      setString: setNumber,
      customOptionsCallback,
      isDoubleQuotesText,
    });
  }
  return <div></div>;
}
