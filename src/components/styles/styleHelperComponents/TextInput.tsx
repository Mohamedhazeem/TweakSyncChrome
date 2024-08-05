import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useState } from "react";
// import { extractString } from "@/utils/styles/extractUnits";
type TextInputType = {
  string: string;
  setString: React.Dispatch<React.SetStateAction<string>>;
  customOptionsCallback: (newValue: string) => void;
  isDoubleQuotesText?: boolean;
};
export function TextInput({
  string,
  setString,
  customOptionsCallback,
  isDoubleQuotesText,
}: TextInputType) {
  const [isSpellCheckEnabled, setIsSpellCheckEnabled] = useState(false);
  const handleCheckedChange = (checked: CheckedState) => {
    if (checked === "indeterminate") {
      // Handle the indeterminate state if necessary
      setIsSpellCheckEnabled(false); // For simplicity, we'll treat it as unchecked
    } else {
      setIsSpellCheckEnabled(checked);
    }
  };
  return (
    <div className="positionAndUnits">
      <div className="flex gap-1">
        <Checkbox id="terms" checked={isSpellCheckEnabled} onCheckedChange={handleCheckedChange} />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Enable Spell Check
        </label>
      </div>
      <Textarea
        className="resize-y"
        placeholder="Type your message here."
        id="message"
        value={string || ""}
        onChange={(e) => {
          const value = e.target.value;
          setString(value);
          customOptionsCallback(isDoubleQuotesText ? `"${value}"` : value);
        }}
        spellCheck={isSpellCheckEnabled}
      />
    </div>
  );
}
