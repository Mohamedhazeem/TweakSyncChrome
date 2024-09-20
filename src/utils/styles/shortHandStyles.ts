export const shorthandMap: { [key: string]: string[] } = {
  // background
  "background-position": ["background-position-x", "background-position-y"],

  // border
  "border-block-color": ["border-block-start-color", "border-block-end-color"],
  "border-block-style": ["border-block-start-style", "border-block-end-style"],
  "border-block-width": ["border-block-start-width", "border-block-end-width"],
  "border-color": [
    "border-top-color",
    "border-right-color",
    "border-bottom-color",
    "border-left-color",
  ],
  "border-style": [
    "border-top-style",
    "border-right-style",
    "border-bottom-style",
    "border-left-style",
  ],
  "border-width": [
    "border-top-width",
    "border-right-width",
    "border-bottom-width",
    "border-left-width",
  ],
  "border-inline-color": ["border-inline-start-color", "border-inline-end-color"],
  "border-inline-style": ["border-inline-start-style", "border-inline-end-style"],
  "border-inline-width": ["border-inline-start-width", "border-inline-end-width"],
  "border-radius": [
    "border-top-left-radius",
    "border-top-right-radius",
    "border-bottom-right-radius",
    "border-bottom-left-radius",
  ],
  // Add other shorthand mappings as needed
};
export const longHandDefaults: { [key: string]: string } = {
  // background-position
  "background-position-x": "0%",
  "background-position-y": "0%",

  // border-block-color
  "border-block-start-color": "currentcolor",
  "border-block-end-color": "currentcolor",
  // border-block-style
  "border-block-start-style": "none",
  "border-block-end-style": "none",
  // border-block-width
  "border-block-start-width": "medium",
  "border-block-end-width": "medium",
  // border-color
  "border-top-color": "currentcolor",
  "border-right-color": "currentcolor",
  "border-bottom-color": "currentcolor",
  "border-left-color": "currentcolor",
  // border-style
  "border-top-style": "none",
  "border-right-style": "none",
  "border-bottom-style": "none",
  "border-left-style": "none",
  // border-width
  "border-top-width": "medium",
  "border-right-width": "medium",
  "border-bottom-width": "medium",
  "border-left-width": "medium",
  // border-inline-color
  "border-inline-start-color": "currentcolor",
  "border-inline-end-color": "currentcolor",
  // border-inline-style
  "border-inline-start-style": "none",
  "border-inline-end-style": "none",
  // border-inline-width
  "border-inline-start-width": "medium",
  "border-inline-end-width": "medium",
  // border-radius
  "border-top-left-radius": "0px",
  "border-top-right-radius": "0px",
  "border-bottom-right-radius": "0px",
  "border-bottom-left-radius": "0px",
};
