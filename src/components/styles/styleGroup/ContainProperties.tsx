import Position from "../styleComponents/Position";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function ContainProperties() {
  return (
    <div className="inspector-component">
      <SingleStyleOptionSetter name="contain" isCapitalized={true} />
      <Position name="contain-intrinsic-block-size" />
      <Position name="contain-intrinsic-inline-size" />
      <Position name="contain-intrinsic-height" />
      <Position name="contain-intrinsic-width" />
    </div>
  );
}
export default ContainProperties;
