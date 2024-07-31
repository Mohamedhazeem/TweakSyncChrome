import DynamicOptionSetter from "../styleComponents/DynamicOptionSetter";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function ContainProperties() {
  return (
    <div className="inspector-component">
      <SingleStyleOptionSetter name="contain" isCapitalized={true} />
      <DynamicOptionSetter name="contain-intrinsic-block-size" />
      <DynamicOptionSetter name="contain-intrinsic-inline-size" />
      <DynamicOptionSetter name="contain-intrinsic-height" />
      <DynamicOptionSetter name="contain-intrinsic-width" />
    </div>
  );
}
export default ContainProperties;
