import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function AlignGroup() {
  return (
    <div>
      <SingleStyleOptionSetter name="align-content" />
      <SingleStyleOptionSetter name="align-items" />
      <SingleStyleOptionSetter name="align-self" />
    </div>
  );
}

export default AlignGroup;
