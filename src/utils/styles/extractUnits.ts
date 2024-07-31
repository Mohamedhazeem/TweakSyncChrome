export const extractUnit = (value: string): string => {
  const match = value.match(/[a-z%]+$/i);
  return match ? match[0] : "";
};
export const extractValue = (value: string): string => {
  const match = value.match(/^[\d.]+/);
  return match ? match[0] : "";
};
export function extractString(input: string): string {
  if (input.startsWith('"') && input.endsWith('"')) {
    return input.slice(1, -1);
  }
  return input;
}
