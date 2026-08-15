import { IStyleContext } from "@/types/styleTypes";
import { useStyleContext } from "@/utils/elementContext";
import StyleLayout from "../StyleLayout";
import MultiDynamicOptions from "../styleHelperComponents/MultiDynamicOptions";

type MultiStyleOptionSetterProps = {
  name: string;
  isSupportNegativeValue?: boolean;
};
const MultiDynamicOptionSetter = ({
  name,
  isSupportNegativeValue = true,
}: MultiStyleOptionSetterProps) => {
  const { selector, group, onChange } = useStyleContext() as IStyleContext;
  const style = group?.groups.find((style) => style.name === name);

  const handleMultiStyleOption = (newValue: string | boolean) => {
    if (style) {
      if (typeof newValue === "string") {
        onChange(selector, style.name, newValue);
        // setAttachment(newValue);
      } else {
        console.log("Unexpected boolean value for color interpolation");
      }
    }
  };

  return (
    <div>
      {style && (
        <StyleLayout style={style}>
          <MultiDynamicOptions
            style={style}
            customOptionsCallback={handleMultiStyleOption}
            isSupportNegativeValue={isSupportNegativeValue}
          />
        </StyleLayout>
      )}
    </div>
  );
};

export default MultiDynamicOptionSetter;
