import Position from "../styleComponents/Position";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function DisplayProperties() {
  return (
    <div>
      <SingleStyleOptionSetter name="display" isCapitalized={true} />
      <SingleStyleOptionSetter name="visibility" isCapitalized={true} />
      <Position name="opacity" isRange={true} />
    </div>
  );
}

export default DisplayProperties;
