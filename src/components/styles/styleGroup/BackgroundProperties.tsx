import MultiStyleOptionSetter from "../styleComponents/MultiStyleOptionSetter";
import Color from "../styleComponents/Color";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";
import Position from "../styleComponents/Position";

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
      <Position name="background-position-x" />
      <Position name="background-position-y" />
      <MultiStyleOptionSetter name="background-repeat" />
      <Position name="background-size" />
    </div>
  );
}

export default BackgroundProperties;
