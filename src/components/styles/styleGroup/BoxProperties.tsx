import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

// "box-shadow" (update on future)
function BoxProperties() {
  return (
    <div>
      <SingleStyleOptionSetter name="-webkit-box-decoration-break" isCapitalized={true} />
      <SingleStyleOptionSetter name="box-sizing" isCapitalized={true} />
    </div>
  );
}

export default BoxProperties;
