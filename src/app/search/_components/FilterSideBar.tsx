import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import OptimizedImage from '@/components/common/OptimizedImage';
import useFilterStore from '@/store/filterStore';
import useModalStore from '@/store/modalStore';
import { FilterItem } from '@/types/search';
import { generateUrl } from '@/utils/filter/generateUrl';
import {
  getAlcoholStrength,
  getSelectedTypes,
  getTastePreferences,
} from '@/utils/filter/queryParamsUtils';

const FilterSideBar = () => {
  
  const searchParams = useSearchParams();
  const shouldHideFilterSidebar = searchParams.get('keyword') !== null;
  const router = useRouter();
  const { openModal } = useModalStore();
  const {
    selectedTypes,
    alcoholStrength,
    tastePreferences,
    setSelectedTypes,
    setAlcoholStrength,
    setTastePreferences,
    removeSelectedType,
    removeAlcoholStrength,
    removeTastePreference,
    setTriggerFetch,
    setValues,
  } = useFilterStore();
  const paramSelectedTypes = shouldHideFilterSidebar
    ? []
    : getSelectedTypes(searchParams);
  const paramAlcoholStrength: [number, number] = shouldHideFilterSidebar
    ? [0, 100]
    : getAlcoholStrength(searchParams);
  const paramTastePreferences = shouldHideFilterSidebar
    ? {}
    : getTastePreferences(searchParams);
  const [isUserAction, setIsUserAction] = useState(false);
  const getStrengthLabel = (
    strength: [number, number] | null | undefined,
  ): string => {
    const [min, max] = strength ?? [0, 100];

    if (min === 0 && max === 100) return '전체 도수';
    if (max <= 15) return '15도 이하';
    if (min >= 15 && max <= 30) return '15도 이상 30도 이하';
    if (min === 0 && max === 30) return '30도 이하';
    if (min === 15 && max === 100) return '15도 이상';
    if (min >= 30 && max === 100) return '30도 이상';

    return '알 수 없음'; // 기본값 설정
  };

  const tasteMapping: { [key: string]: string } = {
    sweetness: '단맛',
    acidity: '신맛',
    carbonation: '청량감',
    body: '바디감',
  };

  const tasteLabels: { [key: number]: string } = {
    1: '매우 약함',
    2: '약함',
    3: '보통',
    4: '강함',
    5: '매우 강함',
  };

  const filters: FilterItem[] = [
    ...paramSelectedTypes.map((type) => ({
      label: type,
      value: type,
      original: type,
    })),
    {
      label: getStrengthLabel(paramAlcoholStrength),
      value: [paramAlcoholStrength[0], paramAlcoholStrength[1]] as [
        number,
        number,
      ],
      original: 'strength',
    },
    ...Object.entries(paramTastePreferences).map(([key, value]) => {
      let normalizedKey = key.toLowerCase().trim();
      const numericValue = Number(value);
      normalizedKey = normalizedKey.replace(/^"(.*)"$/, '$1');
      return {
        label: `${tasteMapping[normalizedKey] || key}: ${tasteLabels[numericValue] || '알 수 없음'}`,
        value: numericValue,
        original: key,
      };
    }),
  ]
    .filter((item) => item.label !== undefined)
    .filter(
      (item) => item.label !== '알 수 없음' && item.label !== '전체 도수',
    );

  const handleRemoveType = (original: string) => {
    setIsUserAction(true);
    removeSelectedType(original);
  };

  const handleRemoveStrength = () => {
    setValues([1, 3]);
    setIsUserAction(true);
    removeAlcoholStrength();
  };

  const handleRemoveTastePreference = (value: string) => {
    setIsUserAction(true);
    const replaceValue = value.replace(/^"(.*)"$/, '$1');
    removeTastePreference(replaceValue);
  };

  useEffect(() => {
    if (!isUserAction) return;
    const newUrl = generateUrl({
      selectedTypes,
      alcoholStrength,
      tastePreferences,
    });
    router.push(newUrl);
  }, [selectedTypes, alcoholStrength, tastePreferences]);

  return (
    <div className="mx-auto mt-[16px] flex h-[32px] max-w-md items-center justify-between gap-2 rounded-lg xl:mb-[30px] xl:mt-[30px] xl:w-[588px] xl:max-w-none">
      {/* 각 필터 버튼 */}
      <div className="w-fit overflow-hidden">
        <Swiper spaceBetween={8} slidesPerView="auto">
          {filters.map((filter, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <div
                key={index}
                className="flex flex-none shrink-0 items-center gap-1 rounded-[16px] border border-primary-200 bg-white px-3 py-2 text-sm font-bold text-primary-200"
              >
                <span className="flex items-center text-label-mm">
                  {filter.label}
                </span>
                <button
                  className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={`${filter.label} 삭제`}
                  onClick={() => {
                    if (
                      Array.isArray(filter.value) &&
                      Array.isArray(paramAlcoholStrength) && 
                      filter.value.length === paramAlcoholStrength.length && 
                      filter.value.every(
                        (val, index) => val === paramAlcoholStrength[index],
                      ) 
                    ) {
                      handleRemoveStrength();
                    } else if (filter.original in paramTastePreferences) {
                      handleRemoveTastePreference(filter.original); 
                    } else {
                      handleRemoveType(filter.original); 
                    }
                  }}
                >
                  <OptimizedImage
                    src="/assets/icons/cancel-primary.svg"
                    alt="선택된 필터 취소 버튼"
                    className="cursor-pointer"
                  />
                </button>
              </div>
            </SwiperSlide>
          ))}
          {/* </div> */}
        </Swiper>
      </div>

      {/* 설정 아이콘 */}
      <div className="w-[full]">
        <button
          className="inline-block flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 focus:outline-none"
          aria-label="필터 설정"
          onClick={openModal}
        >
          <OptimizedImage
            src="/assets/icons/sliders-v-alt-white.svg"
            alt="필터 버튼"
            className="cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default FilterSideBar;
