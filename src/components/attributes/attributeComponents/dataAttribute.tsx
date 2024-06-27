import { Input } from "@/components/ui/input";
import { useAttributeContext } from "@/utils/attributesContext";

function DataAttribute() {
  const context = useAttributeContext();

  if (!context?.attribute) {
    return null;
  }

  const handleInputChange = (dataAttrName: string, newValue: string) => {
    if (context?.attribute && typeof context?.attribute?.value === "object") {
      const updatedValue = {
        ...context.attribute.value, // Ensure current value is preserved
        [dataAttrName]: newValue, // Update or add the specific data-* attribute
      };

      context.onChange(context.index!, updatedValue);
    }
  };

  return (
    <div key={context?.key}>
      {typeof context?.attribute?.value === "object" &&
      !Array.isArray(context?.attribute?.value) // Ensure value is an object
        ? Object.entries(context?.attribute?.value).map(
            ([key, value], index) => (
              <div key={index}>
                <Input
                  type="text"
                  value={`${key} ${String(value)}`}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              </div>
            )
          )
        : String(context?.attribute?.value)}
    </div>
  );
}

export default DataAttribute;
