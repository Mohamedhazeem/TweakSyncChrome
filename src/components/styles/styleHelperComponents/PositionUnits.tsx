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
    if (optionType === "length") {
      if (unit) {
        setCurrentUnit(unit);
      } else {
        setCurrentUnit("px");
      }
    }
  }, [unit, optionType]);

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
  if (optionType === "length") {
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
  } else if (optionType === "number") {
    return NumberInput({ number, setNumber, customOptionsCallback });
  }
  return <div></div>;
}
