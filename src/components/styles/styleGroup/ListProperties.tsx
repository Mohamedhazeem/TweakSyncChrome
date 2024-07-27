import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function ListProperties() {
  return (
    <div>
      <SingleStyleOptionSetter name="list-style-image" isCapitalized={true} />
      <SingleStyleOptionSetter name="list-style-position" isCapitalized={true} />
      <SingleStyleOptionSetter name="list-style-type" isCapitalized={true} />
    </div>
  );
}

export default ListProperties;
