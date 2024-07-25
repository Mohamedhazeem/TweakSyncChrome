import Color from "../styleComponents/Color";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function ColorProperties() {
  return (
    <div>
      <Color colorProp="color" />
      <SingleStyleOptionSetter name="color-scheme" isCapitalized={true} />
    </div>
  );
}

export default ColorProperties;
