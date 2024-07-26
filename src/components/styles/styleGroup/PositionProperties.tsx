import Position from "../styleComponents/Position";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function PositionProperties() {
  ["position", "top", "right", "bottom", "left", "z-index"];
  return (
    <div>
      <SingleStyleOptionSetter name="position" isCapitalized={true} />
      <Position name="top" />
      <Position name="right" />
      <Position name="bottom" />
      <Position name="left" />
      <Position name="z-index" />
    </div>
  );
}

export default PositionProperties;
