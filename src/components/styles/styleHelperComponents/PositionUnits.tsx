import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { PopOver } from "./PopOver";
import { getButtonText } from "@/utils/styles/getButtonTextForPopver";
import { globalCssOptions, Length } from "@/utils/styles/globalStyles";

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
    }
  };

  const handleSelect = (newValue: string) => {
    setCurrentUnit(newValue);
    setOpen(false);
  };

  const isCustomValue = !globalCssOptions.includes(currentUnit);

  if (optionType === "percentage") {
    return (
      <div>
        <Input
          type="number"
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
            customOptionsCallback(`${e.target.value}%`);
          }}
        />
      </div>
    );
  } else if (optionType === "length") {
    return (
      <div className="flex gap-2">
        <Input
          type="number"
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
            customOptionsCallback(`${e.target.value}${currentUnit}`);
          }}
        />
        <PopOver
          open={open}
          setOpen={setOpen}
          getButtonText={getButtonText(currentUnit, Length, false)}
          style={Length}
          handleSelect={handleSelect}
          isCustomValue={isCustomValue}
          isCaptilized={false}
          option={currentUnit}
        />
      </div>
    );
  }
  return <div></div>;
}
