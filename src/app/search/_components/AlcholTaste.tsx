import useFilterStore from '@/store/filterStore';

type TasteRadioButtonProps = {
  category: string; // "단맛", "신맛" 등 맛 카테고리
};

const AlcholeTaste = ({ category }: TasteRadioButtonProps) => {
  const { tastePreferences, setTastePreferences } = useFilterStore();

  const levels = [
    // 텍스트와 숫자 매핑
    { label: '매우 약함', value: 1 },
    { label: '약함', value: 2 },
    { label: '보통', value: 3 },
    { label: '강함', value: 4 },
    { label: '매우 강함', value: 5 },
  ];

  const categoryMapping: Record<string, string> = {
    단맛: 'sweetness',
    신맛: 'acidity',
    청량감: 'carbonation',
    바디감: 'body',
  };

  const handleCategoryClick = (value: number) => {
    const mappedCategory = categoryMapping[category] || category; // 한글 영문으로 변환하기
    setTastePreferences(mappedCategory, value); // 선택된 값 저장
  };

  const selectedValue = tastePreferences[categoryMapping[category]] || null;

  console.log(tastePreferences);

  return (
    <div className="mb-6">
      <h3 className="mb-2 text-sm font-semibold">{category}으로 찾기</h3>
      <div className="flex items-center justify-between">
        {levels.map(({ label, value }, index) => (
          <div
            key={value}
            onClick={() => handleCategoryClick(value)}
            className={`flex cursor-pointer flex-col ${
              index === levels.length - 1 ? 'items-end' : ''
            }`}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
                selectedValue === value
                  ? 'border-black bg-black'
                  : 'border-gray-400 bg-gray-200'
              }`} // 마지막 요소 스타일링
            >
              {selectedValue === value && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span
              className={`mt-1 text-sm transition-colors ${
                selectedValue === value
                  ? 'font-semibold text-black'
                  : 'text-gray-500'
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlcholeTaste;
