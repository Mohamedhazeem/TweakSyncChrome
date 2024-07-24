import AlignGroup from "./styleGroup/AlignGroup";
import BackgroundGroup from "./styleGroup/BackgroundGroup";
import ColorGroup from "./styleGroup/ColorGroup";
import FlexGroup from "./styleGroup/FlexGroup";

export const styleComponents: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.ComponentType<any>;
} = {
  "Alignment Group": AlignGroup,
  "Background Group": BackgroundGroup,
  "Color Group": ColorGroup,
  "Flex Group": FlexGroup,
};
