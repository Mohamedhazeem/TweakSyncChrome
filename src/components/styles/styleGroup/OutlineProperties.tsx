import Color from "../styleComponents/Color";
import DynamicOptionSetter from "../styleComponents/DynamicOptionSetter";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function OutlineProperties() {
  return (
    <div className="inspector-component">
      <Color colorProp="outline-color" />
      <DynamicOptionSetter name="outline-offset" />
      <SingleStyleOptionSetter name="outline-style" isCapitalized={true} />
      <DynamicOptionSetter name="outline-width" />
    </div>
  );
}

export default OutlineProperties;
