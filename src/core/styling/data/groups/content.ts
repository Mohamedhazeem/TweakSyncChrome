import type { StyleGroup } from "@/types/styleTypes";
import { globalCssOptions } from "../options";

export const ContentGroup: StyleGroup = {
  groupName: "Content",
  propertyNames: ["content", "content-visibility"],
  groups: [
    {
      name: "content",
      nameForTitle: "Content",
      type: "string",
      description:
        "Generates content to be inserted before or after an element's content using pseudo-elements.",
      value: "",
      options: ["none", "text", ...globalCssOptions], // url()
    },
    {
      name: "content-visibility",
      nameForTitle: "Content Visibility",
      type: "string",
      description:
        "Controls the visibility and rendering of an element's content, optimizing performance by skipping rendering when content is not visible.",
      value: "",
      options: [
        "auto", // The browser decides whether to render content based on visibility in the viewport.
        "hidden", // The content is not visible and will not be rendered.
        "visible", // The default value. The content is visible.
        ...globalCssOptions,
      ],
    },
  ],
};
