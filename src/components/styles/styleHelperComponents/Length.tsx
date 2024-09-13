import { lazy, Suspense } from "react";
import { NumberInput } from "./NumberInput";
import { LengthUnit } from "@/utils/styles/globalStyles";
const PopOver = lazy(() => import("./PopOver"));

type Length = {
  newValue: string;
  setNewValue: React.Dispatch<React.SetStateAction<string>>;
  customOptionsCallback: (newValue: string) => void;
  currentUnit: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUnitSelect: (newValue: string) => void;
  isCustomValue: boolean;
  isSupportNegativeValue?: boolean;
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
  isSupportNegativeValue,
}: Length) {
  return (
    <div className="flex gap-1">
      <NumberInput
        newValue={newValue}
        setNewValue={setNewValue}
        customOptionsCallback={customOptionsCallback}
        isSupportNegativeValue={isSupportNegativeValue}
        sign={currentUnit != "length" ? currentUnit : "px"}
      />
      <Suspense fallback={<div></div>}>
        <PopOver
          open={open}
          setOpen={setOpen}
          style={LengthUnit}
          handleSelect={handleUnitSelect}
          isCustomValue={isCustomValue}
          isCaptilized={false}
          option={currentUnit != "length" ? currentUnit : "px"}
        />
      </Suspense>
    </div>
  );
}
