import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function WhiteSpaceProperties() {
  return (
    <div className="inspector-component">
      <SingleStyleOptionSetter name="white-space" isCapitalized={true} />
      <SingleStyleOptionSetter name="white-space-collapse" isCapitalized={true} />
      <SingleStyleOptionSetter name="text-wrap" isCapitalized={true} />
    </div>
  );
}

export default WhiteSpaceProperties;
