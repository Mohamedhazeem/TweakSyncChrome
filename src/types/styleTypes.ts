import { Attribute } from "./attributeTypes";

export interface Style extends Attribute {
  value: string;
  maxOptionCounts?: number;
  temporaryId?: string;
}

export interface IStyleContext {
  key: string | number;
  name: string;
  selector: string;
  children?: React.ReactNode;
  group?: StyleGroup;
  onChange: (selector: string, property: string, newColor: string) => void;
  onRemove?: (removeStyle: string) => void;
}
export interface StyleGroup {
  groupName: string;
  propertyNames: string[];
  groups: Style[];
}
