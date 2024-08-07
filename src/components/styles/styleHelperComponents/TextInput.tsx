import { Textarea } from "@/components/ui/textarea";
// import { extractString } from "@/utils/styles/extractUnits";
type TextInputType = {
  newValue: string;
  setNewValue: React.Dispatch<React.SetStateAction<string>>;
  customOptionsCallback: (newValue: string) => void;
  isDoubleQuotesText?: boolean;
};
export function TextInput({
  newValue,
  setNewValue,
  customOptionsCallback,
  isDoubleQuotesText,
}: TextInputType) {
  return (
    <div className="positionAndUnits">
      <Textarea
        className="resize-y"
        placeholder="Type your message here."
        id="message"
        value={newValue || ""}
        onChange={(e) => {
          const value = e.target.value;
          setNewValue(value);
          customOptionsCallback(isDoubleQuotesText ? `"${value}"` : value);
        }}
      />
    </div>
  );
}
