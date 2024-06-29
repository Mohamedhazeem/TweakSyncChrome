export function capitalizeFirstLetter(text: string): string {
  if (!text) return text; // Return early if the string is empty

  return text
    .split("-") // Split the string by hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each part
    .join("-"); // Join the parts back together with hyphens
}
