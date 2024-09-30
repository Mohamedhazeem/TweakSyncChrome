import SingleStyleOptionSetter from "../styleComponents/SingleStyleOptionSetter";

function TableProperties() {
  return (
    <div className="inspector-component">
      <SingleStyleOptionSetter name="caption-side" isCapitalized={true} />
      <SingleStyleOptionSetter name="empty-cells" isCapitalized={true} />
      <SingleStyleOptionSetter name="table-layout" isCapitalized={true} />
    </div>
  );
}

export default TableProperties;
