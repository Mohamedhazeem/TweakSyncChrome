import MultiStyleOptionSetter from "../styleComponents/MultiStyleOptionSetter";
import Color from "../styleComponents/Color";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";
import DynamicOptionSetter from "../styleComponents/DynamicOptionSetter";
import MultiDynamicOptionSetter from "../styleComponents/MultiDynamicOptionSetter";

// background-image
// background-position (add edge offset and multiple image positions)
function BackgroundProperties() {
  return (
    <div className="inspector-component">
      <MultiStyleOptionSetter name="background-attachment" isComma={true} />
      <MultiStyleOptionSetter name="background-blend-mode" isComma={true} />
      <SingleStyleOptionSetter name="background-clip" isCapitalized={true} />
      <Color colorProp="background-color" />
      <SingleStyleOptionSetter name="background-image" isCapitalized={true} />
      <SingleStyleOptionSetter name="background-origin" isCapitalized={true} />
      <MultiDynamicOptionSetter name="background-position" isSupportNegativeValue={false} />
      {/* <DynamicOptionSetter name="background-position-x" />
      <DynamicOptionSetter name="background-position-y" /> */}
      <MultiStyleOptionSetter name="background-repeat" />
      <DynamicOptionSetter name="background-size" />
    </div>
  );
}

export default BackgroundProperties;
