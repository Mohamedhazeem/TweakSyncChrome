import AlignGroup from "./styleGroup/AlignGroup";
import BackgroundGroup from "./styleGroup/BackgroundGroup";
import ColorGroup from "./styleGroup/ColorGroup";

export const styleComponents: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.ComponentType<any>;
} = {
  "Background Group": BackgroundGroup,
  "Color Group": ColorGroup,
  "Alignment Group": AlignGroup,
  // "color-scheme": ColorScheme,
};
