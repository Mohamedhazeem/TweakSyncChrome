import MultiStyleOptionSetter from "../styleComponents/MultiStyleOptionSetter";
import Position from "../styleComponents/Position";

function ContainProperties() {
  return (
    <div>
      <MultiStyleOptionSetter name="contain" />
      <Position name="contain-intrinsic-block-size" />
      <Position name="contain-intrinsic-inline-size" />
      <Position name="contain-intrinsic-height" />
      <Position name="contain-intrinsic-width" />
    </div>
  );
}
export default ContainProperties;
