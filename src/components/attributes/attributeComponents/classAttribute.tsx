import { Input } from "@/components/ui/input";
// import { IAttributeContext } from "@/types/attributeTypes";
import { useAttributeContext } from "@/utils/attributesContext";
function ClassAttribute() {
  const context = useAttributeContext();
  if (!context?.attribute) {
    return null;
  }
  function splitStringToArray(text: string): string[] {
    const words = text.split(" ");
    return words;
  }
  const handleInputChange = (wordIndex: number, newValue: string) => {
    if (context?.attribute) {
      const words = splitStringToArray(context.attribute.value.toString());
      words[wordIndex] = newValue;
      const updatedValue = words.join(" ");
      context.onChange(context.index!, updatedValue);
    }
  };
  return (
    <div key={context?.key}>
      {typeof context?.attribute?.type === "boolean" ||
      context?.attribute?.type === "string"
        ? splitStringToArray(context?.attribute?.value.toString()).map(
            (word, wordIndex) => (
              <Input
                key={wordIndex}
                type="text"
                value={word}
                onChange={(e) => handleInputChange(wordIndex, e.target.value)}
              />
            )
          )
        : String(context?.attribute?.value)}
    </div>
  );
}

export default ClassAttribute;
