import AlignProperties from "./styleGroup/AlignProperties";
import BackgroundProperties from "./styleGroup/BackgroundProperties";
import ColorProperties from "./styleGroup/ColorProperties";
import FlexProperties from "./styleGroup/FlexProperties";
import HeightProperties from "./styleGroup/HeightProperties";
import MarginProperties from "./styleGroup/MarginProperties";
import PaddingProperties from "./styleGroup/PaddingProperties";
import WidthProperties from "./styleGroup/WidthProperties";

export const styleComponents: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.ComponentType<any>;
} = {
  "Alignment Properties": AlignProperties,
  "Background Properties": BackgroundProperties,
  "Color Properties": ColorProperties,
  "Flex Properties": FlexProperties,
  "Height Properties": HeightProperties,
  "Margin Properties": MarginProperties,
  "Padding Properties": PaddingProperties,
  "Width Properties": WidthProperties,
};
