import { IStyleContext } from "@/types/styleTypes";
import { useStyleContext } from "@/utils/elementContext";
import { useEffect, useState } from "react";
import MultiStyleOptions from "../styleHelperComponents/MultiStyleOptions";

type BackgroundProps = {
  backgroundProp: string;
};
const MultiStyleOptionSetter = ({ backgroundProp }: BackgroundProps) => {
  const { selector, group, onChange } = useStyleContext() as IStyleContext;

  const [, setAttachment] = useState<string>("");
  const style = group?.groups.find((style) => style.name === backgroundProp);

  useEffect(() => {
    if (style && style.value) {
      setAttachment(style.value);
    }
  }, [style]);

  const handleBackgroundAttachment = (newValue: string | boolean) => {
    if (style) {
      if (typeof newValue === "string") {
        onChange(selector, style.name, newValue);
        setAttachment(newValue);
      } else {
        console.warn("Unexpected boolean value for color interpolation");
      }
    }
  };

  return (
    <div>
      <span className="flex flex-col gap-1">
        {style && style.options && (
          <MultiStyleOptions style={style} customOptionsCallback={handleBackgroundAttachment} />
        )}
      </span>
    </div>
  );
};

export default MultiStyleOptionSetter;
