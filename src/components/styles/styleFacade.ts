import Color from "./styleComponents/Color";
import ColorScheme from "./styleComponents/ColorScheme";

export const styleComponents: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.ComponentType<any>;
} = {
  color: Color,
  "background-color": Color,
  "color-scheme": ColorScheme,
};
