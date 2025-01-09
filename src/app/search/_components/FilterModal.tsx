import useFilterStore from '@/store/filterStore';
import useModalStore from '@/store/modalStore';

import FilterType from './FilterTypes';

const FilterModal = () => {
  const { isModalOpen, openModal, closeModal } = useModalStore();
  const setTriggerFetch = useFilterStore((state) => state.setTriggerFetch);

  const handleApplyfilters = () => {
    closeModal();
    setTriggerFetch(true);
  };

  return (
    <>
      {/* Filter Button */}
      <button
        onClick={openModal}
        className="mt-6 rounded-full bg-gray-500 px-6 py-2 text-sm font-semibold text-white hover:bg-gray-600"
      >
        필터
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30">
          <div className="fixed inset-0 flex flex-col bg-white">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-300 p-4">
              <button
                onClick={closeModal}
                className="text-lg font-semibold text-gray-500"
              >
                ✕
              </button>
              <h2 className="text-lg font-semibold">필터</h2>
              <button className="text-sm text-blue-500">초기화</button>
            </div>

            {/* Scrollable Content */}
            <FilterType />

            {/* Fixed Apply Button */}
            <div className="fixed bottom-0 left-0 w-full border-t border-gray-300 bg-white p-4">
              <button
                onClick={handleApplyfilters}
                className="w-full rounded-lg bg-gray-800 py-3 text-white hover:bg-gray-900"
              >
                적용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterModal;
