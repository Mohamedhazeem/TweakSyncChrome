import { IStyleContext } from "@/types/styleTypes";
import { useStyleContext } from "@/utils/elementContext";
import MultiStyleOptions from "../styleHelperComponents/MultiStyleOptions";
import StyleLayout from "../StyleLayout";

type MultiStyleOptionSetterProps = {
  name: string;
  isComma?: boolean;
};
const MultiStyleOptionSetter = ({ name, isComma }: MultiStyleOptionSetterProps) => {
  const { selector, group, onChange } = useStyleContext() as IStyleContext;
  const style = group?.groups.find((style) => style.name === name);

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
          <MultiStyleOptions
            style={style}
            customOptionsCallback={handleMultiStyleOption}
            isComma={isComma}
          />
        </StyleLayout>
      )}
    </div>
  );
};

export default MultiStyleOptionSetter;
