import { Input } from "@/components/ui/input";

type NumberInputType = {
  number: string;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  customOptionsCallback: (newValue: string) => void;
  sign?: string;
};
export function NumberInput({ number, setNumber, customOptionsCallback, sign }: NumberInputType) {
  return (
    <Input
      type="number"
      value={number}
      onChange={(e) => {
        setNumber(e.target.value);
        customOptionsCallback(
          `${e.target.value != "" ? (sign ? e.target.value + sign : e.target.value) : ""}`
        );
      }}
    />
  );
}
