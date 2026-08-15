export function capitalizeFirstLetter(text: string): string {
  if (!text) return text; // Return early if the string is empty

  return text
    .split("-") // Split the string by hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each part
    .join("-"); // Join the parts back together with hyphens
}

export function splitStringToArray(text: string): string[] {
  // Split by space or comma, and filter out empty strings
  return text.split(/[,\s]+/).filter(Boolean);
}

export const sortOptions = (options: string[]): string[] => {
  return [...options].sort((a, b) => a.localeCompare(b));
};
