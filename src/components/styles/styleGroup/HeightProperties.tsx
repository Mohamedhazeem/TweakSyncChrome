import Position from "../styleComponents/Position";
function HeightProperties() {
  return (
    <div className="inspector-component">
      <Position name="height" />
      <Position name="min-height" />
      <Position name="max-height" />
    </div>
  );
}

export default HeightProperties;
