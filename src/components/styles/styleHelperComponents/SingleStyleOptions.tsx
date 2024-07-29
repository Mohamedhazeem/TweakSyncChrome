import { useEffect, useState } from "react";
import { useStyleContext } from "@/utils/elementContext";
import { IStyleContext, Style } from "@/types/styleTypes";
import { PopOver } from "./PopOver";
import { getButtonText } from "@/utils/styles/getButtonTextForPopver";
import { globalCssOptions } from "@/utils/styles/globalStyles";
import { isColor } from "@/utils/styles/colorUtils";
type Options = {
  style: Style;
  customOptionsCallback: (newValue: string | boolean) => void;
  isCapitalized?: boolean;
};
function SingleStyleOptions({ style, isCapitalized, customOptionsCallback }: Options) {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("");
  const { selector, onChange } = useStyleContext() as IStyleContext;

  useEffect(() => {
    if (style.value) {
      if (isColor(style.value)) {
        setOption("color");
      } else {
        setOption(style.value);
      }
    }
  }, [selector, style]);

  const handleSelect = (newValue: string) => {
    if (newValue == "color") {
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

  const isCustomValue = !globalCssOptions.includes(option);
  return (
    <>
      <PopOver
        open={open}
        setOpen={setOpen}
        getButtonText={getButtonText(option, style, isCapitalized || false)}
        style={style}
        handleSelect={handleSelect}
        isCustomValue={isCustomValue}
        isCaptilized={isCapitalized}
        option={option}
      />
    </>
  );
}
export default SingleStyleOptions;
