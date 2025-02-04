export const transformCloudinaryUrl = (originalUrl: string): string => {
  return originalUrl.replace(/(w_)\d+/, '$1448');
};
