/** Attribute and node constants shared by the element domain. Framework agnostic. */

/** `Node.TEXT_NODE` without reaching for the DOM global. */
export const TEXT_NODE = 3;

/** Attribute stamped on an element once VS Code knows about it. */
export const TWEAKSYNC_ID = "data-tweaksync-id";

/** Attribute stamped on an element that has only been selected in the page. */
export const TWEAKSYNC_TEMPORARY_ID = "data-tweaksync-temporaryid";

/** Marker attribute used by TweakSync's own in-page UI nodes. */
export const TWEAKSYNC_UI = "data-tweaksyncui";
