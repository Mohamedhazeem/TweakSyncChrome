// Example data structure for grouped attributes
import { useState } from "react";
// import { useAttributeContext } from "@/utils/attributesContext";
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
const groupedAttributes = [
  {
    category: "aria-*",
    attributes: [
      {
        name: "aria-label",
        description: "Defines a string value that labels the element",
      },
      {
        name: "aria-hidden",
        description: "Indicates that the element is not visible or perceivable",
      },
    ],
  },
  {
    category: "Global Attributes",
    attributes: [
      {
        name: "class",
        description:
          "Specifies one or more class names for an element (refers to a class in a style sheet)",
      },
      { name: "id", description: "Specifies a unique id for an element" },
      // Add more global attributes as needed
    ],
  },
  // Add more categories as needed
];

function AddAttribute() {
  const [open, setOpen] = useState(false);
  //   const [value, setValue] = useState("");
  //   const context = useAttributeContext();
  //   const options = context!.attribute.options;
  //   const nameForTitle = context!.attribute.nameForTitile;

  //   useEffect(() => {
  //     if (context?.attribute?.value) {
  //       setValue(context?.attribute?.value as string);
  //     }
  //   }, [context?.attribute]);

  //   const handleSelect = (newValue: string) => {
  //     setValue(newValue === value ? "" : newValue);
  //     setOpen(false);
  //     if (context) context.onChange(context.index!, newValue);
  //   };

  //   const getButtonText = (): string => {
  //     if (value && options) {
  //       if (Array.isArray(options)) {
  //         const selectedIndex = options.indexOf(value);
  //         return selectedIndex !== -1
  //           ? capitalizeFirstLetter(options[selectedIndex])
  //           : `Select ${nameForTitle}...`;
  //       } else {
  //         console.error("Unexpected options type:", typeof options);
  //         return `Select ${nameForTitle}...`;
  //       }
  //     }
  //     return `Select ${nameForTitle}...`;
  //   };

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
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search attributes..." />
          <CommandList>
            {groupedAttributes.map((group, groupIndex) => (
              <CommandGroup key={groupIndex} title={group.category}>
                {group.attributes.map((attribute, index) => (
                  <CommandItem
                    key={index}
                    value={attribute.name}
                    // onSelect={(currentValue) => handleSelect(currentValue)}
                  >
                    {capitalizeFirstLetter(attribute.name)}
                    <span className="text-xs text-gray-500 ml-2">
                      - {attribute.description}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
            {groupedAttributes.length === 0 && (
              <CommandEmpty>No attributes found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default AddAttribute;
