import DynamicOptionSetter from "../styleComponents/DynamicOptionSetter";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

// "line-height-step" (experimental not yet supported)
function LineProperties() {
  return (
    <div className="inspector-component">
      <SingleStyleOptionSetter name="line-break" isCapitalized={true} />
      <DynamicOptionSetter name="-webkit-line-clamp" />
      <DynamicOptionSetter name="line-height" />
    </div>
  );
}

export default LineProperties;
