import { GenerateUrlType } from '@/types/search';

export const generateUrl = ({
  selectedTypes = [],
  alcoholStrength = null,
  tastePreferences = {},
  keyword = '',
  sort = 'alphabetical',
}: GenerateUrlType): string => {
  const queryParams = [
    selectedTypes.length > 0 ? `selectedTypes=${selectedTypes.join(',')}` : '',

    alcoholStrength ? `alcoholStrength=${JSON.stringify(alcoholStrength)}` : '',

    Object.keys(tastePreferences).length > 0
      ? `tastePreferences=${encodeURIComponent(JSON.stringify(tastePreferences))}`
      : '',

    keyword ? `keyword=${encodeURIComponent(keyword)}` : '',

    sort ? `sort=${encodeURIComponent(sort)}` : '',
  ]
    .filter(Boolean)
    .join('&');

  return `/search${queryParams ? `?${queryParams}` : ''}`;
};
