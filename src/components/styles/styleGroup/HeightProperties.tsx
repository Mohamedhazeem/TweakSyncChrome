import DynamicOptionSetter from "../styleComponents/DynamicOptionSetter";
function HeightProperties() {
  return (
    <div className="inspector-component">
      <DynamicOptionSetter name="height" />
      <DynamicOptionSetter name="min-height" />
      <DynamicOptionSetter name="max-height" />
    </div>
  );
}

export default HeightProperties;
