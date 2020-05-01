export const getFileNameWithoutEXT = (str: string): string | null => {
  const regex = /(.+)(\.[^.]+$)/;
  const match = str.match(regex);
  if (!match) return null;
  return match[1];
};
