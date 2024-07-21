import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { PopOver } from "./PopOver";
import { getButtonText } from "@/utils/styles/getButtonTextForPopver";
import { globalCssOptions, Length } from "@/utils/styles/styles";

type BackgroundPositionGroupType = {
  optionType: string;
  customOptionsCallback: (newValue: string) => void;
};

export function BackgroundPositionGroup({
  optionType,
  customOptionsCallback,
}: BackgroundPositionGroupType) {
  const [number, setNumber] = useState<string>();
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("");

  useEffect(() => {
    handleApplyUnitChanges();

    return () => {
      handleApplyUnitChanges();
    };
  }, [optionType, option]);

  const handleApplyUnitChanges = () => {
    if (optionType === "percentage") {
      customOptionsCallback(`${number}%`);
    } else if (optionType === "length") {
      customOptionsCallback(`${number + option}`);
    }
  };
  const handleSelect = (newValue: string) => {
    setOption(newValue);
    setOpen(false);
  };
  // re check this Custom value needed?
  const isCustomValue = !globalCssOptions.includes(option);
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
            customOptionsCallback(`${e.target.value + option}`);
          }}
        />
        <PopOver
          open={open}
          setOpen={setOpen}
          getButtonText={getButtonText(option, Length, false)}
          style={Length}
          handleSelect={handleSelect}
          isCustomValue={isCustomValue}
          isCaptilized={false}
          option={option}
        />
      </div>
    );
  }
  return <div></div>;
}
