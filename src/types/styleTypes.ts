import { Attribute } from "./attributeTypes";

export interface Style extends Attribute {
  category?: string;
  temporaryId?: string;
}

export interface IStyleContext {
  key: string | number;
  name: string;
  selector: string;
  property: string;
  value: string;
  children?: React.ReactNode;
  style?: Style;
  onChange: (selector: string, property: string, newColor: string) => void;
  onRemove?: (removeStyle: string) => void;
}
