import MultiStyleOptionSetter from "../styleComponents/MultiStyleOptionSetter";
import Color from "../styleComponents/Color";

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
      <MultiStyleOptionSetter backgroundProp="background-attachment" />
      <MultiStyleOptionSetter backgroundProp="background-blend-mode" />
      <Color colorProp="background-color" />
    </div>
  );
}

export default BackgroundGroup;
