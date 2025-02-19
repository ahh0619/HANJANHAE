'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import OptimizedImage from '@/components/common/OptimizedImage';
import useDrinkCount from '@/hooks/search/useDrinkCount';
import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';
import useModalStore from '@/store/modalStore';
import { generateUrl } from '@/utils/filter/generateUrl';

import FilterType from './FilterTypes';

const FilterModal = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { setIsSliderClicked } = useFocusStore();
  const { isModalOpen, closeModal } = useModalStore();
  const totalCount = useDrinkCount();
  const {
    selectedTypes,
    alcoholStrength,
    tastePreferences,
    setAlcoholStrength,
    setIsFiltered,
    resetFilters,
    setValues,
  } = useFilterStore();
  const { isSearchFocus, setIsSearchFocuse } = useFocusStore();

  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => setIsAnimating(true), 50);
    } else {
      setIsAnimating(false);
    }
  }, [isModalOpen]);

  const handleApplyfilters = () => {
    setIsFiltered(true);
    const newUrl = generateUrl({
      selectedTypes,
      alcoholStrength,
      tastePreferences,
    });
    router.push(newUrl);
    closeModal();
  };

  const handleFilterReset = () => {
    resetFilters();
    setIsSliderClicked(false);
    setIsSearchFocuse(false);
    setValues([1, 3]);
  };

  return (
    <>
      {/* Modal Background */}
      <div
        className={`fixed inset-0 z-[100] bg-black bg-opacity-10 transition-opacity duration-200 ease-in xl:bg-opacity-50 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeModal}
      />
      <div
        className={`ease fixed inset-0 z-[101] flex h-full transform flex-col justify-end transition-transform duration-500 xl:translate-y-0 xl:duration-700 ${
          isAnimating ? 'translate-y-0' : 'translate-y-[120%]'
        }`}
      >
        {/* Modal Wrap */}
        <div className="relative left-1/2 flex h-[95%] max-w-[512px] -translate-x-1/2 transform flex-col rounded-t-[32px] bg-white p-5 shadow-lg xl:absolute xl:top-1/2 xl:h-[462px] xl:-translate-y-1/2 xl:rounded-b-[12px] xl:rounded-t-[12px]">
          {/* Modal Header */}
          <div className="flex h-auto items-center justify-between rounded-t-[32px] bg-[var(--Etc-background)]">
            <OptimizedImage
              src="/assets/icons/cancelDark.svg"
              alt="검색 키워드 삭제 아이콘"
              className="cursor-pointer p-2"
              onClick={closeModal}
            />
            <h2 className="pl-[20px] text-title-xl font-bold leading-[135%] text-grayscale-900">
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
          <div className="scroll-hidden mb-[0] mt-0 flex-grow pb-[105px] pt-[36px] xl:mb-[79px] xl:mt-[8px] xl:px-[16px] xl:pb-[0] xl:pt-0">
            <FilterType />
          </div>

          {/* Apply Button */}
          <div className="fixed bottom-[0] left-1/2 z-[102] flex w-[100%] max-w-[600px] -translate-x-1/2 transform justify-center rounded-b-[0] bg-white p-[12px_20px] pb-[33px] xl:rounded-b-[12px]">
            <button
              onClick={handleApplyfilters}
              className="text-label-xml flex w-[335px] shrink-0 items-center justify-center rounded-[8px] bg-primary p-[12px_16px] font-medium leading-[30px] text-white xl:w-[100%]"
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
