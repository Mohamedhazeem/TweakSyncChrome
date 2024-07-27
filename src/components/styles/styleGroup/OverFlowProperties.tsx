import Position from "../styleComponents/Position";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";
function OverFlowProperties() {
  return (
    <div>
      <SingleStyleOptionSetter name="overflow-anchor" isCapitalized={true} />
      <SingleStyleOptionSetter name="overflow-block" isCapitalized={true} />
      <Position name="overflow-clip-margin" />
      <SingleStyleOptionSetter name="overflow-inline" isCapitalized={true} />
      <SingleStyleOptionSetter name="overflow-wrap" isCapitalized={true} />
      <SingleStyleOptionSetter name="overflow-x" isCapitalized={true} />
      <SingleStyleOptionSetter name="overflow-y" isCapitalized={true} />
    </div>
  );
}

export default OverFlowProperties;
