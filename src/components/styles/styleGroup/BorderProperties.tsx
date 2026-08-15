// "border-start-end-radius",
// "border-start-start-radius",
// "border-top-color",
// "border-top-style",

import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";
import MultiDynamicOptionSetter from "../styleComponents/MultiDynamicOptionSetter";
import MultiStyleOptionSetter from "../styleComponents/MultiStyleOptionSetter";
// "border-top-width",
function BorderProperties() {
  return (
    <div className="inspector-component">
      <MultiDynamicOptionSetter name="border-block-width" isSupportNegativeValue={false} />
      <MultiDynamicOptionSetter name="border-block-style" />
      <MultiDynamicOptionSetter name="border-block-color" />
      <MultiDynamicOptionSetter name="border-width" isSupportNegativeValue={false} />
      <MultiDynamicOptionSetter name="border-style" />
      <MultiDynamicOptionSetter name="border-color" />
      <MultiDynamicOptionSetter name="border-radius" isSupportNegativeValue={false} />
      <SingleStyleOptionSetter name="border-collapse" isCapitalized={true} />
      <MultiDynamicOptionSetter name="border-image-outset" isSupportNegativeValue={false} />
      <MultiStyleOptionSetter name="border-image-repeat" isComma={false} />
      <MultiDynamicOptionSetter name="border-image-slice" isSupportNegativeValue={false} />
      <SingleStyleOptionSetter name="border-image-source" isCapitalized={true} />
      <MultiDynamicOptionSetter name="border-image-width" isSupportNegativeValue={false} />
      <MultiDynamicOptionSetter name="border-inline-color" />
      <MultiDynamicOptionSetter name="border-inline-style" />
      <MultiDynamicOptionSetter name="border-inline-width" isSupportNegativeValue={false} />
      <MultiDynamicOptionSetter name="border-spacing" isSupportNegativeValue={false} />
      <MultiDynamicOptionSetter name="border-start-start-radius" isSupportNegativeValue={false} />
      <MultiDynamicOptionSetter name="border-start-end-radius" isSupportNegativeValue={false} />
      <MultiDynamicOptionSetter name="border-end-start-radius" isSupportNegativeValue={false} />
      <MultiDynamicOptionSetter name="border-end-end-radius" isSupportNegativeValue={false} />
      {/* <MultiDynamicOptionSetter name="border-bottom-left-radius" isSupportNegativeValue={false} /> */}
      {/* <MultiDynamicOptionSetter name="border-bottom-right-radius" isSupportNegativeValue={false} /> */}
      {/* <MultiDynamicOptionSetter name="border-top-left-radius" isSupportNegativeValue={false} /> */}
      {/* <MultiDynamicOptionSetter name="border-top-right-radius" isSupportNegativeValue={false} /> */}
    </div>
  );
}

export default BorderProperties;
