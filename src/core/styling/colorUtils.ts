import { presetColors } from "./data/presetColors";

export { presetColors };

/** Lower-cased named colours, precomputed once for O(1) membership tests. */
export const NAMED_COLOR_SET: Set<string> = new Set(
  presetColors.map((preset) => preset.title.toLowerCase())
);

const HEX_COLOR = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
const RGB_COLOR = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
const RGBA_COLOR = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/;
const HSL_COLOR = /^hsl\(\s*(\d{1,3}),\s*([0-9]{1,2}|100)%,\s*([0-9]{1,2}|100)%\)$/;
const HSLA_COLOR =
  /^hsla\(\s*(\d{1,3}),\s*([0-9]{1,2}|100)%,\s*([0-9]{1,2}|100)%,\s*(0|1|0?\.\d+)\)$/;

/** True when the value is a CSS colour literal or a named colour. */
export function isColor(value: string): boolean {
  return (
    HEX_COLOR.test(value) ||
    RGB_COLOR.test(value) ||
    RGBA_COLOR.test(value) ||
    HSL_COLOR.test(value) ||
    HSLA_COLOR.test(value) ||
    NAMED_COLOR_SET.has(value.toLowerCase())
  );
}
