import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function AlignProperties() {
  return (
    <div className="inspector-component">
      <SingleStyleOptionSetter name="align-content" isCapitalized={true} />
      <SingleStyleOptionSetter name="align-items" isCapitalized={true} />
      <SingleStyleOptionSetter name="align-self" isCapitalized={true} />
    </div>
  );
}

export default AlignProperties;
