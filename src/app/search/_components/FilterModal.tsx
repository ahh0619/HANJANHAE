'use client';

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
    resetFilters(); // 필터값 리셋
    setIsSearchFocuse(false);
    setValues([1, 3]);
    setSelectedSort('alphabetical'); // 초기값 세팅
  };

  return (
    <>
      <div>
        {/* Background Overlay */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[100] bg-black bg-opacity-30"
            onClick={closeModal}
          />
        )}

        {/* Modal Content */}
        <div
          className={`fixed inset-0 z-[101] flex h-full flex-col justify-end transition-transform duration-300 ${
            isModalOpen ? 'translate-y-0' : 'translate-y-full'
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
    </>
  );
};

export default FilterModal;
