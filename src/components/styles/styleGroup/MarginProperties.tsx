import MultiDynamicOptionSetter from "../styleComponents/MultiDynamicOptionSetter";

function MarginProperties() {
  "margin-block-end";
  "margin-block-start";
  "margin-bottom";
  "margin-inline-end";
  "margin-inline-start";
  "margin-left";
  "margin-right";
  "margin-top";
  return (
    <div className="inspector-component">
      <MultiDynamicOptionSetter name="margin" isSupportNegativeValue={true} />
      <MultiDynamicOptionSetter name="margin-block" isSupportNegativeValue={true} />
      <MultiDynamicOptionSetter name="margin-inline" isSupportNegativeValue={true} />
      {/* <DynamicOptionSetter name="margin-top" />
      <DynamicOptionSetter name="margin-right" />
      <DynamicOptionSetter name="margin-bottom" />
      <DynamicOptionSetter name="margin-left" />
      <DynamicOptionSetter name="margin-block-end" />
      <DynamicOptionSetter name="margin-block-start" />
      <DynamicOptionSetter name="margin-inline-end" />
      <DynamicOptionSetter name="margin-inline-start" /> */}
    </div>
  );
}

export default MarginProperties;
