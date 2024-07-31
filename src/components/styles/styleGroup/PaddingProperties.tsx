import DynamicOptionSetter from "../styleComponents/DynamicOptionSetter";
function PaddingProperties() {
  return (
    <div className="inspector-component">
      <DynamicOptionSetter name="padding-top" />
      <DynamicOptionSetter name="padding-right" />
      <DynamicOptionSetter name="padding-bottom" />
      <DynamicOptionSetter name="padding-left" />
      <DynamicOptionSetter name="padding-block-end" />
      <DynamicOptionSetter name="padding-block-start" />
      <DynamicOptionSetter name="padding-inline-end" />
      <DynamicOptionSetter name="padding-inline-start" />
    </div>
  );
}

export default PaddingProperties;
