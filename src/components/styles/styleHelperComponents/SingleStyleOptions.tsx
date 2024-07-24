import { useEffect, useState } from "react";
import { useStyleContext } from "@/utils/elementContext";
// import { Check, ChevronsUpDown } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { IStyleContext, Style } from "@/types/styleTypes";
import { PopOver } from "./PopOver";
import { getButtonText } from "@/utils/styles/getButtonTextForPopver";
import { globalCssOptions } from "@/utils/styles/globalStyles";
type Options = {
  style: Style;
  customOptionsCallback: (newValue: string | boolean) => void;
};
function SingleStyleOptions({ style, customOptionsCallback }: Options) {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("");
  const { selector, onChange } = useStyleContext() as IStyleContext;
  //   const options = context!.attribute.options;
  //   const nameForTitle = context!.attribute.nameForTitle;

  useEffect(() => {
    if (style.value) {
      setOption(style.value);
    }
  }, [selector, style]);

  const handleSelect = (newValue: string) => {
    if (newValue == "custom") {
      customOptionsCallback(true);
    } else {
      customOptionsCallback(false);
      if (style.name) {
        onChange(selector, style.name, newValue);
      }
    }
    setOption(newValue);
    setOpen(false);
  };
  // const getButtonText = (): string => {
  //   if (option && style.options) {
  //     if (Array.isArray(style.options)) {
  //       const selectedIndex = style.options.indexOf(option);
  //       return selectedIndex !== -1
  //         ? capitalizeFirstLetter(style.options[selectedIndex])
  //         : `${capitalizeFirstLetter(style.options[0])}`;
  //     } else {
  //       console.error("Unexpected options type:", typeof style.options);
  //       return `Select ${style.nameForTitle}...`;
  //     }
  //   }
  //   return `Select...`;
  // };

  const isCustomValue = !globalCssOptions.includes(option);
  return (
    // <Popover open={open} onOpenChange={setOpen}>
    //   <PopoverTrigger asChild>
    //     <Button
    //       variant="outline"
    //       role="combobox"
    //       aria-expanded={open}
    //       className="w-full justify-between"
    //     >
    //       {getButtonText()}
    //       <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    //     </Button>
    //   </PopoverTrigger>
    //   <PopoverContent className="w-full p-0">
    //     <Command>
    //       <CommandInput placeholder="Search Options..." />
    //       <CommandList>
    //         <CommandEmpty>No option found.</CommandEmpty>
    //         <CommandGroup>
    //           {style.options &&
    //             Array.isArray(style.options) &&
    //             style.options.map((ops) => (
    //               <CommandItem
    //                 key={ops}
    //                 value={ops}
    //                 onSelect={(currentValue) => handleSelect(currentValue)}
    //               >
    //                 <Check
    //                   className={cn(
    //                     "mr-2 h-4 w-4",
    //                     (ops === "custom" && isCustomValue) || ops === option
    //                       ? "opacity-100"
    //                       : "opacity-0"
    //                   )}
    //                 />
    //                 {capitalizeFirstLetter(ops)}
    //               </CommandItem>
    //             ))}
    //         </CommandGroup>
    //       </CommandList>
    //     </Command>
    //   </PopoverContent>
    // </Popover>
    <PopOver
      open={open}
      setOpen={setOpen}
      getButtonText={getButtonText(option, style, false)}
      style={style}
      handleSelect={handleSelect}
      isCustomValue={isCustomValue}
      isCaptilized={true}
      option={option}
    />
  );
}
export default SingleStyleOptions;
