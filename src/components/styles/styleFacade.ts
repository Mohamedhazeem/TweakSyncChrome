import AlignProperties from "./styleGroup/AlignProperties";
import AllProperty from "./styleGroup/AllProperty";
import BackfaceVisibilityProperty from "./styleGroup/BackfaceVisibilityProperty";
import BackgroundProperties from "./styleGroup/BackgroundProperties";
import BlockSizeProperties from "./styleGroup/BlockSizeProperties";
import BoxProperties from "./styleGroup/BoxProperties";
import BreakProperties from "./styleGroup/BreakProperties";
import FloatProperties from "./styleGroup/FloatProperties";
import ColorProperties from "./styleGroup/ColorProperties";
import ColumnRowProperties from "./styleGroup/ColumnRowProperties";
import ContainProperties from "./styleGroup/ContainProperties";
import ContentProperties from "./styleGroup/ContentProperties";
import CursorProperty from "./styleGroup/CursorProperty";
import DisplayProperties from "./styleGroup/DisplayProperties";
import FlexProperties from "./styleGroup/FlexProperties";
import HeightProperties from "./styleGroup/HeightProperties";
import InlineSizeProperties from "./styleGroup/InlineSizeProperties";
import JustifyProperties from "./styleGroup/JustifyProperties";
import LineProperties from "./styleGroup/LineProperties";
import ListProperties from "./styleGroup/ListProperties";
import MarginProperties from "./styleGroup/MarginProperties";
import OutlineProperties from "./styleGroup/OutlineProperties";
import OverFlowProperties from "./styleGroup/OverFlowProperties";
import PaddingProperties from "./styleGroup/PaddingProperties";
import PlaceProperties from "./styleGroup/PlaceProperties";
import PositionProperties from "./styleGroup/PositionProperties";
import TableProperties from "./styleGroup/TableProperties";
import TextProperties from "./styleGroup/TextProperties";
import WhiteSpaceProperties from "./styleGroup/WhiteSpaceProperties";
import WidthProperties from "./styleGroup/WidthProperties";
import WordProperties from "./styleGroup/WordProperties";
import WritingMode from "./styleGroup/WritingMode";
import OverScrollProperties from "./styleGroup/OverScrollProperties";
import ScrollbarProperties from "./styleGroup/ScrollbarProperties";
import ZoomProperty from "./styleGroup/ZoomProperty";

export const styleComponents: {
  [key: string]: React.ComponentType;
} = {
  "Alignment Properties": AlignProperties,
  "All Property": AllProperty,
  "Backface Visibility Property": BackfaceVisibilityProperty,
  "Background Properties": BackgroundProperties,
  "Block-Size Properties": BlockSizeProperties,
  "Box Properties": BoxProperties,
  "Break Properties": BreakProperties,
  "Color Properties": ColorProperties,
  "Column-Row Properties": ColumnRowProperties,
  "Contain Properties": ContainProperties,
  "Content Properties": ContentProperties,
  "Cursor Property": CursorProperty,
  "Display Properties": DisplayProperties,
  "Flex Properties": FlexProperties,
  "Float Properties": FloatProperties,
  "Height Properties": HeightProperties,
  "Inline-Size Properties": InlineSizeProperties,
  "Justify Properties": JustifyProperties,
  "Line Properties": LineProperties,
  "List Properties": ListProperties,
  "Margin Properties": MarginProperties,
  "Padding Properties": PaddingProperties,
  "Place Properties": PlaceProperties,
  "Position Properties": PositionProperties,
  "Scrollbar Properties": ScrollbarProperties,
  "Table Properties": TableProperties,
  "Text Properties": TextProperties,
  "Outline Properties": OutlineProperties,
  "Overflow Properties": OverFlowProperties,
  "Overscroll Properties": OverScrollProperties,
  "White Space Properties": WhiteSpaceProperties,
  "Width Properties": WidthProperties,
  "Word Properties": WordProperties,
  "Writing Property": WritingMode,
  "Zoom Property": ZoomProperty,
};
