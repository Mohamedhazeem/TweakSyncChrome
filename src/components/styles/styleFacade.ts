// import Color from "./styleComponents/Color";
import BackgroundGroup from "./styleGroup/BackgroundGroup";
import ColorGroup from "./styleGroup/ColorGroup";
// import ColorScheme from "./styleComponents/ColorScheme";

export const styleComponents: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.ComponentType<any>;
} = {
  "Background Group": BackgroundGroup,
  "Color Group": ColorGroup,
  // "color-scheme": ColorScheme,
};
