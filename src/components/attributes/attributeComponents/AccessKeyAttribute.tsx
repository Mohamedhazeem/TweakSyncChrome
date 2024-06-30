import { useEffect, useState } from "react";
import { useAttributeContext } from "@/utils/attributesContext";
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
      return "p-2 bg-green-400 text-white border border-green-700 hover:bg-green-500";
    } else {
      return "p-2 bg-blue-400 text-white hover:bg-blue-500";
    }
  };

  return (
    <div key={context?.key} className="flex flex-col gap-2">
      <div key={`div-${context?.key}`} className="flex flex-col gap-2">
        {/* Numbers */}
        {numberOptions.length > 0 && (
          <div className="grid grid-cols-5 gap-2 ">
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
          <div className="grid grid-cols-5 gap-2">
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
