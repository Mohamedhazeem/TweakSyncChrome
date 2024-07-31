import Color from "../styleComponents/Color";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function ColorProperties() {
  return (
    <div className="inspector-component">
      <Color colorProp="accent-color" />
      <Color colorProp="color" />
      <SingleStyleOptionSetter name="color-scheme" isCapitalized={true} />
    </div>
  );
}

export default ColorProperties;
