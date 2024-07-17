import { IStyleContext } from "@/types/styleTypes";
import { useStyleContext } from "@/utils/elementContext";
import { useEffect, useState } from "react";
import StyleOptions from "../styleHelperComponents/StyleOptions";
import StyleLayout from "../StyleLayout";
type SingleStyleOptionSetterProps = {
  name: string;
};
const SingleStyleOptionSetter = ({ name }: SingleStyleOptionSetterProps) => {
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
      } else {
        console.warn("Unexpected boolean value");
      }
    }
  };

  return (
    <div>
      {style && (
        <StyleLayout style={style}>
          <span className="flex flex-col gap-1">
            <StyleOptions style={style} customOptionsCallback={handleSingleStyleOption} />
          </span>
        </StyleLayout>
      )}
    </div>
  );
};

export default SingleStyleOptionSetter;
