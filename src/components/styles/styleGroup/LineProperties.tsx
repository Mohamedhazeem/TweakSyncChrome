import Position from "../styleComponents/Position";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

// "line-height-step" (experimental not yet supported)
function LineProperties() {
  return (
    <div className="inspector-component">
      <SingleStyleOptionSetter name="line-break" isCapitalized={true} />
      <Position name="-webkit-line-clamp" />
      <Position name="line-height" />
    </div>
  );
}

export default LineProperties;
