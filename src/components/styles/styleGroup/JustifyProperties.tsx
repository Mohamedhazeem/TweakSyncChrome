import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function JustifyProperties() {
  return (
    <div>
      <SingleStyleOptionSetter name="justify-content" isCapitalized={true} />
      <SingleStyleOptionSetter name="justify-items" isCapitalized={true} />
      <SingleStyleOptionSetter name="justify-self" isCapitalized={true} />
    </div>
  );
}

export default JustifyProperties;
