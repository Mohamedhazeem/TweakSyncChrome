import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function AlignProperties() {
  return (
    <div>
      <SingleStyleOptionSetter name="align-content" />
      <SingleStyleOptionSetter name="align-items" />
      <SingleStyleOptionSetter name="align-self" />
    </div>
  );
}

export default AlignProperties;
