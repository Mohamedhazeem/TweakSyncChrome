import AlignProperties from "./styleGroup/AlignProperties";
import BackgroundProperties from "./styleGroup/BackgroundProperties";
import BlockSizeProperties from "./styleGroup/BlockSizeProperties";
import ColorProperties from "./styleGroup/ColorProperties";
import FlexProperties from "./styleGroup/FlexProperties";
import HeightProperties from "./styleGroup/HeightProperties";
import InlineSizeProperties from "./styleGroup/InlineSizeProperties";
import MarginProperties from "./styleGroup/MarginProperties";
import PaddingProperties from "./styleGroup/PaddingProperties";
import WidthProperties from "./styleGroup/WidthProperties";

export const styleComponents: {
  [key: string]: React.ComponentType;
} = {
  "Alignment Properties": AlignProperties,
  "Background Properties": BackgroundProperties,
  "Block-Size Properties": BlockSizeProperties,
  "Color Properties": ColorProperties,
  "Flex Properties": FlexProperties,
  "Height Properties": HeightProperties,
  "Inline-Size Properties": InlineSizeProperties,
  "Margin Properties": MarginProperties,
  "Padding Properties": PaddingProperties,
  "Width Properties": WidthProperties,
};
