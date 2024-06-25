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

export const GLOBAL_ATTRIBUTES: Attribute[] = [
  { name: "id", description: "Unique identifier for the element", value: "" },
  {
    name: "class",
    description: "CSS classes for the element",
    value: "",
  },
];
