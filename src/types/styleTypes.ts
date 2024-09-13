export interface Style {
  name: string;
  nameForTitle?: string;
  description?: string;
  type?: string | boolean | number;
  options?: string[] | { [key: string]: string };
  value: string;
  maxOptionCounts?: number;
  labels?: string[][];
  temporaryId?: string;
  functions?: string[];
}

export interface IStyleContext {
  // key: string | number;
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

export interface CssFunction {
  type: string;
  value: string;
}
