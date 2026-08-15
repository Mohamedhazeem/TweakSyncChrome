import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions, lineStyle } from "../options";

export const BorderGroup: StyleGroup = {
  groupName: "Border",
  propertyNames: [
    "border-block-width",
    "border-block-style",
    "border-block-color",
    "border-width",
    "border-style",
    "border-color",
    "border-radius",
    // "border-bottom-left-radius",
    // "border-bottom-right-radius",
    "border-collapse",
    "border-image-outset",
    "border-image-repeat",
    "border-image-slice",
    "border-image-source",
    "border-image-width",
    "border-inline-color",
    "border-inline-style",
    "border-inline-width",
    "border-spacing",
    "border-start-start-radius",
    "border-start-end-radius",
    "border-end-start-radius",
    "border-end-end-radius",
    // "border-top-left-radius",
    // "border-top-right-radius",
  ],
  groups: [
    {
      name: "border-block-color",
      nameForTitle: "Border Block Color",
      type: "color",
      description: "Sets the color of the borders at the start and end of a block.",
      value: "",
      maxOptionCounts: 2,
      labels: [["Start and End Color"], ["Start Color", "End Color"]],
      options: ["color", "currentcolor", "transparent", ...globalCssOptions],
    },
    {
      name: "border-block-style",
      nameForTitle: "Border Block Style",
      type: "string",
      description:
        "Specifies the style of the borders at both the block-start and block-end sides. It can be used in vertical writing modes to control the border appearance along the block axis.",
      value: "",
      maxOptionCounts: 2,
      labels: [["Start and End Style"], ["Start Style", "End Style"]],
      options: [...lineStyle, ...globalCssOptions],
    },
    {
      name: "border-block-width",
      nameForTitle: "Border Block Width",
      type: "string",
      description:
        "Specifies the width of the borders on both the block-start and block-end sides of an element. It is typically used in vertical writing modes to control the thickness of the borders along the block axis.",
      value: "",
      maxOptionCounts: 2,
      labels: [["Start and End Width"], ["Start Width", "End Width"]],
      options: ["thin", "medium", "thick", "length", ...globalCssOptions],
    },
    {
      name: "border-color",
      nameForTitle: "Border Color",
      type: "string",
      description: "Specifies the color of the border on all sides of an element.",
      value: "", // Default value
      maxOptionCounts: 4,
      options: ["color", "currentcolor", "transparent", ...globalCssOptions],
      labels: [
        ["All Sides Color"],
        ["Top and Bottom Color", "Left and Right Color"],
        ["Top Color", "Left and Right Color", "Bottom Color"],
        ["Top Color", "Right Color", "Bottom Color", "Left Color"],
      ],
    },
    {
      name: "border-style",
      nameForTitle: "Border Style",
      type: "string",
      description:
        "Specifies the style of the border for all sides of an element. You can set the same style for all sides, or specify different styles for each side individually (top, right, bottom, and left).",
      value: "",
      maxOptionCounts: 4,
      options: [...lineStyle, ...globalCssOptions],
      labels: [
        ["All Sides Style"],
        ["Top and Bottom Style", "Left and Right Style"],
        ["Top Style", "Left and Right Style", "Bottom Style"],
        ["Top Style", "Right Style", "Bottom Style", "Left Style"],
      ],
    },
    {
      name: "border-width",
      nameForTitle: "Border Width",
      type: "string",
      description:
        "Specifies the width of the border for all sides of an element. You can set the same width for all sides, or specify different widths for each side individually (top, right, bottom, and left).",
      value: "",
      maxOptionCounts: 4,
      options: ["thin", "medium", "thick", "length", ...globalCssOptions],
      labels: [
        ["All Sides Width"],
        ["Top and Bottom Width", "Left and Right Width"],
        ["Top Width", "Left and Right Width", "Bottom Width"],
        ["Top Width", "Right Width", "Bottom Width", "Left Width"],
      ],
    },
    {
      name: "border-radius",
      nameForTitle: "Border Radius",
      type: "string",
      description:
        "The `border-radius` property defines the rounding of the element's corners. It can accept one value to round all corners equally, or four values to round each corner (top-left, top-right, bottom-right, and bottom-left) independently.",
      value: "",
      maxOptionCounts: 4,

      options: ["length", ...globalCssOptions],
      labels: [
        ["All Corners Radius"],
        ["Top-Left and Bottom-Right Radius", "Top-Right and Bottom-Left Radius"],
        ["Top-Left Radius", "Top-Right and Bottom-Left", "Bottom-Right Radius"],
        ["Top-Left Radius", "Top-Right Radius", "Bottom-Right Radius", "Bottom-Left Radius"],
      ],
    },
    // {
    //   name: "border-bottom-left-radius",
    //   nameForTitle: "Border Bottom Left Radius",
    //   type: "string",
    //   description:
    //     "Defines the rounding of the bottom-left corner of an element's border. It can be set to create rounded corners on the bottom-left side.",
    //   value: "",
    //   maxOptionCounts: 2,
    //   labels: [
    //     ["All sides"], // For 1 value
    //     ["Horizontal", "Vertical"], // For 2 values
    //   ],
    //   options: ["length", ...globalCssOptions],
    // },
    // {
    //   name: "border-bottom-right-radius",
    //   nameForTitle: "Border Bottom Right Radius",
    //   type: "string",
    //   description:
    //     "Defines the rounding of the bottom-right corner of an element's border. It can be set to create rounded corners on the bottom-right side.",
    //   value: "",
    //   maxOptionCounts: 2,
    //   labels: [
    //     ["All sides"], // For 1 value
    //     ["Horizontal", "Vertical"], // For 2 values
    //   ],
    //   options: ["length", ...globalCssOptions],
    // },
    {
      name: "border-collapse",
      nameForTitle: "Border Collapse",
      type: "string",
      description:
        "Controls whether table cell borders are collapsed into a single border or separated.",
      value: "",
      options: ["collapse", "separate", ...globalCssOptions],
    },
    {
      name: "border-end-end-radius",
      nameForTitle: "Border End End Radius",
      type: "string",
      description:
        "Defines the rounding of the logical end of the element's border at the end of the block axis, which depends on the element's writing mode and text direction. It rounds the corner where the block-end and inline-end edges meet.",
      value: "",
      maxOptionCounts: 2,
      labels: [["All sides"], ["Horizontal", "Vertical"]],
      options: ["length", ...globalCssOptions],
    },
    {
      name: "border-end-start-radius",
      nameForTitle: "Border End Start Radius",
      type: "string",
      description:
        "Defines the rounding of the logical end of the element's border at the start of the block axis, which depends on the element's writing mode and text direction. It rounds the corner where the block-end and inline-start edges meet.",
      value: "",
      maxOptionCounts: 2,
      labels: [["All sides"], ["Horizontal", "Vertical"]],
      options: ["length", ...globalCssOptions],
    },
    {
      name: "border-image-outset",
      nameForTitle: "Border Image Outset",
      type: "string",
      description:
        "Specifies the amount by which the border image area extends beyond the element's border box. This allows the border image to extend outward from the box's edges.",
      value: "",
      maxOptionCounts: 4,
      labels: [
        ["All Sides Outset"],
        ["Top and Bottom Outset", "Left and Right Outset"],
        ["Top Outset", "Left and Right Outset", "Bottom Outset"],
        ["Top Outset", "Right Outset", "Bottom Outset", "Left Outset"],
      ],
      options: ["length", "number", ...globalCssOptions],
    },
    {
      name: "border-image-repeat",
      nameForTitle: "Border Image Repeat",
      type: "string",
      description:
        "Specifies how the border image is repeated, stretched, or spaced along the borders of an element. It controls how the image is applied to fit the border area.",
      value: "",
      maxOptionCounts: 2,
      labels: [["All Sides Repeat"], ["Top and Bottom Repeat", "Left and Right Repeat"]],
      options: ["stretch", "repeat", "round", "space", ...globalCssOptions],
    },
    {
      name: "border-image-slice",
      nameForTitle: "Border Image Slice",
      type: "string",
      description:
        "Specifies how to slice the border image into regions to define what part of the image will be used for the element's borders. The slicing happens by defining pixel or percentage values for the top, right, bottom, and left of the image.",
      value: "",
      supportedUnit: "%",
      defaultValue: "100%",
      maxOptionCounts: 4,
      labels: [
        ["All Sides Slice"],
        ["Top and Bottom Slice", "Left and Right Slice"],
        ["Top Slice", "Left and Right Slice", "Bottom Slice"],
        ["Top Slice", "Right Slice", "Bottom Slice", "Left Slice"],
      ],
      options: ["length", "number", "fill", ...globalCssOptions], // support percentage values only on length
    },
    {
      name: "border-image-source",
      nameForTitle: "Border Image Source",
      type: "string",
      description:
        "Specifies the image to be used as the border of an element. This property sets the URL of the image or allows the use of gradients, data URIs, or none to indicate that no image should be used.",
      value: "",
      options: ["none", ...globalCssOptions], // url(), linear gradient()
    },
    {
      name: "border-image-width",
      nameForTitle: "Border Image Width",
      type: "string",
      description:
        "Specifies the width of the border image. This defines how much space the border image occupies along the sides of the element, allowing for scaling and adjustments in relation to the border box.",
      value: "",
      defaultValue: "1",
      maxOptionCounts: 4,
      labels: [
        ["All Sides Width"],
        ["Top and Bottom Width", "Left and Right Width"],
        ["Top Width", "Left and Right Width", "Bottom Width"],
        ["Top Width", "Right Width", "Bottom Width", "Left Width"],
      ],
      options: ["auto", "length", "number", ...globalCssOptions],
    },
    {
      name: "border-inline-color",
      nameForTitle: "Border Inline Color",
      type: "string",
      description:
        "Specifies the color of the inline (start and end) borders. This property defines the color for both the start and end inline borders in a writing-mode-sensitive way.",
      value: "",
      maxOptionCounts: 2,
      labels: [["Start and End Color"], ["Start Color", "End Color"]],
      options: ["color", "currentcolor", "transparent", ...globalCssOptions],
    },
    {
      name: "border-inline-style",
      nameForTitle: "Border Inline Style",
      type: "string",
      description:
        "Specifies the style of the inline (start and end) borders. This property controls the line style of the start and end inline borders in a way that respects the writing mode.",
      value: "",
      maxOptionCounts: 2,
      labels: [["Start and End Style"], ["Start Style", "End Style"]],
      options: [...lineStyle, ...globalCssOptions],
    },
    {
      name: "border-inline-width",
      nameForTitle: "Border Inline Width",
      type: "string",
      description:
        "Specifies the width of the inline (start and end) borders. This property sets the width of the inline borders, which can differ between the start and end in a writing-mode-sensitive way.",
      value: "",
      maxOptionCounts: 2,
      labels: [["Start and End Width"], ["Start Width", "End Width"]],
      options: ["thin", "medium", "thick", "length", ...globalCssOptions],
    },
    {
      name: "border-spacing",
      nameForTitle: "Border Spacing",
      type: "string",
      description:
        "Sets the distance between the borders of adjacent cells in a table. This property applies to table elements and defines the space between cells in a table layout. It accepts one or two values to set horizontal and vertical spacing.",
      value: "",
      maxOptionCounts: 2,
      labels: [["All sides"], ["Horizontal", "Vertical"]],
      options: ["length", ...globalCssOptions],
    },
    {
      name: "border-start-end-radius",
      nameForTitle: "Border Start End Radius",
      type: "string",
      description:
        "Sets the radius of the border corner at the start and end of the element's inline axis. In left-to-right (LTR) writing modes, this affects the bottom-right corner; in right-to-left (RTL) writing modes, it affects the bottom-left corner. It supports one or more values to set different radii for each corner.",
      value: "",
      maxOptionCounts: 2,
      labels: [["All sides"], ["Horizontal", "Vertical"]],
      options: ["length", ...globalCssOptions],
    },
    {
      name: "border-start-start-radius",
      nameForTitle: "Border Start Start Radius",
      type: "string",
      description:
        "Sets the radius of the border corner at the start and start of the element's inline axis. In left-to-right (LTR) writing modes, this affects the top-left corner; in right-to-left (RTL) writing modes, it affects the top-right corner. It supports one or more values to set different radii for each corner.",
      value: "",
      maxOptionCounts: 2,
      labels: [["All sides"], ["Horizontal", "Vertical"]],
      options: ["length", ...globalCssOptions],
    },
    // {
    //   name: "border-top-left-radius",
    //   nameForTitle: "Border Top Left Radius",
    //   type: "string",
    //   description:
    //     "Defines the rounding of the top-left corner of an element's border. It can be set to create rounded corners on the top-left side.",
    //   value: "",
    //   maxOptionCounts: 2,
    //   labels: [
    //     ["All sides"], // For 1 value
    //     ["Horizontal", "Vertical"], // For 2 values
    //   ],
    //   options: ["length", ...globalCssOptions],
    // },
    // {
    //   name: "border-top-right-radius",
    //   nameForTitle: "Border Top Right Radius",
    //   type: "string",
    //   description:
    //     "Defines the rounding of the top-right corner of an element's border. It can be set to create rounded corners on the top-right side.",
    //   value: "",
    //   maxOptionCounts: 2,
    //   labels: [
    //     ["All sides"], // For 1 value
    //     ["Horizontal", "Vertical"], // For 2 values
    //   ],
    //   options: ["length", ...globalCssOptions],
    // },
  ],
};
