export const getSelectedTypes = (searchParams: URLSearchParams): string[] => {
  return searchParams.get('selectedTypes')
    ? searchParams.get('selectedTypes')!.split(',')
    : [];
};

export const getAlcoholStrength = (
  searchParams: URLSearchParams,
): [number, number] | null => {
  if (!searchParams.get('alcoholStrength')) return null;
  try {
    const values = JSON.parse(searchParams.get('alcoholStrength')!) as [
      number,
      number,
    ];
    return Array.isArray(values) && values.length === 2 ? values : null;
  } catch (error) {
    console.error('Invalid alcoholStrength format:', error);
    return null;
  }
};

export const getTastePreferences = (
  searchParams: URLSearchParams,
): Record<string, number> => {
  if (!searchParams.get('tastePreferences')) return {};
  return Object.fromEntries(
    searchParams
      .get('tastePreferences')!
      .replace(/^\{|\}$/g, '')
      .split(',')
      .map((pair) => {
        const [key, value] = pair.split(':').map((item) => item.trim());
        return [key, Number(value)];
      }),
  );
};

export const getKeyword = (searchParams: URLSearchParams): string => {
  return searchParams.get('keyword') || '';
};

export const getLiked = (searchParams: URLSearchParams): string => {
  return searchParams.get('sort') === 'liked' ? 'liked' : '';
};
