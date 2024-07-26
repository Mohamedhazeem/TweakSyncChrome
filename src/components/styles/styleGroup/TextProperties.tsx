// "text-shadow" (update in future versions)
// "text-wrap-mode" not supported on chrome
// "text-wrap-style" not supported on chrome
// "text-size-adjust" not working

import Color from "../styleComponents/Color";
import MultiStyleOptionSetter from "../styleComponents/MultiStyleOptionSetter";
import Position from "../styleComponents/Position";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function TextProperties() {
  return (
    <div>
      <SingleStyleOptionSetter name="text-align" isCapitalized={true} />
      <SingleStyleOptionSetter name="text-align-last" isCapitalized={true} />
      <SingleStyleOptionSetter name="text-combine-upright" isCapitalized={true} />
      <Color colorProp="text-decoration-color" />
      <SingleStyleOptionSetter name="text-decoration-line" isCapitalized={true} />
      <SingleStyleOptionSetter name="text-decoration-skip-ink" isCapitalized={true} />
      <SingleStyleOptionSetter name="text-decoration-style" isCapitalized={true} />
      <Position name="text-decoration-thicknes" />
      <Color colorProp="text-emphasis-color" />
      <MultiStyleOptionSetter name="text-emphasis-position" />
      <SingleStyleOptionSetter name="text-emphasis-style" isCapitalized={true} />
      {/*string */}
      <Position name="text-indent" />
      <SingleStyleOptionSetter name="text-justify" isCapitalized={true} />
      <SingleStyleOptionSetter name="text-orientation" isCapitalized={true} />
      <SingleStyleOptionSetter name="text-overflow" isCapitalized={true} /> {/*string */}
      <SingleStyleOptionSetter name="text-rendering" isCapitalized={true} />
      <Position name="text-size-adjust" />
      <SingleStyleOptionSetter name="text-spacing-trim" isCapitalized={true} />
      <SingleStyleOptionSetter name="text-transform" isCapitalized={true} />
      <Position name="text-underline-offset" />
      <MultiStyleOptionSetter name="text-underline-position" />
      <SingleStyleOptionSetter name="text-wrap" isCapitalized={true} />
    </div>
  );
}

export default TextProperties;
