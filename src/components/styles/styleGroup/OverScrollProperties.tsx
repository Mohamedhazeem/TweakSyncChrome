import MultiStyleOptionSetter from "../styleComponents/MultiStyleOptionSetter";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function OverScrollProperties() {
  return (
    <div className="inspector-component">
      <MultiStyleOptionSetter name="overscroll-behavior" />
      {/* <SingleStyleOptionSetter name="overscroll-behavior-x" isCapitalized={true} />
      <SingleStyleOptionSetter name="overscroll-behavior-y" isCapitalized={true} /> */}
      <SingleStyleOptionSetter name="overscroll-behavior-block" isCapitalized={true} />
      <SingleStyleOptionSetter name="overscroll-behavior-inline" isCapitalized={true} />
    </div>
  );
}

export default OverScrollProperties;
