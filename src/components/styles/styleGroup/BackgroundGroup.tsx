import MultiStyleOptionSetter from "../styleComponents/MultiStyleOptionSetter";
import Color from "../styleComponents/Color";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

// background
// background-attachment
// background-blend-mode
// background-clip
// background-color
// background-image
// background-origin
// background-position
// background-position-x
// background-position-y
// background-repeat
// background-size
function BackgroundGroup() {
  return (
    <div>
      <MultiStyleOptionSetter name="background-attachment" />
      <MultiStyleOptionSetter name="background-blend-mode" />
      <SingleStyleOptionSetter name="background-clip" />
      <Color colorProp="background-color" />
      <MultiStyleOptionSetter name="background-image" />
      <SingleStyleOptionSetter name="background-origin" />

      <MultiStyleOptionSetter name="background-repeat" />
    </div>
  );
}

export default BackgroundGroup;
