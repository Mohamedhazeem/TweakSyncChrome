import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAttributeContext } from "@/utils/elementContext";
import { splitStringToArray } from "@/utils/splitStringToArray";
import { ATTRIBUTE_ENUMS } from "@/types/attributeTypes";

function ClassAttribute(attributeEnum: ATTRIBUTE_ENUMS) {
  const context = useAttributeContext();
  const [words, setWords] = useState<string[]>([]);
  const [previousWords, setPreviousWords] = useState<string[]>([]);

  useEffect(() => {
    if (context?.attribute?.value) {
      const initialWords = splitStringToArray(context.attribute.value.toString());
      setWords(initialWords);
      setPreviousWords(initialWords);
    }
  }, [context?.attribute]);

  if (!context?.attribute) {
    return null;
  }

  const handleInputChange = (wordIndex: number, newValue: string) => {
    const oldWord = previousWords[wordIndex];
    const newWord = newValue.trim();

    if (oldWord && oldWord !== newWord) {
      chrome.runtime.sendMessage({
        action: "renameSelector",
        oldSelector: attributeEnum == ATTRIBUTE_ENUMS.class ? `.${oldWord}` : `#${oldWord}`,
        newSelector: attributeEnum == ATTRIBUTE_ENUMS.class ? `.${newWord}` : `#${newWord}`,
      });
      const updatedPreviousWords = [...previousWords];
      updatedPreviousWords[wordIndex] = newWord;
      setPreviousWords(updatedPreviousWords);
    }
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const handleBlur = (word: string, wordIndex: number) => {
    const newWord = word.trim();
    const updatedPreviousWords = [...previousWords];
    updatedPreviousWords[wordIndex] = newWord;
    setPreviousWords(updatedPreviousWords);
    chrome.runtime.sendMessage({
      action: "addSelector",
      selector: attributeEnum == ATTRIBUTE_ENUMS.class ? `.${newWord}` : `#${newWord}`,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {words.map((word, wordIndex) => (
        <div key={`div-${wordIndex}`} className="flex gap-2 items-center">
          <Input
            type="text"
            value={word}
            onKeyDown={handleKeyDown}
            onBlur={() => handleBlur(word, wordIndex)}
            onChange={(e) => handleInputChange(wordIndex, e.target.value)}
            spellCheck="false"
          />
          <Button
            size="sm"
            className="bg-red-500 hover:bg-red-600 rounded-full text-xs p-1 w-4 h-4"
            onClick={() => handleRemoveClick(wordIndex)}
          >
            X
          </Button>
        </div>
      ))}
      {attributeEnum !== ATTRIBUTE_ENUMS.id ? (
        <Button
          size={"default"}
          onClick={handleAddWord}
          className="self-center addMultiPropertyOrAttribute hover:bg-green-600"
        >
          Add {context?.attribute?.nameForTitle}
        </Button>
      ) : words.length === 0 ? (
        (handleAddWord(), null)
      ) : null}
    </div>
  );
}

export default ClassAttribute;
