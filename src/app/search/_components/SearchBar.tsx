'use client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import OptimizedImage from '@/components/common/OptimizedImage';
import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';
import useSearchStore from '@/store/keywordStore';
import useSortStore from '@/store/selectStore';

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
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
  const { selectedSort, setSelectedSort } = useSortStore();
  const handleReset = () => {
    onChange(''); // value 값  지우기
    setSelectedSort('alphabetical'); // 초기값 세팅
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      queryClient.removeQueries({
        queryKey: ['filterDrinks'],
        exact: false,
      });
      const newKeyword = inputRef.current?.value.trim() || '';
      router.push(`/search?query=${encodeURIComponent(newKeyword)}`);
      setKeyword(newKeyword);
      setTriggerFetch(false);
      setIsSearchFocuse(false);
      setSearchTriggerFetch(true);
      setIsFiltered(true);
      setSelectedSort('alphabetical');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFocus = () => {
    setIsSearchFocuse(true);
  };

  const handleBlur = () => {
    setIsSearchFocuse(false);
  };

  return (
    <div
      className={`${
        isSearchFocus || isFiltered ? 'mt-0' : 'mt-0'
      } !xl:w-[482px] m-0 mx-auto flex w-full items-center xl:mx-0 xl:w-[482px] ${isFiltered && `xl:w-[588px]`}`}
    >
      <div
        className={`flex h-[48px] w-full items-center justify-between gap-3 rounded-[8px] border border-grayscale-300 bg-white p-[4px_12px] transition ${
          isSearchFocus ? 'border border-grayscale-900 bg-white' : 'bg-gray-100'
        }${isFiltered && 'border border-grayscale-300'}`}
      >
        <OptimizedImage
          src={
            isFiltered
              ? '/assets/icons/search-gray.svg'
              : '/assets/icons/search.svg'
          }
          alt={isFiltered ? '이미 검색된 아이콘' : '검색 중인 아이콘'}
          className="ml-1"
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
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        {(isSearchFocus || isFiltered) && (
          <OptimizedImage
            src="/assets/icons/cancelDark.svg"
            alt="검색어 삭제 버튼"
            className="cursor-pointer"
            onClick={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
