import AlignProperties from "./styleGroup/AlignProperties";
import BackgroundProperties from "./styleGroup/BackgroundProperties";
import BlockSizeProperties from "./styleGroup/BlockSizeProperties";
import ColorProperties from "./styleGroup/ColorProperties";
import DisplayProperties from "./styleGroup/DisplayProperties";
import FlexProperties from "./styleGroup/FlexProperties";
import HeightProperties from "./styleGroup/HeightProperties";
import InlineSizeProperties from "./styleGroup/InlineSizeProperties";
import JustifyProperties from "./styleGroup/JustifyProperties";
import LineProperties from "./styleGroup/LineProperties";
import MarginProperties from "./styleGroup/MarginProperties";
import OutlineProperties from "./styleGroup/OutlineProperties";
import OverFlowProperties from "./styleGroup/OverFlowProperties";
import PaddingProperties from "./styleGroup/PaddingProperties";
import PositionProperties from "./styleGroup/PositionProperties";
import TextProperties from "./styleGroup/TextProperties";
import WidthProperties from "./styleGroup/WidthProperties";
import WordProperties from "./styleGroup/WordProperties";

export const styleComponents: {
  [key: string]: React.ComponentType;
} = {
  "Alignment Properties": AlignProperties,
  "Background Properties": BackgroundProperties,
  "Block-Size Properties": BlockSizeProperties,
  "Color Properties": ColorProperties,
  "Display Properties": DisplayProperties,
  "Flex Properties": FlexProperties,
  "Height Properties": HeightProperties,
  "Inline-Size Properties": InlineSizeProperties,
  "Justify Properties": JustifyProperties,
  "Line Properties": LineProperties,
  "Margin Properties": MarginProperties,
  "Padding Properties": PaddingProperties,
  "Position Properties": PositionProperties,
  "Text Properties": TextProperties,
  "Outline Properties": OutlineProperties,
  "Overflow Properties": OverFlowProperties,
  "Width Properties": WidthProperties,
  "Word Properties": WordProperties,
};
