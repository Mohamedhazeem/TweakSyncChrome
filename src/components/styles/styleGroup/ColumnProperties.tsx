import Color from "../styleComponents/Color";
import Position from "../styleComponents/Position";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function ColumnProperties() {
  return (
    <div className="inspector-component">
      <Position name="column-count" />
      <SingleStyleOptionSetter name="column-fill" isCapitalized={true} />
      <Position name="column-gap" />
      <Color colorProp="column-rule-color" />
      <SingleStyleOptionSetter name="column-rule-style" isCapitalized={true} />
      <Position name="column-rule-width" />
      <SingleStyleOptionSetter name="column-span" isCapitalized={true} />
      <Position name="column-width" />
    </div>
  );
}

export default ColumnProperties;
