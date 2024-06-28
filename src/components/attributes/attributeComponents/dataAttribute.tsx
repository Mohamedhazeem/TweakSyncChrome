import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAttributeContext } from "@/utils/attributesContext";
import { ChangeEvent, useState, KeyboardEvent } from "react";

function DataAttribute() {
  const context = useAttributeContext();

  if (!context?.attribute) {
    return null;
  }

  const handleInputChange = (dataAttrName: string, newValue: string) => {
    if (context?.attribute && typeof context?.attribute?.value === "object") {
      const updatedValue = {
        ...context.attribute.value, // Ensure current value is preserved
        [dataAttrName]: newValue, // Update or add the specific data-* attribute
      };

      context.onChange(context.index!, updatedValue);
    }
  };

  return (
    <div key={context?.key} className="flex flex-col gap-2">
      {typeof context?.attribute?.value === "object" &&
      !Array.isArray(context?.attribute?.value) // Ensure value is an object
        ? Object.entries(context?.attribute?.value).map(
            ([key, value], index) => (
              <div>
                <div
                  key={index}
                  className="flex flex-col pt-1 gap-1 justify-center rounded-md bg-slate-300"
                >
                  <div className="flex justify-between px-2">
                    <Label htmlFor={key}>{`${String(key)}`}</Label>
                    <Button
                      size="sm"
                      className="bg-rose-600 rounded-xl text-xs p-1 w-4 h-4"
                    >
                      X
                    </Button>
                  </div>

                  <Input
                    type="text"
                    id={key}
                    value={`${String(value)}`}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                </div>
              </div>
            )
          )
        : String(context?.attribute?.value)}
    </div>
  );
}

export default DataAttribute;

interface DataInputProps {
  initialKey?: string;
  initialValue?: string;
  onKeyChange: (newKey: string) => void;
  onValueChange: (newValue: string) => void;
}

export const DataInput: React.FC<DataInputProps> = ({
  initialKey = "data-",
  initialValue = "",
  onKeyChange,
  onValueChange,
}) => {
  const prefix = "data-";
  const [key, setKey] = useState<string>(initialKey);
  const [value, setValue] = useState<string>(initialValue);

  const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newKey = e.target.value;
    // Ensure the prefix is persistent
    if (newKey.startsWith(prefix)) {
      setKey(newKey);
      // Pass only the user-defined part (after the prefix) to the parent
      onKeyChange(newKey.slice(prefix.length));
    } else {
      setKey(prefix);
    }
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onValueChange(newValue);
  };

  const handleKeyKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && key === prefix) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={key}
        onChange={handleKeyChange}
        onKeyDown={handleKeyKeyDown}
      />
      <input type="text" value={value} onChange={handleValueChange} />
    </div>
  );
};
