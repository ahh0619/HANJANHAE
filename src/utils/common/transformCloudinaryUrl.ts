export const transformCloudinaryUrl = (
  originalUrl: string,
  width: number,
): string => {
  return originalUrl.replace(/(w_)\d+/, `w_${width}`);
};
