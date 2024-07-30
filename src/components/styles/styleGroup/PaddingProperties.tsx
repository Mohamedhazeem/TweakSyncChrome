import Position from "../styleComponents/Position";
function PaddingProperties() {
  return (
    <div className="inspector-component">
      <Position name="padding-top" />
      <Position name="padding-right" />
      <Position name="padding-bottom" />
      <Position name="padding-left" />
      <Position name="padding-block-end" />
      <Position name="padding-block-start" />
      <Position name="padding-inline-end" />
      <Position name="padding-inline-start" />
    </div>
  );
}

export default PaddingProperties;
