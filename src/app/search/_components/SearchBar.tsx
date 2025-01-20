import Image from 'next/image';
import { useRef } from 'react';

import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';
import useSearchStore from '@/store/keywordStore';
import useResults from '@/store/resultStore';
import useSortStore from '@/store/selectStore';

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    triggerFetch,
    isFiltered,
    resetFilters,
    setIsFiltered,
    setTriggerFetch,
    setValues,
  } = useFilterStore();
  const {
    searchTriggerFetch,
    keyword,
    setKeyword,
    setSearchTriggerFetch,
    resetSearchStore,
  } = useSearchStore();
  const { isSearchFocus, setIsSearchFocuse, resetStates } = useFocusStore();
  const { clearResults } = useResults();
  const { selectedSort, setSelectedSort } = useSortStore();
  const handleReset = () => {
    resetStates(); // 저장된 정보 삭제
    resetFilters(); // 필터값 리셋
    setIsFiltered(false); // 필터 상태정보
    setIsSearchFocuse(false);
    onChange(''); // value 값  지우기
    resetSearchStore(); // keyword 지우기
    setValues([1, 3]);
    setSelectedSort('alphabetical'); // 초기값 세팅
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const newKeyword = inputRef.current?.value || ''; // 혹시 모를 || '' 도 체크
      setKeyword(newKeyword);
      clearResults();
      setTriggerFetch(false);
      setIsSearchFocuse(true);
      setSearchTriggerFetch(true);
      setSelectedSort('alphabetical');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      className={`${
        isSearchFocus || isFiltered ? 'mt-0' : 'mt-0'
      } m-0 mx-auto flex w-[335px] items-center bg-white transition-all duration-300`}
    >
      <div
        className={`flex h-[48px] w-[335px] items-center justify-between gap-2 rounded-[8px] border border-grayscale-300 bg-white p-[4px_12px] transition ${
          isSearchFocus || isFiltered
            ? 'border border-grayscale-900 bg-white'
            : 'bg-gray-100'
        }`}
      >
        <Image
          src="/assets/icons/search.svg"
          alt="Search_Icon"
          width={24}
          height={24}
          className="m-2 h-6 w-6"
        />
        <div className="flex h-[40px] w-full items-center text-left">
          <input
            type="text"
            name="search"
            value={value}
            onChange={handleInputChange}
            placeholder="무엇을 찾으시나요?"
            className="h-[24px] w-[223px] flex-shrink-0 bg-transparent text-caption-lm leading-normal focus:outline-none"
            ref={inputRef}
            onKeyDown={handleKeyDown}
          />
        </div>
        {(isSearchFocus || isFiltered) && (
          <Image
            src="/assets/icons/cancelDark.svg"
            alt="Cancel"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
