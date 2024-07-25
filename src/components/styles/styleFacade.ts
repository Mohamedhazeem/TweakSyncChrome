import AlignGroup from "./styleGroup/AlignGroup";
import BackgroundGroup from "./styleGroup/BackgroundGroup";
import ColorGroup from "./styleGroup/ColorGroup";
import FlexGroup from "./styleGroup/FlexGroup";
import MarginProperties from "./styleGroup/MarginProperties";

export const styleComponents: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.ComponentType<any>;
} = {
  "Alignment Properties": AlignGroup,
  "Background Properties": BackgroundGroup,
  "Color Properties": ColorGroup,
  "Flex Properties": FlexGroup,
  "Margin Properties": MarginProperties,
};
