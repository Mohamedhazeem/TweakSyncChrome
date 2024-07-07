import Color from "./styleComponents/Color";

export const styleComponents: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.ComponentType<any>;
} = {
  color: Color,
  "background-color": Color,
};
