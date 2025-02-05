'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import OptimizedImage from '@/components/common/OptimizedImage';
import useDrinkCount from '@/hooks/search/useDrinkCount';
import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';
import useModalStore, { useBodyLock } from '@/store/modalStore';
import useSortStore from '@/store/selectStore';
import { generateUrl } from '@/utils/filter/generateUrl';

import FilterType from './FilterTypes';

const FilterModal = () => {
  const router = useRouter();
  // 사용하지 않는 코드들은 모두 정리하기

  const queryClient = useQueryClient();
  const { setIsSliderClicked } = useFocusStore();
  const { isModalOpen, closeModal } = useModalStore();
  const totalCount = useDrinkCount();
  useBodyLock();

  const {
    selectedTypes,
    alcoholStrength,
    tastePreferences,
    setAlcoholStrength,
    setIsFiltered,
    resetFilters,
    setTriggerFetch,
    setValues,
  } = useFilterStore();
  const { setSelectedSort } = useSortStore();
  const { isSearchFocus, setIsSearchFocuse, resetStates } = useFocusStore();

  // 추가된 상태: 애니메이션 트리거
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    if (isModalOpen) {
      // 모달이 열릴 때 애니메이션 활성화
      setTimeout(() => setIsAnimating(true), 50); // 약간의 지연 추가
    } else {
      // 모달이 닫힐 때 애니메이션 비활성화
      setIsAnimating(false);
    }
  }, [isModalOpen]);

  // 라우터 이동이나 모달 닫는건?
  // 보통은 하나의 함수는 하나의 일만 하는데
  // 여긴 분리를 해야 좋을 것 같다.
  // setIsFilter가 쓰이는 부분을 모두 수정을 한다면?
  // setIsFilter는 true false로 만드는 일들이 많을텐데
  // 이게 분산이 되어 있는데 한번에 처리할 수 있을까?

  // 어디를 수정하면 코드의 맥락을 최소한으로 파악해서 수정할 수 있는가?
  const handleApplyfilters = () => {
    setIsFiltered(true);
    setTriggerFetch(true);
    const newUrl = generateUrl({
      selectedTypes,
      alcoholStrength,
      tastePreferences,
    });
    router.push(newUrl);
    closeModal();
    setSelectedSort('alphabetical');
  };

  const handleFilterReset = () => {
    resetFilters();
    setIsSliderClicked(false);
    setIsSearchFocuse(false);
    setValues([1, 3]);
    setSelectedSort('alphabetical');
  };

  return (
    <>
      {/* 모달 배경 */}
      <div
        className={`fixed inset-0 z-[100] bg-black bg-opacity-10 transition-opacity duration-200 ease-in xl:bg-opacity-50 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeModal}
      />

      {/* 모달 Wrap */}
      <div
        className={`ease fixed inset-0 z-[101] flex h-full transform flex-col justify-end transition-transform duration-500 ${
          isAnimating ? 'translate-y-0' : 'translate-y-[120%]'
        }`}
      >
        {/* 모달 Scroll Box */}
        <div className="relative left-1/2 flex h-[95%] max-w-[512px] -translate-x-1/2 transform flex-col rounded-t-[32px] bg-white shadow-lg xl:top-[-35%] xl:h-[462px] xl:rounded-b-[12px] xl:rounded-t-[12px]">
          {/* Modal Header */}
          <div
            className="flex items-center justify-between rounded-t-[32px] bg-[var(--Etc-background)] px-[19px]"
            style={{ height: 'auto', padding: '12px 19px' }}
          >
            <OptimizedImage
              src="/assets/icons/cancelDark.svg"
              alt="검색 키워드 삭제 아이콘"
              className="cursor-pointer p-2"
              onClick={closeModal}
            />
            <h2 className="pl-[13px] text-title-xl font-bold leading-[135%] text-grayscale-900">
              필터
            </h2>
            <button
              onClick={handleFilterReset}
              className="p-3 text-label-lm font-medium leading-[150%] text-gray-900"
            >
              초기화
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="scroll-hidden mb-[100px] mt-0 flex-grow px-[19px] pt-12 xl:mt-12 xl:pt-0">
            <FilterType />
          </div>

          {/* Apply Button */}
          <div className="fixed bottom-[0] left-1/2 z-[102] flex w-[100%] max-w-[600px] -translate-x-1/2 transform justify-center rounded-b-[0] bg-white p-[12px_20px] pb-[33px] xl:rounded-b-[12px]">
            <button
              onClick={handleApplyfilters}
              className="text-label-xml flex w-[335px] shrink-0 items-center justify-center rounded-[8px] bg-primary p-[12px_16px] font-medium leading-[30px] text-white"
            >
              {totalCount}개의 결과 보기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
