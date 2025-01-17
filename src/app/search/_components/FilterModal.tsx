import useFilterStore from '@/store/filterStore';
import useModalStore from '@/store/modalStore';

import FilterSideBar from './FilterSideBar';
import FilterType from './FilterTypes';
import HomeScreenButton from './HomeScreenButton';

const FilterModal = () => {
  const { isModalOpen, closeModal } = useModalStore();
  const {
    alcoholStrength,
    setAlcoholStrength,
    isFiltered,
    setIsFiltered,
    setTriggerFetch,
  } = useFilterStore();

  const handleApplyfilters = () => {
    // 초기화 시 Strength가 null 이여서 자동으로 입력
    if (alcoholStrength === null) {
      setAlcoholStrength([0, 100]);
    }
    closeModal();
    setIsFiltered(true); // 필터 UI 변경 상태관리
    setTriggerFetch(true);
    // api 요청을 여기서 보내는게 맞는데
    // zustand로 저장해놓고 다른데 쓰기만 하면 된다.
  };

  return (
    <>
      {!isFiltered ? <HomeScreenButton /> : <FilterSideBar />}

      {isModalOpen && (
        <div className="fixed inset-0 z-[51] flex items-end bg-black bg-opacity-30">
          {/* Modal */}
          <div
            className="relative w-full transform rounded-t-lg bg-white transition-transform duration-300 ease-in-out"
            style={{
              transform: isModalOpen ? 'translateY(0)' : 'translateY(100%)',
              height: '90%', // 높이 설정
            }}
          >
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
            <div className="h-full overflow-y-scroll p-4">
              <FilterType />
            </div>
          </div>
          {/* Apply Button */}
          <div className="fixed bottom-0 left-0 w-full border-t border-gray-300 bg-white p-4 shadow-md">
            <button
              onClick={handleApplyfilters}
              className="w-full rounded-lg bg-gray-800 py-3 text-white hover:bg-gray-900"
            >
              적용하기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterModal;
