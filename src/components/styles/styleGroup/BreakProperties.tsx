import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function BreakProperties() {
  return (
    <div>
      <SingleStyleOptionSetter name="break-after" isCapitalized={true} />
      <SingleStyleOptionSetter name="break-before" isCapitalized={true} />
      <SingleStyleOptionSetter name="break-inside" isCapitalized={true} />
    </div>
  );
}

export default BreakProperties;
