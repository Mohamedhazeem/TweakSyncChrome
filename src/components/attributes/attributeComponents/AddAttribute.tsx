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
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { GLOBAL_ATTRIBUTES } from "@/utils/attributes/globalAttributes";
import { Attribute } from "@/types/attributeTypes";
import { ELEMENT_SPECIFIC_ATTRIBUTES } from "@/utils/attributes/elementSpecificAttributes";

interface AddAttributeProps {
  selectedAttributeName: string;
  setAttributes: React.Dispatch<React.SetStateAction<Attribute[] | undefined>>;
  addAttribute: (newAttributeName: string) => void;
}
function AddAttribute({ selectedAttributeName, setAttributes, addAttribute }: AddAttributeProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>();

  const handleSelect = (newValue: string) => {
    setValue(newValue === value ? "" : newValue);
    setAttributes((prevAttributes) => {
      const newAttribute = GLOBAL_ATTRIBUTES.find((attr) => attr.name === newValue);

      if (
        newAttribute &&
        (!prevAttributes || !prevAttributes.some((attr) => attr.name === newAttribute.name))
      ) {
        addAttribute(newAttribute.name);
        return prevAttributes ? [...prevAttributes, newAttribute] : [newAttribute];
      }

      return prevAttributes || [];
    });

    setOpen(false);
  };
  const groupedAttributes: { [key: string]: Attribute[] } = {};

  Object.entries(ELEMENT_SPECIFIC_ATTRIBUTES).forEach(([key, value]) => {
    if (key === selectedAttributeName) {
      if (groupedAttributes[key.toUpperCase()]) {
        groupedAttributes[key.toUpperCase()] = [...groupedAttributes[key], ...value];
      } else {
        groupedAttributes[key.toUpperCase()] = [...value];
      }
    }
  });
  GLOBAL_ATTRIBUTES.forEach((attribute) => {
    const groupName = attribute.name.startsWith("aria-") ? "ARIA" : "GLOBAL_ATTRIBUTES";
    if (!groupedAttributes[groupName]) {
      groupedAttributes[groupName] = [];
    }
    groupedAttributes[groupName].push(attribute);
  });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="w-full flex items-center justify-center">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="addStyleProperty"
          >
            Add Attributes
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search attributes..." />
          <CommandList>
            {Object.keys(groupedAttributes).map((groupName, groupIndex) => (
              <CommandGroup
                key={groupIndex}
                heading={groupName}
                title={groupName}
                className="font-semibold "
              >
                {groupedAttributes[groupName].map((attribute, index) => (
                  <CommandItem
                    key={index}
                    className="pl-7"
                    title={attribute.description}
                    value={attribute.name}
                    onSelect={() => handleSelect(attribute.name)}
                  >
                    {capitalizeFirstLetter(attribute.name)}
                  </CommandItem>
                ))}
                <CommandSeparator />
              </CommandGroup>
            ))}
            {GLOBAL_ATTRIBUTES.length === 0 && <CommandEmpty>No attributes found.</CommandEmpty>}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default AddAttribute;
