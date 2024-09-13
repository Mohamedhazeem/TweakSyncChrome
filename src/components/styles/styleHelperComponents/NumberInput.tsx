import { Input } from "@/components/ui/input";
type NumberInputType = {
  newValue: string;
  setNewValue: React.Dispatch<React.SetStateAction<string>>;
  customOptionsCallback: (newValue: string) => void;
  sign?: string;
  isRange?: boolean;
  isSupportNegativeValue?: boolean;
};
export function NumberInput({
  newValue,
  setNewValue,
  customOptionsCallback,
  sign,
  isRange,
  isSupportNegativeValue,
}: NumberInputType) {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    if (!isSupportNegativeValue && parseFloat(inputValue) < 0) {
      inputValue = "0";
    }
    setNewValue(inputValue);
    customOptionsCallback(
      inputValue !== ""
        ? sign
          ? isRange
            ? inputValue + sign
            : inputValue + sign
          : inputValue
        : ""
    );
  };
  return (
    <div className="positionAndUnits">
      <Input
        className={`${isRange ? "p-0" : ""}`}
        type={`${isRange ? "range" : "number"}`}
        min={`${isRange ? "0" : undefined}`}
        max={`${isRange ? "1" : undefined}`}
        step={`${isRange ? "0.01" : ""}`}
        value={newValue}
        onChange={handleValueChange}
      />
      {isRange && <p className="rangeCount">{newValue}</p>}
    </div>
  );
}
