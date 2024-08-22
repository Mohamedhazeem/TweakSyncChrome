import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAttributeContext } from "@/utils/elementContext";
import { useState, useEffect } from "react";

type AttributeValue = { [key: string]: string };

function DataAttribute() {
  const context = useAttributeContext();
  const [attributes, setAttributes] = useState<AttributeValue>({});
  const [newAttrKey, setNewAttrKey] = useState<string>("data-");
  const [newAttrValue, setNewAttrValue] = useState<string>("");
  const [showAddFields, setShowAddFields] = useState<boolean>(false);

  useEffect(() => {
    if (context?.attribute?.value && typeof context.attribute.value === "object") {
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
    if (newAttrKey && newAttrValue && newAttrKey.startsWith("data-")) {
      handleInputChange(newAttrKey, newAttrValue);
      setNewAttrKey("data-");
      setNewAttrValue("");
      setShowAddFields(false);
    }
  };
  const handleCancelDataAttribute = () => {
    setShowAddFields(false);
    setNewAttrKey("data-");
    setNewAttrValue("");
  };
  const handleAttrNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    if (inputVal.startsWith("data-")) {
      setNewAttrKey(inputVal.toLowerCase());
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
            {key !== "data-temporaryid" && (
              <Button
                size="sm"
                className="bg-red-500 hover:bg-red-600 rounded-full text-xs p-1 w-4 h-4"
                onClick={() => handleRemoveClick(key)}
              >
                X
              </Button>
            )}
          </div>
          <Input
            type="text"
            id={key}
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            disabled={key == "data-temporaryid"}
          />
        </div>
      ))}

      {showAddFields && (
        <div className="flex flex-col gap-2 mt-2">
          <Input
            type="text"
            placeholder="Name (data-attribute)"
            value={newAttrKey}
            onChange={handleAttrNameChange}
          />
          <Input
            type="text"
            placeholder="Value"
            value={newAttrValue}
            onChange={(e) => setNewAttrValue(e.target.value)}
          />
          <div className="flex justify-between gap-1">
            <Button
              className="flex-grow"
              onClick={handleAddDataAttribute}
              disabled={!newAttrKey.startsWith("data-") || newAttrKey === "data-" || !newAttrValue}
            >
              Add
            </Button>
            <Button className="flex-grow" onClick={handleCancelDataAttribute}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      {!showAddFields && (
        <div className="w-full flex items-center justify-center">
          <Button
            onClick={() => setShowAddFields(true)}
            className="addMultiPropertyOrAttribute hover:bg-green-600"
          >
            Add Data Attribute
          </Button>
        </div>
      )}
    </div>
  );
}

export default DataAttribute;
