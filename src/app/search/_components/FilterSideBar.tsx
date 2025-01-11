import useModalStore from '@/store/modalStore';

const FilterSideBar = () => {
  const { openModal } = useModalStore();
  const filters = [
    { label: '탁주 탁주' },
    { label: '단맛 매우 약함' },
    { label: '신맛 보통' },
  ];

  return (
    <div className="flex items-center space-x-2 rounded-lg px-4 py-2">
      {/* 각 필터 버튼 */}
      {filters.map((filter, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
        >
          <span>{filter.label}</span>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={`${filter.label} 삭제`}
          >
            ✕
          </button>
        </div>
      ))}

      {/* 설정 아이콘 */}
      <button
        className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
        aria-label="필터 설정"
        onClick={openModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          width="24"
          height="24"
        >
          <line x1="8" y1="4" x2="8" y2="20"></line>
          <circle cx="8" cy="10" r="2"></circle>

          <line x1="16" y1="4" x2="16" y2="20"></line>
          <circle cx="16" cy="14" r="2"></circle>
        </svg>
      </button>
    </div>
  );
};

export default FilterSideBar;
