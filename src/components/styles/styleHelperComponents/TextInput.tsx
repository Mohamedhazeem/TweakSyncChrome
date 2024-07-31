import { Textarea } from "@/components/ui/textarea";
// import { extractString } from "@/utils/styles/extractUnits";
type TextInputType = {
  string: string;
  setString: React.Dispatch<React.SetStateAction<string>>;
  customOptionsCallback: (newValue: string) => void;
};
export function TextInput({ string, setString, customOptionsCallback }: TextInputType) {
  return (
    <div className="positionAndUnits">
      <Textarea
        className="resize-none"
        placeholder="Type your message here."
        id="message"
        value={string ? string : ""}
        onChange={(e) => {
          setString(`${e.target.value}`);
          customOptionsCallback(`"${e.target.value}"`);
        }}
      />
    </div>
  );
}
