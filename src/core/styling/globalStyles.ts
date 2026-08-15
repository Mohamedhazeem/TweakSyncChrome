import type { Style, StyleGroup } from "@/types/styleTypes";
import { GLOBAL_STYLES } from "./data/globalStyleList";
import { STYLE_GROUPS } from "./data/groups";

export {
  customAndGlobalCssOptions,
  dynamicOptions,
  globalCssOptions,
  lengthUnits,
  LengthUnit,
  lineStyle,
  namedPositions,
} from "./data/options";

export { GLOBAL_STYLES, STYLE_GROUPS };

/** O(1) lookup of a property descriptor by CSS property name. */
const GLOBAL_STYLE_INDEX: Map<string, Style> = new Map(
  GLOBAL_STYLES.map((style) => [style.name, style])
);

export function getGlobalStyle(name: string): Style | undefined {
  return GLOBAL_STYLE_INDEX.get(name);
}

/** O(1) lookup of a style group by its display name. */
const STYLE_GROUP_INDEX: Map<string, StyleGroup> = new Map(
  STYLE_GROUPS.map((group) => [group.groupName, group])
);

export function getStyleGroup(groupName: string): StyleGroup | undefined {
  return STYLE_GROUP_INDEX.get(groupName);
}

/** O(1) lookup of the group that owns a CSS property. */
const PROPERTY_TO_GROUP: Map<string, StyleGroup> = (() => {
  const index = new Map<string, StyleGroup>();
  for (const group of STYLE_GROUPS) {
    for (const propertyName of group.propertyNames) {
      if (!index.has(propertyName)) {
        index.set(propertyName, group);
      }
    }
  }
  return index;
})();

export function getGroupForProperty(propertyName: string): StyleGroup | undefined {
  return PROPERTY_TO_GROUP.get(propertyName);
}
