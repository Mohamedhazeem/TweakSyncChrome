import { useState } from "react";
// import { useAttributeContext } from "@/utils/attributesContext";
import { ChevronsUpDown } from "lucide-react";
// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { GLOBAL_ATTRIBUTES } from "@/utils/attributes/globalAttributes";
import { Attribute } from "@/types/attributeTypes";

interface AddAttributeProps {
  setAttributes: React.Dispatch<React.SetStateAction<Attribute[] | undefined>>;
  addAttribute: (newAttributeName: string) => void;
}
function AddAttribute({ setAttributes, addAttribute }: AddAttributeProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>();
  // const context = useAttributeContext();
  // Ensure context and context.attribute are defined
  // if (!context || !context.attribute) {
  //   return <div>Loading...</div>; // or some fallback UI
  // }

  // const options = context.attribute.options;
  // const nameForTitle = context.attribute.nameForTitle;

  const handleSelect = (newValue: string) => {
    setValue(newValue === value ? "" : newValue);
    setAttributes((prevAttributes) => {
      const newAttribute = GLOBAL_ATTRIBUTES.find(
        (attr) => attr.name === newValue
      );

      if (
        newAttribute &&
        (!prevAttributes ||
          !prevAttributes.some((attr) => attr.name === newAttribute.name))
      ) {
        addAttribute(newAttribute.name);
        return prevAttributes
          ? [...prevAttributes, newAttribute]
          : [newAttribute];
      }

      return prevAttributes || [];
    });

    setOpen(false);
    // if (context) context.onChange(context.index!, newValue);
  };

  // const getButtonText = (): string => {
  //   if (value && options) {
  //     if (typeof options === "object" && !Array.isArray(options)) {
  //       const selectedKey = Object.keys(options).find(
  //         (key) => options[key] === value
  //       );
  //       return selectedKey
  //         ? capitalizeFirstLetter(selectedKey)
  //         : `Select ${nameForTitle}...`;
  //     } else {
  //       return `Select ${nameForTitle}...`;
  //     }
  //   }
  //   return `Select ${nameForTitle}...`;
  // };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {/* {getButtonText()} */}
          Add Attributes
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search attributes..." />
          <CommandList>
            {GLOBAL_ATTRIBUTES.map((attribute, index) => (
              <CommandGroup
                key={index}
                title={capitalizeFirstLetter(attribute.name)}
              >
                <CommandItem
                  key={attribute.name}
                  value={attribute.name}
                  onSelect={() => handleSelect(attribute.name)}
                >
                  {/* <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === attribute.name ? "opacity-100" : "opacity-0"
                    )}
                  /> */}
                  {capitalizeFirstLetter(attribute.name)}
                  {/* <span className="text-xs text-gray-500 ml-2">
                    - {attribute.description}
                  </span> */}
                </CommandItem>
              </CommandGroup>
            ))}
            {GLOBAL_ATTRIBUTES.length === 0 && (
              <CommandEmpty>No attributes found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default AddAttribute;
