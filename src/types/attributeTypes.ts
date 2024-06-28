export interface Attribute {
  name: string;
  nameForTitile?: string;
  description: string;
  type?: string | boolean | number;
  value: string | boolean | number | object;
  options?: string[]; // For enum type attributes
}
export interface IAttributeContext {
  key: number;
  index: number;
  attribute: Attribute;
  children?: React.ReactNode;
  onChange: (index: number, value: string | object) => void;
}
