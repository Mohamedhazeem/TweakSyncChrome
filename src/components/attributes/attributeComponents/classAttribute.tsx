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
  const handleInputChange = (index: number, newValue: string) => {
    if (context?.attribute) {
      const words = splitStringToArray(context.attribute.value.toString());
      words[index] = newValue;
      const updatedValue = words.join(" ");
      context.onChange(index, updatedValue);
    }
  };
  return (
    <div key={context?.key}>
      {typeof context?.attribute?.type === "boolean" ||
      context?.attribute?.type === "string"
        ? splitStringToArray(context?.attribute?.value.toString()).map(
            (word, index) => (
              <Input
                key={index}
                type="text"
                value={word}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            )
          )
        : context?.attribute?.value}
    </div>
  );
}

export default ClassAttribute;
