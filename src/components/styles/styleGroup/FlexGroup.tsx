import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";
import Position from "../styleComponents/Position";
import MultiStyleOptionSetter from "../styleComponents/MultiStyleOptionSetter";

// flex-basis
// flex-direction
// flex-flow
// flex-grow
// flex-shrink
// flex-wrap
function FlexGroup() {
  return (
    <div>
      <Position name="flex-basis" />
      <SingleStyleOptionSetter name="flex-direction" />
      <MultiStyleOptionSetter name="flex-flow" />
      <SingleStyleOptionSetter name="flex-wrap" />
    </div>
  );
}

export default FlexGroup;
