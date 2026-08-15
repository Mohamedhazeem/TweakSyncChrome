// Shared CSS option vocabularies used by the style data segments.
import type { Style } from "@/types/styleTypes";

export const globalCssOptions = ["inherit", "initial", "revert", "revert-layer", "unset"];
export const customAndGlobalCssOptions = [
  "custom",
  "inherit",
  "initial",
  "revert",
  "revert-layer",
  "unset",
];
export const dynamicOptions = ["color", "text", "length", "number"];
export const namedPositions = ["left", "right", "top", "bottom", "center"];
export const lineStyle = [
  "none",
  "hidden",
  "dotted",
  "dashed",
  "solid",
  "double",
  "groove",
  "ridge",
  "inset",
  "outset",
];
export const lengthUnits = [
  "px",
  "%",
  "em",
  "fr",
  "rem",
  "cm",
  "mm",
  "in",
  "pt",
  "pc",
  "ch",
  "vw",
  "vh",
  "vmin",
  "vmax",
];
export const LengthUnit: Style = {
  name: "length",
  nameForTitle: "Length",
  type: "string",
  description: "Unit of lengths",
  value: "",
  options: [...lengthUnits],
};
