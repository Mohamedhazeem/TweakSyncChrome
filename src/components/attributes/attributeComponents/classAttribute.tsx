import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAttributeContext } from "@/utils/elementContext";
import { splitStringToArray } from "@/utils/splitStringToArray";

function ClassAttribute() {
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
      // renameSelector(`.${oldWord}`, `.${newWord}`);
      chrome.runtime.sendMessage({
        action: "renameSelector",
        oldSelector: `.${oldWord}`,
        newSelector: `.${newWord}`,
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
    // const oldWord = previousWords[wordIndex];
    const newWord = word.trim();
    // console.log(wordIndex);
    const updatedPreviousWords = [...previousWords];
    updatedPreviousWords[wordIndex] = newWord;
    setPreviousWords(updatedPreviousWords);
    // if (oldWord && oldWord !== newWord) {
    //   // renameSelector(`.${oldWord}`, `.${newWord}`);
    //   chrome.runtime.sendMessage({
    //     action: "renameSelector",
    //     oldSelector: `.${oldWord}`,
    //     newSelector: `.${newWord}`,
    //   });
    //   const updatedPreviousWords = [...previousWords];
    //   updatedPreviousWords[wordIndex] = newWord;
    //   setPreviousWords(updatedPreviousWords);
    // } else {

    // }
    chrome.runtime.sendMessage({
      action: "addSelector",
      selector: `.${newWord}`,
    });
  };

  return (
    <div key={context?.key} className="flex flex-col gap-2">
      {words.map((word, wordIndex) => (
        <div key={`div-${wordIndex}`} className="flex gap-2 items-center">
          <Input
            type="text"
            value={word}
            onKeyDown={handleKeyDown}
            onBlur={() => handleBlur(word, wordIndex)}
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
      <Button size={"default"} onClick={handleAddWord} className="min-w-32 max-w-48 self-center">
        Add {context?.attribute?.nameForTitle}
      </Button>
    </div>
  );
}

export default ClassAttribute;
