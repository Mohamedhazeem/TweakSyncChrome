import Position from "../styleComponents/Position";
function BlockSizeProperties() {
  return (
    <div className="inspector-component">
      <Position name="block-size" />
      <Position name="min-block-size" />
      <Position name="max-block-size" />
    </div>
  );
}

export default BlockSizeProperties;
