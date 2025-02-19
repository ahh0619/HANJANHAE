'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import OptimizedImage from '@/components/common/OptimizedImage';
import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';
import useSearchStore from '@/store/keywordStore';
import { SearchBarProps } from '@/types/search';
import { generateUrl } from '@/utils/filter/generateUrl';

const SearchBar = ({
  value,
  onChange,
  shouldShowResults,
  inputRef,
  setSearchValue,
}: SearchBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isFiltered, resetFilters, setIsFiltered, setValues } =
    useFilterStore();
  const { keyword, setKeyword } = useSearchStore();
  const { isSearchFocus, setIsSearchFocuse } = useFocusStore();
  const handleReset = () => {
    onChange('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      e.currentTarget.blur();
      const newKeyword = inputRef.current?.value.trim() || '';
      setKeyword(newKeyword);
      const newUrl = generateUrl({
        keyword: newKeyword,
      });
      router.push(newUrl);
      setIsSearchFocuse(false);
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

  useEffect(() => {
    if (pathname === '/search' && !searchParams.has('keyword')) {
      setSearchValue('');
    }
  }, [pathname, searchParams]);

  return (
    <div
      className={`${
        isSearchFocus || isFiltered ? 'mt-0' : 'mt-0'
      } !xl:w-[482px] m-0 mx-auto flex w-full items-center xl:mx-0 xl:w-[482px] ${shouldShowResults && `xl:w-[588px]`}`}
    >
      <div
        className={`flex h-[48px] w-full items-center justify-between space-x-3 rounded-[8px] border border-grayscale-300 bg-white p-[4px_12px] transition ${
          isSearchFocus ? 'border border-grayscale-900 bg-white' : 'bg-gray-100'
        }${isFiltered && 'border border-grayscale-300'}`}
      >
        <OptimizedImage
          src={
            !isSearchFocus
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
            className="!mr-0 h-[24px] w-[100%] flex-shrink-0 bg-transparent text-caption-lm leading-normal focus:outline-none"
            ref={inputRef}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="off"
          />
        </div>
        {isSearchFocus && (
          <OptimizedImage
            src="/assets/icons/cancelDark.svg"
            alt="검색어 삭제 버튼"
            className="!ml-0 cursor-pointer p-2"
            onClick={handleReset}
            onMouseDown={(e) => e.preventDefault()}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
