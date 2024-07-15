import Color from "../styleComponents/Color";
import ColorScheme from "../styleComponents/ColorScheme";

function ColorGroup() {
  return (
    <div>
      <Color colorProp="color" />
      <ColorScheme />
    </div>
  );
}

export default ColorGroup;
