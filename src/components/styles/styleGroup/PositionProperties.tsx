import DynamicOptionSetter from "../styleComponents/DynamicOptionSetter";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function PositionProperties() {
  ["position", "top", "right", "bottom", "left", "z-index"];
  return (
    <div className="inspector-component">
      <SingleStyleOptionSetter name="position" isCapitalized={true} />
      <DynamicOptionSetter name="top" />
      <DynamicOptionSetter name="right" />
      <DynamicOptionSetter name="bottom" />
      <DynamicOptionSetter name="left" />
      <DynamicOptionSetter name="z-index" />
    </div>
  );
}

export default PositionProperties;
