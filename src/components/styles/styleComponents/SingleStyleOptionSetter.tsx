import { IStyleContext } from "@/types/styleTypes";
import { useStyleContext } from "@/utils/elementContext";
import { useEffect, useState } from "react";
import SingleStyleOptions from "../styleHelperComponents/SingleStyleOptions";
import StyleLayout from "../StyleLayout";
type SingleStyleOptionSetterProps = {
  name: string;
  isCapitalized?: boolean;
};
const SingleStyleOptionSetter = ({ name, isCapitalized }: SingleStyleOptionSetterProps) => {
  const { selector, group, onChange } = useStyleContext() as IStyleContext;

  const [, setOption] = useState<string>("");
  const style = group?.groups.find((style) => style.name === name);

  useEffect(() => {
    if (style && style.value) {
      setOption(style.value);
    } else {
      setOption("default");
    }
  }, [style]);

  const handleSingleStyleOption = (newValue: string | boolean) => {
    if (style) {
      if (typeof newValue === "string") {
        onChange(selector, style.name, newValue);
        setOption(newValue);
      }
    }
  };

  return (
    <div>
      {style && (
        <StyleLayout style={style}>
          <SingleStyleOptions
            style={style}
            isCapitalized={isCapitalized}
            customOptionsCallback={handleSingleStyleOption}
          />
        </StyleLayout>
      )}
    </div>
  );
};

export default SingleStyleOptionSetter;
