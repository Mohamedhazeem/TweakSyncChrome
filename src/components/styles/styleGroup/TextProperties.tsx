import Color from "../styleComponents/Color";
import MultiStyleOptionSetter from "../styleComponents/MultiStyleOptionSetter";
import DynamicOptionSetter from "../styleComponents/DynamicOptionSetter";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";
// "text-shadow" (update in future versions)
// "text-wrap-mode" not supported on chrome
// "text-wrap-style" not supported on chrome
function TextProperties() {
  return (
    <div className="inspector-component">
      <SingleStyleOptionSetter name="text-align" isCapitalized={true} />
      <SingleStyleOptionSetter name="text-align-last" isCapitalized={true} />
      <SingleStyleOptionSetter name="text-combine-upright" isCapitalized={true} />
      <Color colorProp="text-decoration-color" />
      <SingleStyleOptionSetter name="text-decoration-line" isCapitalized={true} />
      <SingleStyleOptionSetter name="text-decoration-skip-ink" isCapitalized={true} />
      <SingleStyleOptionSetter name="text-decoration-style" isCapitalized={true} />
      <DynamicOptionSetter name="text-decoration-thicknes" />
      <Color colorProp="text-emphasis-color" />
      <MultiStyleOptionSetter name="text-emphasis-position" />
      <SingleStyleOptionSetter name="text-emphasis-style" isCapitalized={true} />
      {/*string */}
      <DynamicOptionSetter name="text-indent" />
      <SingleStyleOptionSetter name="text-justify" isCapitalized={true} />
      <SingleStyleOptionSetter name="text-orientation" isCapitalized={true} />
      <SingleStyleOptionSetter name="text-overflow" isCapitalized={true} /> {/*string */}
      <SingleStyleOptionSetter name="text-rendering" isCapitalized={true} />
      <DynamicOptionSetter name="text-size-adjust" />
      <SingleStyleOptionSetter name="text-spacing-trim" isCapitalized={true} />
      <SingleStyleOptionSetter name="text-transform" isCapitalized={true} />
      <DynamicOptionSetter name="text-underline-offset" />
      <MultiStyleOptionSetter name="text-underline-position" />
      <SingleStyleOptionSetter name="text-wrap" isCapitalized={true} />
    </div>
  );
}

export default TextProperties;
