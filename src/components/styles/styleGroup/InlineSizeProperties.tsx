import DynamicOptionSetter from "../styleComponents/DynamicOptionSetter";
function InlineSizeProperties() {
  return (
    <div className="inspector-component">
      <DynamicOptionSetter name="inline-size" />
      <DynamicOptionSetter name="min-inline-size" />
      <DynamicOptionSetter name="max-inline-size" />
    </div>
  );
}

export default InlineSizeProperties;
