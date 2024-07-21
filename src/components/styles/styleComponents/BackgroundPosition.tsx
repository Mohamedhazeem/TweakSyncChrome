import { useEffect, useState } from "react";
import { useStyleContext } from "@/utils/elementContext";
import { IStyleContext } from "@/types/styleTypes";
import { globalCssOptions } from "@/utils/styles/styles";
import { BackgroundPositionGroup } from "../styleHelperComponents/BackgroundPositionUnitsGroup";
import { PopOver } from "../styleHelperComponents/PopOver";
import { getButtonText } from "@/utils/styles/getButtonTextForPopver";
import StyleLayout from "../StyleLayout";

type BackgroundPositionType = {
  // style: Style;
  // customOptionsCallback: (newValue: string) => void;
  name: string;
};
export function BackgroundPosition({ name }: BackgroundPositionType) {
  const { selector, onChange, group } = useStyleContext() as IStyleContext;

  const style = group?.groups.find((style) => style.name === name);
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("");

  useEffect(() => {
    if (!option && style!.value) {
      setOption(style!.value);
    } else if (option === "percentage" || option === "length") return;
  }, [selector, style, option]);

  const handleSelect = (newValue: string) => {
    if (style && style.name) {
      onChange(selector, style.name, newValue);
    }
    setOption(newValue);
    setOpen(false);
  };
  const handleValueChange = (newValue: string) => {
    if (style && style.name) {
      onChange(selector, style.name, newValue);
    }
  };

  const isCustomValue = !globalCssOptions.includes(option);
  return (
    <div>
      {style && (
        <StyleLayout style={style}>
          <span className="flex flex-col gap-1">
            <div className="flex flex-col gap-2 items-center">
              <div key={`option-${option}`} className="flex gap-2 items-center w-full">
                <PopOver
                  open={open}
                  setOpen={setOpen}
                  getButtonText={getButtonText(option, style!, true)}
                  style={style}
                  handleSelect={handleSelect}
                  isCustomValue={isCustomValue}
                  isCaptilized={true}
                  option={option}
                />
              </div>
              {
                <BackgroundPositionGroup
                  optionType={option}
                  customOptionsCallback={handleValueChange}
                />
              }
            </div>
          </span>
        </StyleLayout>
      )}
    </div>
  );
}
