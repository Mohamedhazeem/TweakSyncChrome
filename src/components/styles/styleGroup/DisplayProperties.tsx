import Position from "../styleComponents/Position";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function DisplayProperties() {
  return (
    <div className="inspector-component">
      <SingleStyleOptionSetter name="appearance" isCapitalized={true} />
      <SingleStyleOptionSetter name="display" isCapitalized={true} />
      <Position name="opacity" isRange={true} />
      <SingleStyleOptionSetter name="visibility" isCapitalized={true} />
    </div>
  );
}

export default DisplayProperties;
