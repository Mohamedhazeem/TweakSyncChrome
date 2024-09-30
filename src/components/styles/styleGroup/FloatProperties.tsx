import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function FloatProperties() {
  return (
    <div className="inspector-component">
      <SingleStyleOptionSetter name="float" isCapitalized={true} />
      <SingleStyleOptionSetter name="clear" isCapitalized={true} />
    </div>
  );
}

export default FloatProperties;
