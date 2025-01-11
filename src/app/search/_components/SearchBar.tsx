import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';
import useResults from '@/store/resultStore';

const SearchBar = () => {
  const { triggerFetch, isFiltered, resetFilters, setIsFiltered } =
    useFilterStore();
  const { isSearchFocus, setIsSearchFocuse, resetStates } = useFocusStore();
  const { clearResults } = useResults();
  const handleFocus = () => setIsSearchFocuse(true);
  const handleBlur = () => setIsSearchFocuse(false);

  const handleReset = () => {
    resetStates();
    resetFilters();
    setIsFiltered(false);
    clearResults();
  };
  return (
    <div
      className={`${
        isSearchFocus || isFiltered ? 'mt-0' : 'mt-40'
      } mx-auto flex max-w-md items-center bg-white px-4 py-2 transition-all duration-300`}
    >
      <div
        className={`flex flex-1 items-center rounded-full px-4 py-2 shadow-sm transition ${
          isSearchFocus || isFiltered
            ? 'border-2 border-green-500 bg-white'
            : 'bg-gray-100'
        }`}
      >
        <svg
          className={`h-5 w-5 ${
            isSearchFocus || triggerFetch ? 'text-green-500' : 'text-gray-500'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 16l4-4-4-4m5 4h7"
          />
        </svg>
        <input
          type="text"
          placeholder="무엇을 찾으시나요?"
          className="w-full bg-transparent pl-2 text-sm text-gray-700 outline-none"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {isSearchFocus || isFiltered ? (
        <button className="ml-2 text-sm text-green-500" onClick={handleReset}>
          취소
        </button>
      ) : null}
    </div>
  );
};

export default SearchBar;
