import MultiStyleOptionSetter from "../styleComponents/MultiStyleOptionSetter";
import Color from "../styleComponents/Color";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";
import { BackgroundPosition } from "../styleComponents/BackgroundPosition";

// background
// background-image
// background-position
// background-size
function BackgroundGroup() {
  return (
    <div>
      <MultiStyleOptionSetter name="background-attachment" />
      <MultiStyleOptionSetter name="background-blend-mode" />
      <SingleStyleOptionSetter name="background-clip" />
      <Color colorProp="background-color" />
      {/* <MultiStyleOptionSetter name="background-image" /> */}
      <SingleStyleOptionSetter name="background-origin" />
      <BackgroundPosition name="background-position-x" />
      <BackgroundPosition name="background-position-y" />

      <MultiStyleOptionSetter name="background-repeat" />
    </div>
  );
}

export default BackgroundGroup;
