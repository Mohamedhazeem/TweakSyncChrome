import { useState, useEffect } from "react";
import { globalCssOptions } from "@/utils/styles/globalStyles";
import { NumberInput } from "./NumberInput";
import { Length } from "./Length";

type PositionUnitType = {
  optionType: string;
  value: string;
  unit: string;
  customOptionsCallback: (newValue: string) => void;
};

export function PositionUnits({
  optionType,
  value,
  unit,
  customOptionsCallback,
}: PositionUnitType) {
  const [number, setNumber] = useState<string>(value);
  const [currentUnit, setCurrentUnit] = useState<string>(unit);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setNumber(value);
  }, [value]);

  useEffect(() => {
    setCurrentUnit(unit);
  }, [unit]);

  useEffect(() => {
    handleApplyUnitChanges();
  }, [number, currentUnit]);

  const handleApplyUnitChanges = () => {
    if (optionType === "percentage") {
      customOptionsCallback(`${number}%`);
    } else if (optionType === "length") {
      customOptionsCallback(`${number}${currentUnit}`);
    } else if (optionType === "number") {
      customOptionsCallback(`${number}`);
    }
  };

  const handleSelect = (newValue: string) => {
    setCurrentUnit(newValue);
    setOpen(false);
  };

  const isCustomValue = !globalCssOptions.includes(currentUnit);

  if (optionType === "percentage") {
    return NumberInput({ number, setNumber, customOptionsCallback, sign: "%" });
  } else if (optionType === "length") {
    return Length({
      number,
      setNumber,
      customOptionsCallback,
      currentUnit,
      open,
      setOpen,
      handleSelect,
      isCustomValue,
    });
  } else if (optionType === "number") {
    return NumberInput({ number, setNumber, customOptionsCallback });
  }
  return <div></div>;
}
