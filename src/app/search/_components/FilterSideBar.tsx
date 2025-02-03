import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import OptimizedImage from '@/components/common/OptimizedImage';
import useFilterStore from '@/store/filterStore';
import useModalStore from '@/store/modalStore';
import { generateUrl } from '@/utils/filter/generateUrl';
import {
  getAlcoholStrength,
  getSelectedTypes,
  getTastePreferences,
} from '@/utils/filter/queryParamsUtils';

type FilterItem = {
  label: string; // 필터에 표시되는 텍스트
  value: string | number | [number, number]; // 값은 문자열, 숫자, 또는 배열
  original: string; // 고유 식별자
};

const FilterSideBar = () => {
  const searchParams = useSearchParams();
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
  const paramSelectedTypes = getSelectedTypes(searchParams);

  const paramAlcoholStrength = getAlcoholStrength(searchParams);
  const paramTastePreferences = getTastePreferences(searchParams);
  console.log(paramTastePreferences);
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
    if (min >= 30 && max === 100) return '30도 이상'; // 30도 이상으로 수정

    return '알 수 없음'; // 기본값 설정
  };
  // 이런 데이터들 => 상수 관리하는 파일 const.ts
  // 따로 관리를 해서 굳이 컴포넌트 내부에서 선언하지 않고 가져올 수 있다.
  // 컴포넌트 안에다가 변수를 처리하지 않는다.
  // 제 렌더링 될 때마다 새로운 변수를 계속 만들어내는 거임.
  // 이것들은 컴포넌트 밖에 있는게 맞다.
  // 안에 두고 있는 변수들은 state 가 내부에 있을 때만
  // 혹은 hook을 사용하거나 state는 매번 바뀌어야 하기 때문에 안에 있는거고,
  // 여기 있는 데이터는 변하지 않기 때문에 밖에 두는 것이 좋다.
  // 최상위 폴더나 파일 같은거 만들어서

  // tastePreferences 값(숫자)을 텍스트로 변환하는 매핑
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

  // 변환된 필터 데이터를 배열로 구성
  // 이 부분을 좀 리팩토링을 한번 해볼만 하다.
  const filters: FilterItem[] = [
    ...paramSelectedTypes.map((type) => ({
      label: type,
      value: type,
      original: type, // selectedTypes에서 영문 원문 그대로 사용
    })),
    {
      label: getStrengthLabel(paramAlcoholStrength),
      value: [paramAlcoholStrength[0], paramAlcoholStrength[1]] as [
        number,
        number,
      ],
      original: 'strength', // 도수에 대한 원문 값
    },
    ...Object.entries(paramTastePreferences).map(([key, value]) => {
      let normalizedKey = key.toLowerCase().trim();
      const numericValue = Number(value); // 여기서 숫자로 변환
      normalizedKey = normalizedKey.replace(/^"(.*)"$/, '$1'); // replace 없으면 동작이 안됨
      console.log(normalizedKey);
      console.log(tasteMapping[normalizedKey]);
      return {
        label: `${tasteMapping[normalizedKey] || key}: ${tasteLabels[numericValue] || '알 수 없음'}`,
        value: numericValue, // 혹은 value: numericValue
        original: key, // tastePreferences의 key를 original로 사용
      };
    }),
  ]
    .filter((item) => item.label !== undefined)
    .filter(
      (item) => item.label !== '알 수 없음' && item.label !== '전체 도수',
    );

  const handleRemoveType = (original: string) => {
    console.log(1);
    setIsUserAction(true);
    removeSelectedType(original);
  };

  const handleRemoveStrength = () => {
    console.log(1);
    setValues([1, 3]);
    setIsUserAction(true);
    removeAlcoholStrength();
  };

  const handleRemoveTastePreference = (value: string) => {
    console.log(1);
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
        {/* Swiper 컨테이너 영역 */}
        <Swiper spaceBetween={8} slidesPerView="auto">
          {filters.map((filter, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
              <div
                key={index}
                className="flex flex-none shrink-0 items-center gap-1 rounded-full border border-primary-200 bg-white px-3 py-2 text-sm font-bold text-primary-200"
              >
                <span className="flex items-center text-label-mm">
                  {filter.label}
                </span>
                <button
                  className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={`${filter.label} 삭제`}
                  onClick={() => {
                    if (
                      Array.isArray(filter.value) && // filter.value가 배열인지 확인
                      Array.isArray(paramAlcoholStrength) && // alcoholStrength도 배열인지 확인
                      filter.value.length === paramAlcoholStrength.length && // 길이 비교
                      filter.value.every(
                        (val, index) => val === paramAlcoholStrength[index],
                      ) // 모든 요소 비교
                    ) {
                      handleRemoveStrength();
                    } else if (filter.original in paramTastePreferences) {
                      handleRemoveTastePreference(filter.original); // 맛 필터 삭제
                    } else {
                      handleRemoveType(filter.original); // 술 타입 필터 삭제
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
