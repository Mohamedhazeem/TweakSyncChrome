import { getButtonText } from "@/utils/styles/getButtonTextForPopver";
import { NumberInput } from "./NumberInput";
import { PopOver } from "./PopOver";
import { LengthUnit } from "@/utils/styles/globalStyles";

type Length = {
  number: string;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  customOptionsCallback: (newValue: string) => void;
  currentUnit: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelect: (newValue: string) => void;
  isCustomValue: boolean;
};
export function Length({
  number,
  setNumber,
  customOptionsCallback,
  currentUnit,
  open,
  setOpen,
  handleSelect,
  isCustomValue,
}: Length) {
  return (
    <div className="flex gap-2">
      <NumberInput
        number={number}
        setNumber={setNumber}
        customOptionsCallback={customOptionsCallback}
        sign={currentUnit ? currentUnit : "px"}
      />
      <PopOver
        open={open}
        setOpen={setOpen}
        getButtonText={getButtonText(currentUnit, LengthUnit, false)}
        style={LengthUnit}
        handleSelect={handleSelect}
        isCustomValue={isCustomValue}
        isCaptilized={false}
        option={currentUnit ? currentUnit : "px"}
      />
    </div>
  );
}
