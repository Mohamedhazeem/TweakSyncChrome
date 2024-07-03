export interface Attribute {
  name: string;
  nameForTitle?: string;
  description: string;
  type?: string | boolean | number;
  value: string | boolean | number | object;
  options?: string[] | { [key: string]: string }; // For enum type attributes
}
export interface IAttributeContext {
  key: number;
  index: number;
  attribute: Attribute;
  children?: React.ReactNode;
  onChange: (index: number, value: string | object) => void;
  onRemove?: (removeAttribute: string) => void;
}
export const accessKeylists = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
