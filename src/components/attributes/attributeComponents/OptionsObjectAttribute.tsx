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
// import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

function OptionsObjectAttribute() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const context = useAttributeContext();
  // const attributeValue = context!.attribute.value;
  const options = context!.attribute.options;
  const nameForTitle = context!.attribute.nameForTitile;

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
      if (typeof options === "object" && !Array.isArray(options)) {
        const selectedKey = Object.keys(options).find(
          (key) => options[key] === value
        );
        return selectedKey ? selectedKey : `Select ${nameForTitle}...`;
      } else {
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
          className="w-[200px] justify-between"
        >
          {getButtonText()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {typeof options === "object" &&
                Object.entries(options).map(([key, value], index) => (
                  <CommandItem
                    key={index}
                    value={key}
                    onSelect={() => handleSelect(value)}
                  >
                    {/* <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                /> */}
                    {key}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
export default OptionsObjectAttribute;
