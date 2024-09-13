// "border-collapse",
// "border-end-end-radius",
// "border-end-start-radius",
// "border-image-outset",
// "border-image-repeat",
// "border-image-slice",
// "border-image-source",
// "border-image-width",
// "border-inline-color",
// "border-inline-style",
// "border-inline-width",
// "border-inline-end-color",
// "border-inline-end-style",
// "border-inline-end-width",
// "border-inline-start-color",
// "border-inline-start-style",
// "border-inline-start-width",
// "border-left-color",
// "border-left-style",
// "border-left-width",
// "border-right-color",
// "border-right-style",
// "border-right-width",
// "border-spacing",
// "border-start-end-radius",
// "border-start-start-radius",
// "border-top-color",
// "border-top-style",

import Color from "../styleComponents/Color";
import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";
import DynamicOptionSetter from "../styleComponents/DynamicOptionSetter";
import MultiDynamicOptionSetter from "../styleComponents/MultiDynamicOptionSetter";
// "border-top-width",
function BorderProperties() {
  return (
    <div className="inspector-component">
      <Color colorProp="border-block-color" />
      <Color colorProp="border-block-end-color" />
      <SingleStyleOptionSetter name="border-block-end-style" isCapitalized={true} />
      <DynamicOptionSetter name="border-block-end-width" />
      <Color colorProp="border-block-start-color" />
      <SingleStyleOptionSetter name="border-block-start-style" isCapitalized={true} />
      <DynamicOptionSetter name="border-block-start-width" />
      <SingleStyleOptionSetter name="border-block-style" isCapitalized={true} />
      <DynamicOptionSetter name="border-block-width" />
      <Color colorProp="border-bottom-color" />
      <SingleStyleOptionSetter name="border-bottom-style" isCapitalized={true} />
      <DynamicOptionSetter name="border-bottom-width" />
      <MultiDynamicOptionSetter name="border-bottom-left-radius" isSupportNegativeValue={false} />
      <MultiDynamicOptionSetter name="border-bottom-right-radius" isSupportNegativeValue={false} />
    </div>
  );
}

export default BorderProperties;
