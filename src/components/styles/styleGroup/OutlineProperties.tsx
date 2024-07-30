import Color from "../styleComponents/Color";
import Position from "../styleComponents/Position";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function OutlineProperties() {
  return (
    <div className="inspector-component">
      <Color colorProp="outline-color" />
      <Position name="outline-offset" />
      <SingleStyleOptionSetter name="outline-style" isCapitalized={true} />
      <Position name="outline-width" />
    </div>
  );
}

export default OutlineProperties;
