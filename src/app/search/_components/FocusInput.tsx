'use client';

import { useEffect, useRef } from 'react';

import OptimizedImage from '@/components/common/OptimizedImage';
import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';
import { FocusInputProps } from '@/types/search';

import FilterSideBar from './FilterSideBar';
import HomeScreenButton from './HomeScreenButton';
import RecommendCategory from './RecommendCategory';
import SearchBar from './SearchBar';

const FocusInput = ({
  searchValue,
  setSearchValue,
  shouldShowResults,
  shouldHideFilterSidebar,
}: FocusInputProps) => {
  const { triggerFetch, setTriggerFetch, isFiltered } = useFilterStore();
  const { isSearchFocus, setIsSearchFocuse } = useFocusStore();
  // 검색어 상태 관리
  useEffect(() => {
    if (!triggerFetch) return;
    setIsSearchFocuse(false);
    setTriggerFetch(false);
  }, [triggerFetch]);

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className={`w-full bg-[#FFF] text-center xl:bg-[#FFF4F6] ${shouldShowResults && `xl:bg-[#fff]`}`}
    >
      {/* 검색바와 취소 버튼 */}
      <div
        className={`mx-auto mt-[32px] block w-[100%] max-w-md pb-0 xl:relative xl:flex xl:w-[1280px] xl:max-w-none xl:items-center xl:justify-center xl:gap-5 ${shouldShowResults ? `xl:mt-[60px] xl:pb-0` : `xl:mt-[60px] xl:pb-[108px]`} `}
      >
        <div className={`relative z-30 xl:h-auto`}>
          <SearchBar
            value={searchValue}
            setSearchValue={setSearchValue}
            onChange={setSearchValue}
            shouldShowResults={shouldShowResults}
            inputRef={inputRef}
          />
          {isSearchFocus && (
            <RecommendCategory
              setSearchValue={setSearchValue}
              inputRef={inputRef}
            />
          )}
        </div>

        {!shouldShowResults && <HomeScreenButton className="block xl:hidden" />}
        {!shouldShowResults && <HomeScreenButton className="hidden xl:block" />}
        {!shouldShowResults && (
          <OptimizedImage
            src="/assets/Subcharacter.svg"
            alt="서브캐릭터 이미지"
            className="absolute bottom-0 right-[80px] hidden xl:block"
            width="67"
            height="61"
          />
        )}
      </div>
      {/* 필터된 결과 sideBar */}
      {/* 삼항 연산자로 수정할 수 있으면 수정 */}
      {shouldShowResults && <FilterSideBar />}
    </div>
  );
};

export default FocusInput;
