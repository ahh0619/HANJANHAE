import { GenerateUrlType } from '@/types/search';

export const generateUrl = ({
  selectedTypes = [],
  alcoholStrength = null,
  tastePreferences = {},
  keyword = '',
  sort = 'alphabetical', // 기본 정렬 값 추가
}: GenerateUrlType): string => {
  const queryParams = [
    // 선택된 주종
    selectedTypes.length > 0 ? `selectedTypes=${selectedTypes.join(',')}` : '',

    // 알코올 도수
    alcoholStrength ? `alcoholStrength=${JSON.stringify(alcoholStrength)}` : '',

    // 맛 선호도
    Object.keys(tastePreferences).length > 0
      ? `tastePreferences=${encodeURIComponent(JSON.stringify(tastePreferences))}`
      : '',

    // 검색어 (keyword)
    keyword ? `keyword=${encodeURIComponent(keyword)}` : '',

    // 정렬 (sort) - 기본값 'alphabetical'
    sort ? `sort=${encodeURIComponent(sort)}` : '',
  ]
    .filter(Boolean) // 빈 문자열 제거
    .join('&'); // '&'로 연결

  return `/search${queryParams ? `?${queryParams}` : ''}`;
};
