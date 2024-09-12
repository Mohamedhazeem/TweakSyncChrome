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
import BorderProperties from "./styleGroup/BorderProperties";

export const styleComponents: {
  [key: string]: React.ComponentType;
} = {
  Alignment: AlignProperties,
  All: AllProperty,
  "Backface Visibility": BackfaceVisibilityProperty,
  Background: BackgroundProperties,
  "Block-Size": BlockSizeProperties,
  Border: BorderProperties,
  Box: BoxProperties,
  Break: BreakProperties,
  Color: ColorProperties,
  "Column and Row": ColumnRowProperties,
  Contain: ContainProperties,
  Content: ContentProperties,
  Cursor: CursorProperty,
  Display: DisplayProperties,
  Flex: FlexProperties,
  Float: FloatProperties,
  Height: HeightProperties,
  "Inline-Size": InlineSizeProperties,
  Justify: JustifyProperties,
  Line: LineProperties,
  List: ListProperties,
  Margin: MarginProperties,
  Padding: PaddingProperties,
  Place: PlaceProperties,
  Position: PositionProperties,
  Scrollbar: ScrollbarProperties,
  Table: TableProperties,
  Text: TextProperties,
  Outline: OutlineProperties,
  Overflow: OverFlowProperties,
  Overscroll: OverScrollProperties,
  "White Space": WhiteSpaceProperties,
  Width: WidthProperties,
  Word: WordProperties,
  Writing: WritingMode,
  Zoom: ZoomProperty,
};
