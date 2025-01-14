import { Swiper, SwiperSlide } from 'swiper/react';

import useFilterStore from '@/store/filterStore';
import useModalStore from '@/store/modalStore';

const FilterSideBar = () => {
  const { openModal } = useModalStore();
  const { selectedTypes, alcoholStrength, tastePreferences } = useFilterStore();
  console.log(selectedTypes, alcoholStrength, tastePreferences);
  const getStrengthLabel = (strength: [number, number]): string => {
    if (strength[1] <= 15) return '15도 이하';
    if (strength[0] >= 15 && strength[1] <= 30) return '15도 이상 30도 이하';
    if (strength[0] >= 30) return '30도 이상';
  };

  // tastePreferences를 한글로 변환하는 키-값 매핑
  const tasteMapping: { [key: string]: string } = {
    sweetness: '단맛',
    acidity: '신맛',
    carbonation: '청량감',
    body: '바디감',
  };

  // tastePreferences 값(숫자)을 텍스트로 변환하는 매핑
  const tasteLabels: { [key: number]: string } = {
    1: '매우 약함',
    2: '약함',
    3: '보통',
    4: '강함',
    5: '매우 강함',
  };

  // tastePreferences 객체를 순회하여 텍스트로 변환
  const tasteFilters = Object.entries(tastePreferences).map(([key, value]) => ({
    label: `${tasteMapping[key] || key}: ${tasteLabels[value] || '알 수 없음'}`,
    value,
  }));

  // 변환된 필터 데이터를 배열로 구성
  const filters = [
    ...selectedTypes.map((type) => ({ label: type, value: type })), // selectedTypes: 한글 텍스트 그대로 사용
    { label: getStrengthLabel(alcoholStrength), value: alcoholStrength }, // strength 변환된 값
    ...tasteFilters, // tastePreferences 변환된 값
  ].filter((item) => item.label !== undefined); // label이 undefined인 항목을 필터링
  console.log(filters);

  return (
    <div className="flex items-center space-x-2 rounded-lg px-4 py-2">
      {/* 각 필터 버튼 */}
      <div className="w-full overflow-hidden">
        <div>
          {/* Swiper 컨테이너 영역 */}
          <Swiper
            spaceBetween={10} // 슬라이드 간 간격
            slidesPerView="auto" // 각 슬라이드 크기를 자동으로 조정
            slidesPerGroup={1}
            loop={false} // 처음과 끝에서 반복되지 않도록 설정
          >
            {filters.map((filter, index) => (
              <SwiperSlide key={index} className="flex-none">
                <div className="float-left mr-2 flex items-center space-x-2 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700">
                  <span>{filter.label}</span>
                  <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label={`${filter.label} 삭제`}
                  >
                    ✕
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* 설정 아이콘 */}
      <button
        className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
        aria-label="필터 설정"
        onClick={openModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          width="24"
          height="24"
        >
          <line x1="8" y1="4" x2="8" y2="20"></line>
          <circle cx="8" cy="10" r="2"></circle>

          <line x1="16" y1="4" x2="16" y2="20"></line>
          <circle cx="16" cy="14" r="2"></circle>
        </svg>
      </button>
    </div>
  );
};

export default FilterSideBar;
