import Color from "../styleComponents/Color";
import DynamicOptionSetter from "../styleComponents/DynamicOptionSetter";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function ColumnRowProperties() {
  return (
    <div className="inspector-component">
      <DynamicOptionSetter name="column-count" />
      <SingleStyleOptionSetter name="column-fill" isCapitalized={true} />
      <DynamicOptionSetter name="column-gap" />
      <DynamicOptionSetter name="row-gap" />
      <Color colorProp="column-rule-color" />
      <SingleStyleOptionSetter name="column-rule-style" isCapitalized={true} />
      <DynamicOptionSetter name="column-rule-width" />
      <SingleStyleOptionSetter name="column-span" isCapitalized={true} />
      <DynamicOptionSetter name="column-width" />
    </div>
  );
}

export default ColumnRowProperties;
