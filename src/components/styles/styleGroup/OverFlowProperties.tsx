import DynamicOptionSetter from "../styleComponents/DynamicOptionSetter";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";
function OverFlowProperties() {
  return (
    <div className="inspector-component">
      <SingleStyleOptionSetter name="overflow-anchor" isCapitalized={true} />
      {/* <SingleStyleOptionSetter name="overflow-block" isCapitalized={true} /> not supported yet */}
      <DynamicOptionSetter name="overflow-clip-margin" />
      {/* <SingleStyleOptionSetter name="overflow-inline" isCapitalized={true} /> not supported yet */}
      <SingleStyleOptionSetter name="overflow-wrap" isCapitalized={true} />
      <SingleStyleOptionSetter name="overflow-x" isCapitalized={true} />
      <SingleStyleOptionSetter name="overflow-y" isCapitalized={true} />
    </div>
  );
}

export default OverFlowProperties;
