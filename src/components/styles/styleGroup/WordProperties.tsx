import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";
import Position from "../styleComponents/Position";

function WordProperties() {
  return (
    <div className="inspector-component">
      <SingleStyleOptionSetter name="word-break" isCapitalized={true} />
      <Position name="word-spacing" />
    </div>
  );
}

export default WordProperties;
