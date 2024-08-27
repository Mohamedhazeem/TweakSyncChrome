import { useEffect, useState } from "react";
import { useAttributeContext } from "@/utils/elementContext";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  // CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

function OptionsObjectAttribute() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>();
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
      if (typeof options === "object" && !Array.isArray(options)) {
        const selectedKey = Object.keys(options).find((key) => options[key] === value);
        return selectedKey ? capitalizeFirstLetter(selectedKey) : `Select ${nameForTitle}...`;
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
          className="w-full justify-between"
        >
          {getButtonText()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandGroup>
              {typeof options === "object" &&
                Object.entries(options).map(([key, val], index) => (
                  <CommandItem
                    key={index}
                    value={capitalizeFirstLetter(key)}
                    onSelect={() => handleSelect(val)}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", value === val ? "opacity-100" : "opacity-0")}
                    />
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
