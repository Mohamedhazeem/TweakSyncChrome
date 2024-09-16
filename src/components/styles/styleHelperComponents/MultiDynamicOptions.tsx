import React, { useEffect, useState, useCallback, useMemo } from "react";
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
import { longHandDefaults, shorthandMap } from "@/utils/styles/shortHandStyles";

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
  const defaultValue = style.defaultValue;
  const supportedUnits = style.supportedUnit;
  const labels = useMemo(
    () => (style?.labels && style.labels[optionCount - 1]) || [],
    [style?.labels, optionCount]
  );
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
  const handleShorthandProperties = useCallback((options: string[], values: string[]) => {
    Object.entries(shorthandMap).forEach(([shorthand, longhands]) => {
      if (options.includes(shorthand)) {
        const shorthandIndex = options.indexOf(shorthand);
        longhands.forEach((longhand, index) => {
          if (longhand) {
            values[shorthandIndex * longhands.length + index] =
              values[shorthandIndex] || longHandDefaults[longhand] || "";
          }
        });
      }
    });
  }, []);
  const handleSelect = useCallback(
    (index: number, newOption: string) => {
      const updatedOptions = [...selectedOptions];
      updatedOptions[index] = newOption;

      const updatedValues = updatedOptions.map((opt, i) => {
        if (dynamicOptions.includes(opt)) {
          if (opt === "color") {
            if (Array.isArray(options)) {
              if (options.includes(values[i]) && values[i] != "color") {
                return "#ffffff";
              } else {
                return values[i] || "#ffffff";
              }
            }
          } else if (opt === "length") {
            if (Array.isArray(options)) {
              if (options.includes(values[i]) && values[i] != "length") {
                return defaultValue || "0px";
              } else {
                return values[i] || defaultValue || "0px";
              }
            }
          } else if (opt === "number") {
            if (Array.isArray(options)) {
              if (options.includes(values[i]) && values[i] != "number") {
                return defaultValue || "0";
              } else {
                return values[i] || defaultValue || "0";
              }
            }
          } else {
            return values[i] && !globalCssOptions.includes(values[i]) ? values[i] : "";
          }
        } else if (globalCssOptions.includes(opt)) {
          return opt;
        }
        return opt;
      });

      setSelectedOptions(updatedOptions);
      setValues(updatedValues);
      handleShorthandProperties(updatedOptions, updatedValues);
      setOpenPopoverIndex(null);
      customOptionsCallback(updatedValues.join(" "));
    },
    [selectedOptions, values, handleShorthandProperties, customOptionsCallback]
  );
  const handleRemoveClick = useCallback(
    (index: number) => {
      const updatedOptions = [...selectedOptions];
      updatedOptions.splice(index, 1);

      const updatedValues = [...values];
      updatedValues.splice(index, 1);

      setSelectedOptions(updatedOptions);
      setValues(updatedValues);
      setOptionCount(updatedOptions.length);
      customOptionsCallback(updatedValues.join(" "));
    },
    [selectedOptions, values, customOptionsCallback]
  );

  const handleAddOption = useCallback(() => {
    if (!maxOptionCounts || optionCount < maxOptionCounts) {
      // Add empty option and value
      const newOptions = [...selectedOptions, ""];
      const newValues = [...values, ""];

      setSelectedOptions(newOptions);
      setValues(newValues);
      setOptionCount(newOptions.length);
    }
  }, [maxOptionCounts, optionCount, selectedOptions, values]);

  // const handleValueChange = (index: number, newValue: string) => {
  //   const updatedValues = [...values];
  //   updatedValues[index] = newValue;
  //   setValues(updatedValues);

  //   customOptionsCallback(updatedValues.join(" "));
  // };

  const handleValueChange = useCallback(
    (index: number, newValue: string) => {
      const updatedValues = [...values];
      updatedValues[index] = newValue;
      setValues(updatedValues);

      // Handle shorthand properties
      handleShorthandProperties(selectedOptions, updatedValues);

      customOptionsCallback(updatedValues.join(" "));
    },
    [values, selectedOptions, handleShorthandProperties, customOptionsCallback]
  );
  // const labels = (style?.labels && style.labels[optionCount - 1]) || [];
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
                value={
                  selectedOptions[index] === "color"
                    ? values[index] // For color, use the whole value
                    : extractValue(values[index] || "0") // For other options, extract the value
                }
                unit={
                  selectedOptions[index] === "color"
                    ? "" // Colors don't need units
                    : extractUnit(values[index] || supportedUnits || "px") // Extract unit for other options
                }
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
