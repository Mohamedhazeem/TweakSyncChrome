import DynamicOptionSetter from "../styleComponents/DynamicOptionSetter";
function WidthProperties() {
  return (
    <div className="inspector-component">
      <DynamicOptionSetter name="width" />
      <DynamicOptionSetter name="min-width" />
      <DynamicOptionSetter name="max-width" />
    </div>
  );
}

export default WidthProperties;
