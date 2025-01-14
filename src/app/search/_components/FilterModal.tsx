import useFilterStore from '@/store/filterStore';
import useModalStore from '@/store/modalStore';

import FilterSideBar from './FilterSideBar';
import FilterType from './FilterTypes';
import HomeScreenButton from './HomeScreenButton';

const FilterModal = () => {
  const { isModalOpen, closeModal } = useModalStore();
  const { isFiltered, setIsFiltered, setTriggerFetch } = useFilterStore();

  const handleApplyfilters = () => {
    closeModal();
    setIsFiltered(true); // 필터 UI 변경 상태관리
    setTriggerFetch(true);
    // api 요청을 여기서 보내는게 맞는데
    // zustand로 저장해놓고 다른데 쓰기만 하면 된다.
  };

  return (
    <>
      {/* Filter Button */}
      {!isFiltered ? <HomeScreenButton /> : <FilterSideBar />}

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
            {/* 적용하기 */}(
            <div className="fixed bottom-0 left-0 w-full border-t border-gray-300 bg-white p-4">
              <button
                onClick={handleApplyfilters}
                className="w-full rounded-lg bg-gray-800 py-3 text-white hover:bg-gray-900"
              >
                적용하기
              </button>
            </div>
            )
          </div>
        </div>
      )}
    </>
  );
};

export default FilterModal;
