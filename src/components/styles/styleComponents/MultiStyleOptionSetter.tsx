import { IStyleContext } from "@/types/styleTypes";
import { useStyleContext } from "@/utils/elementContext";
import { useEffect } from "react";
import MultiStyleOptions from "../styleHelperComponents/MultiStyleOptions";
import StyleLayout from "../StyleLayout";

type MultiStyleOptionSetterProps = {
  name: string;
};
const MultiStyleOptionSetter = ({ name }: MultiStyleOptionSetterProps) => {
  const { selector, group, onChange } = useStyleContext() as IStyleContext;

  // const [, setAttachment] = useState<string>("");
  const style = group?.groups.find((style) => style.name === name);

  useEffect(() => {
    if (style && style.value) {
      // setAttachment(style.value);
    }
  }, [style]);

  const handleMultiStyleOption = (newValue: string | boolean) => {
    if (style) {
      if (typeof newValue === "string") {
        onChange(selector, style.name, newValue);
        // setAttachment(newValue);
      } else {
        console.warn("Unexpected boolean value for color interpolation");
      }
    }
  };

  return (
    <div>
      {style && (
        <StyleLayout style={style}>
          <span className="flex flex-col gap-1">
            <MultiStyleOptions style={style} customOptionsCallback={handleMultiStyleOption} />
          </span>
        </StyleLayout>
      )}
    </div>
  );
};

export default MultiStyleOptionSetter;
