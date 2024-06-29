import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAttributeContext } from "@/utils/attributesContext";
import { useState, useEffect } from "react";

type AttributeValue = { [key: string]: string };

function DataAttribute() {
  const context = useAttributeContext();
  const [attributes, setAttributes] = useState<AttributeValue>({});
  const [newAttrKey, setNewAttrKey] = useState<string>("data-");
  const [newAttrValue, setNewAttrValue] = useState<string>("");
  const [showAddFields, setShowAddFields] = useState<boolean>(false);

  useEffect(() => {
    if (
      context?.attribute?.value &&
      typeof context.attribute.value === "object"
    ) {
      setAttributes(context.attribute.value as AttributeValue);
    }
  }, [context?.attribute]);

  if (!context?.attribute) {
    return null;
  }

  const handleInputChange = (dataAttrName: string, newValue: string) => {
    const updatedAttributes = {
      ...attributes,
      [dataAttrName]: newValue,
    };
    setAttributes(updatedAttributes);
    context.onChange(context.index!, updatedAttributes);
  };

  const handleRemoveClick = (dataAttrName: string) => {
    const updatedAttributes = { ...attributes };
    delete updatedAttributes[dataAttrName];
    setAttributes(updatedAttributes); // Update state to trigger re-render
    context.onChange(context.index!, updatedAttributes); // Notify context about the change
  };

  const handleAddDataAttribute = () => {
    if (newAttrKey && newAttrValue) {
      handleInputChange(newAttrKey, newAttrValue);
      setNewAttrKey("data-");
      setNewAttrValue("");
      setShowAddFields(false);
    }
  };
  return (
    <div key={context?.key} className="flex flex-col gap-2">
      {Object.entries(attributes).map(([key, value], index) => (
        <div
          key={index}
          className="flex flex-col pt-1 gap-1 justify-center rounded-md bg-slate-300"
        >
          <div className="flex justify-between px-2">
            <Label htmlFor={key}>{key}</Label>
            <Button
              size="sm"
              className="bg-rose-600 rounded-xl text-xs p-1 w-4 h-4"
              onClick={() => handleRemoveClick(key)}
            >
              X
            </Button>
          </div>
          <Input
            type="text"
            id={key}
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
          />
        </div>
      ))}

      {showAddFields && (
        <div className="flex flex-col gap-2 mt-2">
          <Input
            type="text"
            placeholder="Name (data-attribute)"
            value={newAttrKey}
            onChange={(e) => setNewAttrKey(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Value"
            value={newAttrValue}
            onChange={(e) => setNewAttrValue(e.target.value)}
          />
          <Button onClick={handleAddDataAttribute}>Add</Button>
          <Button onClick={() => setShowAddFields(false)}>Cancel</Button>
        </div>
      )}
      {!showAddFields && (
        <Button onClick={() => setShowAddFields(true)}>
          Add Data Attribute
        </Button>
      )}
    </div>
  );
}

export default DataAttribute;

// interface DataInputProps {
//   initialKey?: string;
//   initialValue?: string;
//   onKeyChange: (newKey: string) => void;
//   onValueChange: (newValue: string) => void;
// }

// export const DataInput: React.FC<DataInputProps> = ({
//   initialKey = "data-",
//   initialValue = "",
//   onKeyChange,
//   onValueChange,
// }) => {
//   const prefix = "data-";
//   const [key, setKey] = useState<string>(initialKey);
//   const [value, setValue] = useState<string>(initialValue);

//   const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const newKey = e.target.value;
//     // Ensure the prefix is persistent
//     if (newKey.startsWith(prefix)) {
//       setKey(newKey);
//       // Pass only the user-defined part (after the prefix) to the parent
//       onKeyChange(newKey.slice(prefix.length));
//     } else {
//       setKey(prefix);
//     }
//   };

//   const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.target.value;
//     setValue(newValue);
//     onValueChange(newValue);
//   };

//   const handleKeyKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Backspace" && key === prefix) {
//       e.preventDefault();
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={key}
//         onChange={handleKeyChange}
//         onKeyDown={handleKeyKeyDown}
//       />
//       <input type="text" value={value} onChange={handleValueChange} />
//     </div>
//   );
// };
