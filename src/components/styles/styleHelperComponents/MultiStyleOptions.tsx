import React, { useEffect, useState } from "react";
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
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { splitStringToArray } from "@/utils/splitStringToArray";
import { Style } from "@/types/styleTypes";

interface MultiOptionsStyleProps {
  style: Style;
  customOptionsCallback: (newValue: string | boolean) => void;
}

const MultiStyleOptions: React.FC<MultiOptionsStyleProps> = ({ style, customOptionsCallback }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [optionCount, setOptionCount] = useState<number>(0);
  const nameForTitle = style.nameForTitle;
  const options = style.options;
  const maxOptionCounts = style.maxOptionCounts;

  useEffect(() => {
    if (style.value) {
      const initialOptions = splitStringToArray(style.value.toString());
      setSelectedOptions(initialOptions);
      setOptionCount(initialOptions.length);
    }
  }, [style]);

  const handleSelect = (index: number, newOption: string) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = newOption;
    setSelectedOptions(updatedOptions);
    const updatedValue = updatedOptions.join(", "); // Adjust for style property
    setOpenPopoverIndex(null);
    customOptionsCallback(updatedValue);
  };

  const handleRemoveClick = (index: number) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions.splice(index, 1);
    setSelectedOptions(updatedOptions);
    const updatedValue = updatedOptions.join(", "); // Adjust for style property
    customOptionsCallback(updatedValue);
  };

  const handleAddOption = () => {
    if (!maxOptionCounts) {
      setSelectedOptions([...selectedOptions, ""]);
    } else if (optionCount < maxOptionCounts) {
      setSelectedOptions([...selectedOptions, ""]);
      setOptionCount(optionCount + 1); // Update option count when adding option
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {selectedOptions.map((option, index) => (
        <div key={`option-${index}`} className="flex gap-2 items-center">
          <Popover
            open={openPopoverIndex === index}
            onOpenChange={(newOpenState) => setOpenPopoverIndex(newOpenState ? index : null)}
          >
            <PopoverTrigger asChild>
              <Button variant="outline" size="default" className="w-full justify-between">
                {option ? capitalizeFirstLetter(option) : `Select ${nameForTitle}`}
              </Button>
            </PopoverTrigger>
            {openPopoverIndex === index && (
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder={`Search ${nameForTitle}...`} />
                  <CommandList>
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandGroup>
                      {Array.isArray(options) &&
                        options!.map((opt) => (
                          <CommandItem
                            key={opt}
                            value={opt}
                            onSelect={() => handleSelect(index, opt)}
                          >
                            {capitalizeFirstLetter(opt)}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            )}
          </Popover>
          <Button
            size="sm"
            className="bg-rose-600 rounded-xl text-xs p-1 w-4 h-4"
            onClick={() => handleRemoveClick(index)}
          >
            X
          </Button>
        </div>
      ))}
      <Button
        size="default"
        onClick={handleAddOption}
        className="w-full self-center"
        disabled={maxOptionCounts ? optionCount >= maxOptionCounts : false}
      >
        Add {nameForTitle}
      </Button>
    </div>
  );
};

export default MultiStyleOptions;
