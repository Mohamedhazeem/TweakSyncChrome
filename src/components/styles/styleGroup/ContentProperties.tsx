import DynamicOptionSetter from "../styleComponents/DynamicOptionSetter";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function ContentProperties() {
  return (
    <div className="inspector-component">
      <DynamicOptionSetter name="content" isDoubleQuotesText={true} />
      <SingleStyleOptionSetter name="content-visibility" isCapitalized={true} />
    </div>
  );
}

export default ContentProperties;
