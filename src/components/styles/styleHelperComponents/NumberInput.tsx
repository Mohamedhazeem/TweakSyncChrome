import { Input } from "@/components/ui/input";
type NumberInputType = {
  newValue: string;
  setNewValue: React.Dispatch<React.SetStateAction<string>>;
  customOptionsCallback: (newValue: string) => void;
  sign?: string;
  isRange?: boolean;
};
export function NumberInput({
  newValue,
  setNewValue,
  customOptionsCallback,
  sign,
  isRange,
}: NumberInputType) {
  return (
    <div className="positionAndUnits">
      <Input
        className={`${isRange ? "p-0" : ""}`}
        type={`${isRange ? "range" : "number"}`}
        min={`${isRange ? "0" : undefined}`}
        max={`${isRange ? "1" : undefined}`}
        step={`${isRange ? "0.01" : ""}`}
        value={newValue}
        onChange={(e) => {
          setNewValue(e.target.value);
          customOptionsCallback(
            `${
              e.target.value != ""
                ? sign
                  ? isRange
                    ? e.target.value + sign
                    : e.target.value + sign
                  : e.target.value
                : ""
            }`
          );
        }}
      />
      {isRange && <p className="rangeCount">{newValue}</p>}
    </div>
  );
}
