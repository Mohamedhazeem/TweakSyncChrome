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
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Style } from "@/types/styleTypes";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { getButtonText } from "@/utils/styles/getButtonTextForPopver";
import { useClearLayoutContext } from "@/utils/elementContext";
import { sortOptions } from "@/utils/sortOptions";
import { globalCssOptions } from "@/utils/styles/globalStyles";

type PopOverType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  style?: Style;
  handleSelect: (newValue: string) => void;
  isCustomValue: boolean;
  isCaptilized?: boolean;
  option: string;
};

export default function PopOver({
  open,
  setOpen,

  style,
  handleSelect,
  isCustomValue,
  isCaptilized,
  option,
}: PopOverType) {
  const clearLayout = useClearLayoutContext();
  const globalCss = (Array.isArray(style?.options) ? style.options : []).filter((opt) =>
    globalCssOptions.includes(opt)
  );
  const specificCss = (Array.isArray(style?.options) ? style.options : []).filter(
    (opt) => !globalCssOptions.includes(opt)
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-7 flex items-center justify-center px-4 py-2"
        >
          <span className="flex-grow text-center">
            {getButtonText(clearLayout ? "" : option, style!, true)}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search Options..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup heading={specificCss && `${style?.nameForTitle} Options`}>
              {sortOptions(specificCss).map((ops) => (
                <CommandItem
                  key={ops}
                  value={ops}
                  onSelect={(currentValue) => handleSelect(currentValue)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      (ops === "custom" && isCustomValue) || ops === option
                        ? clearLayout
                          ? "opacity-0"
                          : "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {isCaptilized ? capitalizeFirstLetter(ops) : ops}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />
            <CommandGroup heading="Global CSS">
              {sortOptions(globalCss).map((ops) => (
                <CommandItem
                  key={ops}
                  value={ops}
                  onSelect={(currentValue) => handleSelect(currentValue)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      (ops === "custom" && isCustomValue) || ops === option
                        ? clearLayout
                          ? "opacity-0"
                          : "opacity-100"
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
