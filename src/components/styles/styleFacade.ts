import AlignGroup from "./styleGroup/AlignProperties";
import BackgroundGroup from "./styleGroup/BackgroundProperties";
import ColorGroup from "./styleGroup/ColorProperties";
import FlexGroup from "./styleGroup/FlexProperties";
import MarginProperties from "./styleGroup/MarginProperties";
import PaddingProperties from "./styleGroup/PaddingProperties";

export const styleComponents: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.ComponentType<any>;
} = {
  "Alignment Properties": AlignGroup,
  "Background Properties": BackgroundGroup,
  "Color Properties": ColorGroup,
  "Flex Properties": FlexGroup,
  "Margin Properties": MarginProperties,
  "Padding Properties": PaddingProperties,
};
