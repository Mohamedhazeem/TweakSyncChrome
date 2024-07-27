import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function WhiteSpaceProperties() {
  return (
    <div>
      <SingleStyleOptionSetter name="white-space" isCapitalized={true} />
      <SingleStyleOptionSetter name="white-space-collapse" isCapitalized={true} />
    </div>
  );
}

export default WhiteSpaceProperties;
