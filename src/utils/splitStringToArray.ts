export function splitStringToArray(text: string): string[] {
  // Split by space or comma, and filter out empty strings
  const optionsArray = text.split(/[,\s]+/).filter(Boolean);
  return optionsArray;
}
