import { NumberInput } from "./NumberInput";
import { PopOver } from "./PopOver";
import { LengthUnit } from "@/utils/styles/globalStyles";

type Length = {
  newValue: string;
  setNewValue: React.Dispatch<React.SetStateAction<string>>;
  customOptionsCallback: (newValue: string) => void;
  currentUnit: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUnitSelect: (newValue: string) => void;
  isCustomValue: boolean;
};
export function Length({
  newValue,
  setNewValue,
  customOptionsCallback,
  currentUnit,
  open,
  setOpen,
  handleUnitSelect,
  isCustomValue,
}: Length) {
  return (
    <div className="flex gap-2">
      <NumberInput
        newValue={newValue}
        setNewValue={setNewValue}
        customOptionsCallback={customOptionsCallback}
        sign={currentUnit != "length" ? currentUnit : "px"}
      />
      <PopOver
        open={open}
        setOpen={setOpen}
        style={LengthUnit}
        handleSelect={handleUnitSelect}
        isCustomValue={isCustomValue}
        isCaptilized={false}
        option={currentUnit != "length" ? currentUnit : "px"}
      />
    </div>
  );
}
