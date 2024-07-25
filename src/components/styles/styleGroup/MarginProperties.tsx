import Position from "../styleComponents/Position";

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
    <div>
      <Position name="margin-block-end" />
      <Position name="margin-block-start" />
      <Position name="margin-bottom" />
      <Position name="margin-inline-end" />
      <Position name="margin-inline-start" />
      <Position name="margin-left" />
      <Position name="margin-right" />
      <Position name="margin-top" />
    </div>
  );
}

export default MarginProperties;
