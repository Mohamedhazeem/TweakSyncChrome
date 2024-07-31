import { Textarea } from "@/components/ui/textarea";
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
  return (
    <div className="positionAndUnits">
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
      />
    </div>
  );
}
