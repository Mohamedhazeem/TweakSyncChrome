import { useEffect, useState } from "react";
import { useAttributeContext } from "@/utils/attributesContext";
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

function OptionsAttribute() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const context = useAttributeContext();
  const options = context!.attribute.options;
  const nameForTitle = context!.attribute.nameForTitle;

  useEffect(() => {
    if (context?.attribute?.value) {
      setValue(context?.attribute?.value as string);
    }
  }, [context?.attribute]);

  const handleSelect = (newValue: string) => {
    setValue(newValue === value ? "" : newValue);
    setOpen(false);
    if (context) context.onChange(context.index!, newValue);
  };
  const getButtonText = (): string => {
    if (value && options) {
      if (Array.isArray(options)) {
        const selectedIndex = options.indexOf(value);
        return selectedIndex !== -1
          ? capitalizeFirstLetter(options[selectedIndex])
          : `Select ${nameForTitle}...`;
      } else {
        console.error("Unexpected options type:", typeof options);
        return `Select ${nameForTitle}...`;
      }
    }
    return `Select ${nameForTitle}...`;
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {/* {value && options && Array.isArray(options)
            ? capitalizeFirstLetter(
                options.find((option) => option === value) || ""
              )
            : "Select Role..."} */}
          {getButtonText()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {Array.isArray(options) &&
                options!.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={(currentValue) => handleSelect(currentValue)}
                  >
                    {/* <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  /> */}
                    {capitalizeFirstLetter(option)}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
export default OptionsAttribute;
