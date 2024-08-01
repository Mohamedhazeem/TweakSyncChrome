import MultiStyleOptionSetter from "../styleComponents/MultiStyleOptionSetter";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function ScrollbarProperties() {
  return (
    <div>
      <MultiStyleOptionSetter name="scrollbar-color" />
      <SingleStyleOptionSetter name="scrollbar-gutter" isCapitalized={true} />
      <SingleStyleOptionSetter name="scrollbar-width" isCapitalized={true} />
    </div>
  );
}

export default ScrollbarProperties;
