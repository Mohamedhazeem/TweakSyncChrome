import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";
import Position from "../styleComponents/Position";
import MultiStyleOptionSetter from "../styleComponents/MultiStyleOptionSetter";
function FlexGroup() {
  return (
    <div>
      <Position name="flex-basis" />
      <SingleStyleOptionSetter name="flex-direction" />
      <MultiStyleOptionSetter name="flex-flow" />
      <Position name="flex-grow" />
      <Position name="flex-shrink" />
      <SingleStyleOptionSetter name="flex-wrap" />
    </div>
  );
}

export default FlexGroup;
