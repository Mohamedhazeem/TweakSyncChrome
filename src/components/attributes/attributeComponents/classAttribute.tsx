import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { IAttributeContext } from "@/types/attributeTypes";
import { useAttributeContext } from "@/utils/attributesContext";
import { useEffect, useState } from "react";
function ClassAttribute() {
  const context = useAttributeContext();
  const [words, setWords] = useState<string[]>([]);
  useEffect(() => {
    if (context?.attribute?.value) {
      setWords(splitStringToArray(context.attribute.value.toString()));
    }
  }, [context?.attribute]);
  if (!context?.attribute) {
    return null;
  }
  function splitStringToArray(text: string): string[] {
    const words = text.split(" ");
    return words;
  }
  const handleInputChange = (wordIndex: number, newValue: string) => {
    const updatedWords = [...words];
    updatedWords[wordIndex] = newValue;
    setWords(updatedWords);
    const updatedValue = updatedWords.join(" ");
    context.onChange(context.index!, updatedValue);
  };

  const handleRemoveClick = (wordIndex: number) => {
    const updatedWords = [...words];
    updatedWords.splice(wordIndex, 1);
    setWords(updatedWords);
    const updatedValue = updatedWords.join(" ");
    context.onChange(context.index!, updatedValue);
  };
  return (
    <div key={context?.key}>
      {words.map((word, wordIndex) => (
        <div key={`div-${wordIndex}`} className="flex gap-2 place-items-center">
          <Input
            type="text"
            value={word}
            onChange={(e) => handleInputChange(wordIndex, e.target.value)}
          />
          <Button
            size="sm"
            className="bg-rose-600 rounded-xl"
            onClick={() => handleRemoveClick(wordIndex)}
          >
            X
          </Button>
        </div>
      ))}
    </div>
  );
}

export default ClassAttribute;
