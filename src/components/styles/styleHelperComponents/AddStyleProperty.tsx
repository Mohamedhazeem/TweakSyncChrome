import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";
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
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { GLOBAL_STYLES } from "@/utils/styles/styles";
import { ElementStyles } from "@/types/elementTypes";

interface AddStylePropertyProps {
  selector: string;
  setStyles: React.Dispatch<React.SetStateAction<ElementStyles>>;
  addStyleProperty: (selector: string, property: string) => void;
}

function AddStyleProperty({ selector, setStyles, addStyleProperty }: AddStylePropertyProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>();

  const handleSelect = (property: string) => {
    setValue(property === value ? "" : property);
    setStyles((prevStyles) => {
      const newStyleProperty = GLOBAL_STYLES.find((style) => style.name === property);

      if (!newStyleProperty) {
        const updatedStyles = { ...prevStyles };

        if (selector === "inline") {
          updatedStyles.inline[property] = "";
        } else if (updatedStyles.external.classes[selector]) {
          updatedStyles.external.classes[selector][property] = "";
        } else if (updatedStyles.external.ids[selector]) {
          updatedStyles.external.ids[selector][property] = "";
        } else if (updatedStyles.external.tags[selector]) {
          updatedStyles.external.tags[selector][property] = "";
        } else if (updatedStyles.external.attribute[selector]) {
          updatedStyles.external.attribute[selector][property] = "";
        } else if (updatedStyles.external.descendant[selector]) {
          updatedStyles.external.descendant[selector][property] = "";
        } else if (updatedStyles.external.pseudoElementStyles[selector]) {
          updatedStyles.external.pseudoElementStyles[selector][property] = "";
        } else if (updatedStyles.external.pseudoClassStyles[selector]) {
          updatedStyles.external.pseudoClassStyles[selector][property] = "";
        } else if (updatedStyles.external.atRules[selector]) {
          for (const subSelector in updatedStyles.external.atRules[selector]) {
            updatedStyles.external.atRules[selector][subSelector][property] = "";
          }
        } else {
          updatedStyles.external.classes[selector] = {
            [property]: "",
          };
        }

        addStyleProperty(selector, property);
        return updatedStyles;
      }

      return prevStyles;
    });

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full">
          Add Style Property
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search style properties..." />
          <CommandList>
            <CommandGroup
              key="global-styles"
              heading="Global Styles"
              title="GLOBAL_STYLES"
              className="font-semibold"
            >
              {GLOBAL_STYLES.map((style, index) => (
                <div key={index}>
                  <CommandItem
                    className="pl-7"
                    title={style.description}
                    value={style.name}
                    onSelect={() => handleSelect(style.name)}
                  >
                    {capitalizeFirstLetter(style.name)}
                  </CommandItem>
                  <CommandSeparator />
                </div>
              ))}
            </CommandGroup>

            {GLOBAL_STYLES.length === 0 && <CommandEmpty>No style properties found.</CommandEmpty>}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default AddStyleProperty;
