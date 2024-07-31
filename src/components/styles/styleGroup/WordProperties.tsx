import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";
import DynamicOptionSetter from "../styleComponents/DynamicOptionSetter";

function WordProperties() {
  return (
    <div className="inspector-component">
      <SingleStyleOptionSetter name="word-break" isCapitalized={true} />
      <DynamicOptionSetter name="word-spacing" />
    </div>
  );
}

export default WordProperties;
