import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useAttributeContext } from "@/utils/elementContext";

function StringAttribute() {
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
    <div key={context?.key} className="flex flex-col gap-2">
      <div key={`div-${context?.key}`} className="flex gap-2 items-center">
        <Input
          type="text"
          value={sentence}
          onChange={(e) => handleInputChange(e.target.value)}
          autoFocus
          spellCheck="false"
        />
      </div>
    </div>
  );
}

export default StringAttribute;
