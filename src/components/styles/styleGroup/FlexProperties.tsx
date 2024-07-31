import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";
import DynamicOptionSetter from "../styleComponents/DynamicOptionSetter";
import MultiStyleOptionSetter from "../styleComponents/MultiStyleOptionSetter";
function FlexProperties() {
  return (
    <div className="inspector-component">
      <DynamicOptionSetter name="flex-basis" />
      <SingleStyleOptionSetter name="flex-direction" isCapitalized={true} />
      <MultiStyleOptionSetter name="flex-flow" />
      <DynamicOptionSetter name="flex-grow" />
      <DynamicOptionSetter name="flex-shrink" />
      <SingleStyleOptionSetter name="flex-wrap" isCapitalized={true} />
    </div>
  );
}

export default FlexProperties;
