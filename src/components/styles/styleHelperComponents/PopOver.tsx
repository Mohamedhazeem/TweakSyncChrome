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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Style } from "@/types/styleTypes";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

type PopOverType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getButtonText: string;
  style?: Style;
  handleSelect: (newValue: string) => void;
  isCustomValue: boolean;
  isCaptilized?: boolean;
  option: string;
};

export function PopOver({
  open,
  setOpen,
  getButtonText,
  style,
  handleSelect,
  isCustomValue,
  isCaptilized,
  option,
}: PopOverType) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-7"
        >
          {getButtonText}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search Options..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {style &&
                style.options &&
                Array.isArray(style.options) &&
                style.options.map((ops) => (
                  <CommandItem
                    key={ops}
                    value={ops}
                    onSelect={(currentValue) => handleSelect(currentValue)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        (ops === "custom" && isCustomValue) || ops === option
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />

                    {isCaptilized ? capitalizeFirstLetter(ops) : ops}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
