// import { useEffect, useState } from "react";
// import { useAttributeContext } from "@/utils/attributesContext";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

// function MultiOptionAttribute() {
//   const [open, setOpen] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
//   const context = useAttributeContext();
//   const options = context!.attribute.options;
//   const nameForTitle = context!.attribute.nameForTitle;

//   useEffect(() => {
//     if (context?.attribute?.value) {
//       const initialOptions = splitStringToArray(
//         context.attribute.value.toString()
//       );
//       setSelectedOptions(initialOptions);
//     }
//   }, [context?.attribute]);

//   if (!context?.attribute) {
//     return null;
//   }

//   function splitStringToArray(text: string): string[] {
//     const optionsArray = text.split(" ");
//     return optionsArray;
//   }

//   const handleSelect = (newOption: string) => {
//     const updatedOptions = [...selectedOptions, newOption];
//     setSelectedOptions(updatedOptions);
//     const updatedValue = updatedOptions.join(" ");
//     context.onChange(context.index!, updatedValue);
//     setOpen(false);
//   };

//   const handleRemoveClick = (optionIndex: number) => {
//     const updatedOptions = [...selectedOptions];
//     updatedOptions.splice(optionIndex, 1);
//     setSelectedOptions(updatedOptions);
//     const updatedValue = updatedOptions.join(" ");
//     context.onChange(context.index!, updatedValue);
//   };

//   return (
//     <div key={context?.key} className="flex flex-col gap-2">
//       {selectedOptions.map((option, optionIndex) => (
//         <div key={`div-${optionIndex}`} className="flex gap-2 items-center">
//           <span>{capitalizeFirstLetter(option)}</span>
//           <Button
//             size="sm"
//             className="bg-rose-600 rounded-xl text-xs p-1 w-4 h-4"
//             onClick={() => handleRemoveClick(optionIndex)}
//           >
//             X
//           </Button>
//         </div>
//       ))}
//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             variant="outline"
//             role="combobox"
//             aria-expanded={open}
//             className="w-[200px] justify-between"
//           >
//             Add {nameForTitle}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-[200px] p-0">
//           <Command>
//             <CommandInput placeholder={`Search ${nameForTitle}...`} />
//             <CommandList>
//               <CommandEmpty>No option found.</CommandEmpty>
//               <CommandGroup>
//                 {Array.isArray(options) &&
//                   options!.map((option) => (
//                     <CommandItem
//                       key={option}
//                       value={option}
//                       onSelect={(currentValue) => handleSelect(currentValue)}
//                     >
//                       {capitalizeFirstLetter(option)}
//                     </CommandItem>
//                   ))}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }

// export default MultiOptionAttribute;
import { useEffect, useState } from "react";
import { useAttributeContext } from "@/utils/elementContext";
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
import { ChevronsUpDown } from "lucide-react";

function MultiOptionsAttribute() {
  const context = useAttributeContext();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const name = context!.attribute.name;
  const options = context!.attribute.options;
  const nameForTitle = context!.attribute.nameForTitle;

  useEffect(() => {
    if (context?.attribute?.value) {
      const initialOptions = splitStringToArray(context.attribute.value.toString());
      setSelectedOptions(initialOptions);
    }
  }, [context?.attribute]);

  if (!context?.attribute) {
    return null;
  }

  const handleSelect = (index: number, newOption: string) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = newOption;
    setSelectedOptions(updatedOptions);
    let updatedValue = "";
    if (name === "accept") {
      updatedValue = updatedOptions.join(", ");
    } else {
      updatedValue = updatedOptions.join(" ");
    }
    setOpenPopoverIndex(null);
    context.onChange(context.index!, updatedValue);
  };

  const handleRemoveClick = (index: number) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions.splice(index, 1);
    setSelectedOptions(updatedOptions);
    const updatedValue = updatedOptions.join(" ");
    context.onChange(context.index!, updatedValue);
  };

  const handleAddOption = () => {
    setSelectedOptions([...selectedOptions, ""]);
  };

  return (
    <div key={context?.key} className="flex flex-col gap-2">
      {selectedOptions.map((option, index) => (
        <div key={`div-${index}`} className="flex gap-2 items-center">
          <Popover
            open={openPopoverIndex === index}
            onOpenChange={(newOpenState) => setOpenPopoverIndex(newOpenState ? index : null)}
          >
            <PopoverTrigger asChild>
              <Button variant="outline" size={"default"} className="w-full justify-between">
                {option ? capitalizeFirstLetter(option) : `Select ${nameForTitle}`}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
      <Button size={"default"} onClick={handleAddOption} className="min-w-32 max-w-48 self-center">
        Add {nameForTitle}
      </Button>
    </div>
  );
}

export default MultiOptionsAttribute;
