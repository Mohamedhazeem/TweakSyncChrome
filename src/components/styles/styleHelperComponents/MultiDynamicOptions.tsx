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
import { extractUnit, extractValue } from "@/utils/styles/extractUnits"; // Utility for extracting value and unit
import { Style } from "@/types/styleTypes";
import { ChevronsUpDown } from "lucide-react";
import { useClearLayoutContext } from "@/utils/elementContext";
import { sortOptions } from "@/utils/sortOptions";
import { dynamicOptions, globalCssOptions, lengthUnits } from "@/utils/styles/globalStyles";
import { DynamicOptions } from "./DynamicOptions";
import { presetColors } from "@/utils/styles/colorUtils";

interface MultiDynamicOptionsProps {
  style: Style;
  customOptionsCallback: (newValue: string | boolean) => void;
  isDoubleQuotesText?: boolean;
  isRange?: boolean;
  isSupportNegativeValue?: boolean;
}

const MultiDynamicOptions: React.FC<MultiDynamicOptionsProps> = ({
  style,
  customOptionsCallback,
  isDoubleQuotesText,
  isRange,
  isSupportNegativeValue,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [values, setValues] = useState<string[]>([]);
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [optionCount, setOptionCount] = useState<number>(0);
  const [styleValue, setStyleValue] = useState<string>("");

  const clearLayout = useClearLayoutContext();
  const nameForTitle = style.nameForTitle;
  const options = style.options;
  const maxOptionCounts = style.maxOptionCounts;
  useEffect(() => {
    if (clearLayout) {
      setSelectedOptions([]);
      setValues([]);
      setOptionCount(0);
      setStyleValue("");
    } else if (style?.value) {
      const newStyleValue = style.value.trim();
      if (newStyleValue !== styleValue) {
        // const initialValues = newStyleValue.split(" ");
        const initialValues =
          newStyleValue.match(/(rgba?\(.*?\)|hsla?\(.*?\)|#[0-9a-fA-F]{3,6}|[^\s]+)/g) || [];
        const initialOptions = initialValues.map((val) => getOptionFromValue(val));

        setSelectedOptions(initialOptions);
        setValues(initialValues);
        setOptionCount(initialValues.length);
        setStyleValue(newStyleValue);
      }
    }
  }, [style?.value, clearLayout, styleValue]);

  function getOptionFromValue(value: string): string {
    if (isDoubleQuotesText) {
      return "text";
    }
    const preset = presetColors.find(
      (preset) => preset.title.toLowerCase() === value.toLowerCase()
    );
    if (
      value.startsWith("rgb") ||
      value.startsWith("rgba") ||
      value.startsWith("hsl") ||
      value.startsWith("hsla") ||
      value.startsWith("#") ||
      preset
    ) {
      return "color"; // Add this case to handle color values
    }
    const lengthUnitRegex = new RegExp(`^\\d+(\\.\\d+)?(${lengthUnits.join("|")})$`);
    if (lengthUnitRegex.test(value)) {
      return "length";
    }
    const numberRegex = new RegExp(`^[+-]?\\d+(\\.\\d+)?$`);
    if (numberRegex.test(value)) {
      return "number";
    }
    if (globalCssOptions.includes(value)) {
      return value;
    }

    return value;
  }

  const handleSelect = (index: number, newOption: string) => {
    // Create a copy of the selected options
    console.log(`index: ${index}`);
    console.log(`newOption: ${newOption}`);
    const updatedOptions = [...selectedOptions];
    console.log(`updatedOptions: ${updatedOptions}`);
    updatedOptions[index] = newOption;
    console.log(`updatedOptions add: ${updatedOptions}`);

    // Create a copy of the values to ensure it reflects the updated options
    const updatedValues = updatedOptions.map((opt, i) => {
      // Check if the option is dynamic or global CSS value and update accordingly
      if (dynamicOptions.includes(opt)) {
        if (opt === "color") {
          return values[i] && !globalCssOptions.includes(values[i]) ? values[i] : "#ffffff"; // Keep the color as a whole
        } else if (opt === "length") {
          return values[i] && !globalCssOptions.includes(values[i]) ? values[i] : "0px"; // Default for length
        } else if (opt === "number") {
          return values[i] && !globalCssOptions.includes(values[i]) ? values[i] : "0"; // Default for number
        } else {
          return values[i] && !globalCssOptions.includes(values[i]) ? values[i] : ""; // Default for other dynamic options
        }
        // Use the existing value or an empty string
      } else if (globalCssOptions.includes(opt)) {
        // If it's a global CSS value, we don't want to store it in `values`
        return opt;
      }
      // Default case: return the option as-is if it's not dynamic or global CSS
      return opt;
    });
    console.log(`updatedValues: ${updatedValues}`);
    // Update state with new options and values
    setSelectedOptions(updatedOptions);
    setValues(updatedValues);

    // Close the popover and pass the joined values to the callback
    setOpenPopoverIndex(null);
    customOptionsCallback(updatedValues.join(" "));
  };

  const handleRemoveClick = (index: number) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions.splice(index, 1);

    const updatedValues = [...values];
    updatedValues.splice(index, 1);

    setSelectedOptions(updatedOptions);
    setValues(updatedValues);
    setOptionCount(updatedOptions.length);
    console.log(updatedOptions);
    console.log(updatedValues);
    customOptionsCallback(updatedValues.join(" "));
  };

  const handleAddOption = () => {
    console.log("Before adding:", { selectedOptions, values, optionCount });

    if (!maxOptionCounts || optionCount < maxOptionCounts) {
      // Add empty option and value
      const newOptions = [...selectedOptions, ""];
      const newValues = [...values, ""];

      setSelectedOptions(newOptions);
      setValues(newValues);
      setOptionCount(newOptions.length);

      console.log("After adding:", { newOptions, newValues });
    }
  };

  const handleValueChange = (index: number, newValue: string) => {
    const updatedValues = [...values];
    updatedValues[index] = newValue;
    setValues(updatedValues);

    customOptionsCallback(updatedValues.join(" "));
  };
  const labels = (style?.labels && style.labels[optionCount - 1]) || [];
  return (
    <div className="flex flex-col gap-1">
      {selectedOptions.map((option, index) => (
        <div className="flex flex-col gap-1 items-center" key={`option-${index}`}>
          <div className="w-full flex items-center text-start text-sm font-semibold">
            <div className="flex-1">{labels[index]}</div>{" "}
          </div>
          <div
            className={`flex gap-1 items-center w-full ${
              dynamicOptions.includes(option) ? "bg-slate-300 rounded-md p-1" : ""
            }`}
          >
            <div className={`w-full flex flex-col items-center gap-1`}>
              <Popover
                open={openPopoverIndex === index}
                onOpenChange={(newOpenState) => setOpenPopoverIndex(newOpenState ? index : null)}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="default"
                    className="w-full flex items-center justify-between h-7"
                  >
                    <span className="flex-1 text-center">
                      {option ? capitalizeFirstLetter(option) : `Select ${nameForTitle}`}
                    </span>
                    <ChevronsUpDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                {openPopoverIndex === index && (
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder={`Search Options...`} />
                      <CommandList>
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                          {Array.isArray(options) &&
                            sortOptions(options).map((opt) => (
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
              <DynamicOptions
                optionType={selectedOptions[index]}
                value={extractValue(values[index] || " ")}
                unit={extractUnit(values[index] || "px")}
                isRange={isRange}
                isDoubleQuotesText={isDoubleQuotesText}
                isSupportNegativeValue={isSupportNegativeValue}
                customOptionsCallback={(newValue) => handleValueChange(index, newValue)}
              />
            </div>
            <Button
              size="sm"
              className="bg-red-500 hover:bg-red-600 rounded-full text-xs p-1 w-5 h-5 flex items-center justify-center"
              onClick={() => handleRemoveClick(index)}
            >
              <span className="text-white">X</span>
            </Button>
          </div>
        </div>
      ))}
      <div className="w-full flex items-center justify-center">
        <Button
          size="sm"
          onClick={handleAddOption}
          className="h-7 self-center addMultiPropertyOrAttribute hover:bg-green-600"
          disabled={maxOptionCounts ? optionCount >= maxOptionCounts : false}
        >
          Add {nameForTitle}
        </Button>
      </div>
    </div>
  );
};

export default MultiDynamicOptions;
