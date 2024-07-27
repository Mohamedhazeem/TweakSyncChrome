import Position from "../styleComponents/Position";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

// "line-height-step" (experimental not yet supported)
function LineProperties() {
  return (
    <div>
      <SingleStyleOptionSetter name="line-break" isCapitalized={true} />
      <Position name="line-height" />
    </div>
  );
}

export default LineProperties;
