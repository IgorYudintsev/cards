export const cutter = (str: string, cut: number) => {
  if (cut === 13) {
    return str.length > cut ? `${str.slice(0, cut)}...` : str;
  }
  return str.length > cut ? `${str.slice(0, cut)}` : str;
};
