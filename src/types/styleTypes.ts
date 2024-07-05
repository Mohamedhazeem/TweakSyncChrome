import { Attribute } from "./attributeTypes";

export interface Style extends Attribute {
  category?: string;
  temporaryId?: string;
}

export interface IStyleContext {
  key: number;
  index: number;
  style: Style;
  children?: React.ReactNode;
  onChange: (index: number, value: string | object) => void;
  onRemove?: (removeStyle: string) => void;
}
