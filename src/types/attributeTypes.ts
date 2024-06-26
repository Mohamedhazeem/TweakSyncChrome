export interface Attribute {
  name: string;
  description: string;
  type?: string | boolean | number;
  value: string | boolean | number;
  options?: string[]; // For enum type attributes
}
export interface IAttributeContext {
  key?: number;
  attribute?: Attribute;
  onChange: (index: number, value: string) => void;
}
