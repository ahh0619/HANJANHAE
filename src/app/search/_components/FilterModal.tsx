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

import FilterType from './FilterTypes';

const FilterModal = () => {
  const router = useRouter();
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

  const handleApplyfilters = () => {
    const defaultKeyword = 'filtered';
    router.push(`/search?query=${defaultKeyword}`);
    queryClient.removeQueries({
      queryKey: ['filterDrinks'],
      exact: false,
    });
    if (alcoholStrength === null) {
      setAlcoholStrength([0, 100]);
    }
    closeModal();
    setIsFiltered(true);
    setTriggerFetch(true);
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
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black bg-opacity-10 transition-opacity duration-200 ease-in ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeModal}
      />

      {/* Modal Content */}
      <div
        className={`ease fixed inset-0 z-[101] flex h-full transform flex-col justify-end transition-transform duration-500 ${
          isAnimating ? 'translate-y-0' : 'translate-y-[120%]'
        }`}
      >
        {/* Modal Box */}
        <div className="relative left-1/2 flex h-[95%] max-w-[600px] -translate-x-1/2 transform flex-col rounded-t-[32px] bg-white shadow-lg">
          {/* Modal Header */}
          <div
            className="mt-[12px] flex items-center justify-between rounded-t-[32px] bg-[var(--Etc-background)] px-[19px]"
            style={{ height: 'auto', padding: '12px 19px' }}
          >
            <OptimizedImage
              src="/assets/icons/cancelDark.svg"
              alt="검색 키워드 삭제 아이콘"
              className="cursor-pointer"
              onClick={closeModal}
            />

            <h2 className="text-title-xl font-bold leading-[135%] text-grayscale-900">
              필터
            </h2>
            <button
              onClick={handleFilterReset}
              className="text-label-lm font-medium leading-[150%] text-gray-900"
            >
              초기화
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="scroll-hidden flex-grow px-[19px] pb-[117px] pt-12">
            <FilterType />
          </div>
        </div>

        {/* Apply Button */}
        <div className="fixed bottom-[0] left-1/2 z-[102] flex w-[100%] max-w-[600px] -translate-x-1/2 transform justify-center bg-white p-[12px_20px] pb-[33px]">
          <button
            onClick={handleApplyfilters}
            className="text-label-xml flex w-[335px] shrink-0 items-center justify-center rounded-[8px] bg-primary p-[12px_16px] font-medium leading-[30px] text-white"
          >
            {totalCount} 개가 검색되었습니다.
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
