import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAttributeContext } from "@/utils/attributesContext";

function ClassAttribute() {
  const context = useAttributeContext();
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    if (context?.attribute?.value) {
      const initialWords = splitStringToArray(
        context.attribute.value.toString()
      );
      setWords(initialWords);
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

  const handleAddWord = () => {
    setWords([...words, ""]);
  };

  return (
    <div key={context?.key} className="flex flex-col gap-2">
      {words.map((word, wordIndex) => (
        <div key={`div-${wordIndex}`} className="flex gap-2 items-center">
          <Input
            type="text"
            value={word}
            onChange={(e) => handleInputChange(wordIndex, e.target.value)}
            autoFocus
            spellCheck="false"
          />
          <Button
            size="sm"
            className="bg-rose-600 rounded-xl text-xs p-1 w-4 h-4"
            onClick={() => handleRemoveClick(wordIndex)}
          >
            X
          </Button>
        </div>
      ))}
      <Button
        size={"default"}
        onClick={handleAddWord}
        className="min-w-32 max-w-48 self-center"
      >
        Add {context?.attribute?.nameForTitle}
      </Button>
    </div>
  );
}

export default ClassAttribute;
