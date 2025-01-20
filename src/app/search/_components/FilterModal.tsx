'use client';

import { useEffect, useState } from 'react';

import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';
import useModalStore, { useBodyLock } from '@/store/modalStore';
import useSortStore from '@/store/selectStore';

import FilterType from './FilterTypes';

const FilterModal = () => {
  const { isModalOpen, closeModal } = useModalStore();
  useBodyLock();

  const {
    alcoholStrength,
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
    setIsSearchFocuse(false);
    setValues([1, 3]);
    setSelectedSort('alphabetical');
  };

  return (
    <div>
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black bg-opacity-10 transition-opacity duration-300 ease-in ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeModal}
      />

      {/* Modal Content */}
      <div
        className={`fixed inset-0 z-[101] flex h-full transform flex-col justify-end transition-transform duration-500 ${
          isAnimating ? 'translate-y-0' : 'translate-y-[120%]'
        }`}
      >
        {/* Modal Box */}
        <div className="relative flex h-[95%] w-full flex-col rounded-t-[32px] bg-white shadow-lg">
          {/* Modal Header */}
          <div className="mt-[12px] flex h-[56px] items-center justify-between rounded-t-[32px] bg-[var(--Etc-background)] px-[19px]">
            <button
              onClick={closeModal}
              className="text-lg font-semibold text-gray-500"
            >
              ✕
            </button>
            <h2 className="text-title-xl font-bold leading-[135%] text-[var(--Grayscale-900M)]">
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
        <div className="fixed bottom-[0] left-1/2 z-[102] w-[375px] -translate-x-1/2 transform bg-white p-[12px_20px] pb-[33px]">
          <button
            onClick={handleApplyfilters}
            className="text-label-xml flex w-[335px] shrink-0 items-center justify-center rounded-[8px] bg-primary p-[12px_16px] font-medium leading-[30px] text-white"
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
