export interface Attribute {
  name: string;
  description: string;
  value: string | boolean;
  options?: string[]; // For enum type attributes
}
export interface IAttributeContext {
  key?: number;
  attribute?: Attribute;
}
