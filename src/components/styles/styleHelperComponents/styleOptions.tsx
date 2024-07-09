import { useEffect, useState } from "react";
import { useStyleContext } from "@/utils/attributesContext";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Style } from "@/types/styleTypes";
import { globalCssOptions } from "@/utils/styles/styles";
type Options = {
  style: Style;
  customOptionsCallback: (newValue: string | boolean) => void;
};
function StyleOptions({ style, customOptionsCallback }: Options) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const context = useStyleContext();
  //   const options = context!.attribute.options;
  //   const nameForTitle = context!.attribute.nameForTitle;

  useEffect(() => {
    if (context?.value) {
      setValue(context?.value as string);
    }
  }, [context?.selector]);

  const handleSelect = (newValue: string) => {
    if (newValue == "custom") {
      customOptionsCallback(true);
    } else {
      customOptionsCallback(false);
      if (context)
        context.onChange(context.selector!, context.property, newValue);
    }
    setValue(newValue);
    setOpen(false);
  };
  const getButtonText = (): string => {
    if (value && style.options) {
      if (Array.isArray(style.options)) {
        const selectedIndex = style.options.indexOf(value);
        return selectedIndex !== -1
          ? capitalizeFirstLetter(style.options[selectedIndex])
          : `${capitalizeFirstLetter(style.options[0])}`;
      } else {
        console.error("Unexpected options type:", typeof style.options);
        return `Select ${style.nameForTitle}...`;
      }
    }
    return `Select ${style.nameForTitle}...`;
  };

  const isCustomValue = !globalCssOptions.includes(value);
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
          <CommandInput placeholder="Search options..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {Array.isArray(style.options) &&
                style.options!.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={(currentValue) => handleSelect(currentValue)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        (option === "custom" && isCustomValue) ||
                          value === option
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
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
export default StyleOptions;
