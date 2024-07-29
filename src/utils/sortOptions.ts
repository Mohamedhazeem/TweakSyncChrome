export const sortOptions = (options: string[]): string[] => {
  return options.sort((a, b) => a.localeCompare(b));
};
