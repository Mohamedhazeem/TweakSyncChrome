import { useEffect, useState } from "react";
import { useAttributeContext } from "@/utils/elementContext";
import { Button } from "@/components/ui/button";

function AccessKeyAttribute() {
  const context = useAttributeContext();
  const [character, setCharacter] = useState<string>();
  const attributeValue = context?.attribute?.value;
  const options = context?.attribute?.options as string[]; // Explicitly cast options as string[]

  useEffect(() => {
    if (attributeValue) {
      setCharacter(attributeValue as string);
    }
  }, [attributeValue]);

  if (!context?.attribute) {
    return null;
  }

  function isNumber(option: string): boolean {
    return !isNaN(Number(option));
  }

  const numberOptions = options.filter((option) => isNumber(option));
  const alphabetOptions = options.filter((option) => !isNumber(option));

  const handleButtonClick = (option: string) => {
    setCharacter(option === character ? "" : option);
    if (context) {
      context.onChange(context.index!, option === character ? "" : option);
    }
  };
  const getButtonClassName = (option: string): string => {
    if (option === character) {
      return "p-2 bg-green-500 text-black font-bold border-2 border-green-700 hover:bg-green-600";
    } else {
      return "p-2 bg-blue-500 text-white font-semibold hover:bg-blue-600";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        {numberOptions.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(45px,1fr))] gap-1">
            {numberOptions.map((option) => (
              <Button
                key={option}
                className={getButtonClassName(option)}
                onClick={() => handleButtonClick(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        )}
        <hr className="border-t-2 border-gray-500" />
        {alphabetOptions.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(45px,1fr))] gap-1">
            {alphabetOptions.map((option) => (
              <Button
                key={option}
                className={getButtonClassName(option)}
                onClick={() => handleButtonClick(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AccessKeyAttribute;
