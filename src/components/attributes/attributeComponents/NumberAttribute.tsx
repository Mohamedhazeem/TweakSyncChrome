import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useAttributeContext } from "@/utils/elementContext";

function NumberAttribute() {
  const context = useAttributeContext();
  const [sentence, setSentence] = useState<string>();

  useEffect(() => {
    if (context?.attribute?.value) {
      setSentence(context.attribute.value.toString());
    }
  }, [context?.attribute]);

  if (!context?.attribute) {
    return null;
  }

  const handleInputChange = (newValue: string) => {
    setSentence(newValue);
    context.onChange(context.index!, newValue);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Input
          type="number"
          value={sentence}
          onChange={(e) => handleInputChange(e.target.value)}
          autoFocus
        />
      </div>
    </div>
  );
}

export default NumberAttribute;
