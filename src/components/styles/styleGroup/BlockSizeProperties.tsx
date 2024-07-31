import DynamicOptionSetter from "../styleComponents/DynamicOptionSetter";
function BlockSizeProperties() {
  return (
    <div className="inspector-component">
      <DynamicOptionSetter name="block-size" />
      <DynamicOptionSetter name="min-block-size" />
      <DynamicOptionSetter name="max-block-size" />
    </div>
  );
}

export default BlockSizeProperties;
