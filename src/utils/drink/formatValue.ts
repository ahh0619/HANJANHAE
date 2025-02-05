export const formatDrinkInfoValue = (value: string | number | null): string => {
  if (value === null || value === undefined || value === '') {
    return '정보 없음';
  }

  if (typeof value === 'number') {
    return `${value}%`;
  }

  return value;
};
