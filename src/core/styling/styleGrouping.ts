import type { ElementStyles } from "@/types/elementTypes";
import type { StyleGroup } from "@/types/styleTypes";

/**
 * Builds a `property -> owning groups` index once so grouping a set of
 * declarations costs O(properties) instead of O(properties x groups x names).
 */
function buildPropertyIndex(styleGroups: readonly StyleGroup[]): Map<string, StyleGroup[]> {
  const index = new Map<string, StyleGroup[]>();
  for (const group of styleGroups) {
    for (const propertyName of group.propertyNames) {
      const owners = index.get(propertyName);
      if (owners) {
        owners.push(group);
      } else {
        index.set(propertyName, [group]);
      }
    }
  }
  return index;
}

const indexCache = new WeakMap<readonly StyleGroup[], Map<string, StyleGroup[]>>();

function propertyIndexFor(styleGroups: readonly StyleGroup[]): Map<string, StyleGroup[]> {
  const cached = indexCache.get(styleGroups);
  if (cached) {
    return cached;
  }
  const index = buildPropertyIndex(styleGroups);
  indexCache.set(styleGroups, index);
  return index;
}

/** Groups a flat declaration bag by the style groups that own each property. */
export function groupStylesByStyleGroups(
  properties: { [key: string]: string },
  styleGroups: readonly StyleGroup[]
): { [key: string]: StyleGroup } {
  const index = propertyIndexFor(styleGroups);
  const groupedStyles: { [key: string]: StyleGroup } = {};

  for (const property of Object.keys(properties)) {
    const owners = index.get(property);
    if (!owners) {
      continue;
    }
    for (const group of owners) {
      groupedStyles[group.groupName] = {
        ...group,
        groups: group.groups.map((style) => ({
          ...style,
          value: properties[style.name] || "",
        })),
      };
    }
  }

  return groupedStyles;
}

/** Reports which vertical-navbar bucket indexes currently hold styles. */
export function getHasStyles(styles: ElementStyles): { [key: number]: boolean } {
  const external = styles.external;
  return {
    0: Boolean(external.classes) && Object.keys(external.classes).length > 0,
    1: Boolean(external.ids) && Object.keys(external.ids).length > 0,
    2: Boolean(external.tags) && Object.keys(external.tags).length > 0,
    3: Boolean(external.attribute) && Object.keys(external.attribute).length > 0,
    4: Boolean(external.descendant) && Object.keys(external.descendant).length > 0,
    5:
      Boolean(external.pseudoElementStyles) &&
      Object.keys(external.pseudoElementStyles).length > 0,
    6:
      Boolean(external.pseudoClassStyles) &&
      Object.keys(external.pseudoClassStyles).length > 0,
  };
}
