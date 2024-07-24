import MultiStyleOptionSetter from "../styleComponents/MultiStyleOptionSetter";
import Color from "../styleComponents/Color";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";
import Position from "../styleComponents/Position";

// background
// background-image
// background-position (add edge offset and multiple image positions)
function BackgroundGroup() {
  return (
    <div>
      <MultiStyleOptionSetter name="background-attachment" />
      <MultiStyleOptionSetter name="background-blend-mode" />
      <SingleStyleOptionSetter name="background-clip" />
      <Color colorProp="background-color" />
      {/* <MultiStyleOptionSetter name="background-image" /> */}
      <SingleStyleOptionSetter name="background-origin" />
      <Position name="background-position-x" />
      <Position name="background-position-y" />
      <MultiStyleOptionSetter name="background-repeat" />
      <Position name="background-size" />
    </div>
  );
}

export default BackgroundGroup;
