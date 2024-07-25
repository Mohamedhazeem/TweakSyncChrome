import Color from "../styleComponents/Color";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function ColorGroup() {
  return (
    <div>
      <Color colorProp="color" />
      <SingleStyleOptionSetter name="color-scheme" />
    </div>
  );
}

export default ColorGroup;
