import MultiStyleOptionSetter from "../styleComponents/MultiStyleOptionSetter";

function PlaceProperties() {
  return (
    <div>
      <MultiStyleOptionSetter name="place-content" />
      <MultiStyleOptionSetter name="place-items" />
      <MultiStyleOptionSetter name="place-self" />
    </div>
  );
}

export default PlaceProperties;
