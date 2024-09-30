import MultiDynamicOptionSetter from "../styleComponents/MultiDynamicOptionSetter";
function PaddingProperties() {
  return (
    <div className="inspector-component">
      <MultiDynamicOptionSetter name="padding" isSupportNegativeValue={false} />
      <MultiDynamicOptionSetter name="padding-block" isSupportNegativeValue={false} />
      <MultiDynamicOptionSetter name="padding-inline" isSupportNegativeValue={false} />

      {/* <DynamicOptionSetter name="padding-top" /> */}
      {/* <DynamicOptionSetter name="padding-right" /> */}
      {/* <DynamicOptionSetter name="padding-bottom" /> */}
      {/* <DynamicOptionSetter name="padding-left" /> */}
      {/* <DynamicOptionSetter name="padding-block-end" />
      <DynamicOptionSetter name="padding-block-start" />
      <DynamicOptionSetter name="padding-inline-end" />
      <DynamicOptionSetter name="padding-inline-start" /> */}
    </div>
  );
}

export default PaddingProperties;
