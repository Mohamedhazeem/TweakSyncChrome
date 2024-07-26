import { Input } from "@/components/ui/input";
type NumberInputType = {
  number: string;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  customOptionsCallback: (newValue: string) => void;
  sign?: string;
  isRange?: boolean;
};
export function NumberInput({
  number,
  setNumber,
  customOptionsCallback,
  sign,
  isRange,
}: NumberInputType) {
  return (
    <div className="flex gap-2 items-center w-full">
      <Input
        className={`${isRange ? "p-0" : ""}`}
        type={`${isRange ? "range" : "number"}`}
        min={`${isRange ? "0" : undefined}`}
        max={`${isRange ? "1" : undefined}`}
        step={`${isRange ? "0.01" : ""}`}
        value={number}
        onChange={(e) => {
          setNumber(e.target.value);
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
      {isRange && <p className="w-8 h-6 text-center text-sm border-2">{number}</p>}
    </div>
  );
}
