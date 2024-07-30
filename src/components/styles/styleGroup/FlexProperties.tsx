import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";
import Position from "../styleComponents/Position";
import MultiStyleOptionSetter from "../styleComponents/MultiStyleOptionSetter";
function FlexProperties() {
  return (
    <div className="inspector-component">
      <Position name="flex-basis" />
      <SingleStyleOptionSetter name="flex-direction" isCapitalized={true} />
      <MultiStyleOptionSetter name="flex-flow" />
      <Position name="flex-grow" />
      <Position name="flex-shrink" />
      <SingleStyleOptionSetter name="flex-wrap" isCapitalized={true} />
    </div>
  );
}

export default FlexProperties;
