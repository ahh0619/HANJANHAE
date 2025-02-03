'use client';

import { useEffect } from 'react';

import OptimizedImage from '@/components/common/OptimizedImage';
import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';

import FilterSideBar from './FilterSideBar';
import HomeScreenButton from './HomeScreenButton';
import RecommendCategory from './RecommendCategory';
import SearchBar from './SearchBar';

export type FocusInputProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  shouldShowResults: boolean;
  shouldHideFilterSidebar: boolean;
};

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

  return (
    <div
      className={`w-full bg-[#FFF] text-center xl:relative xl:bg-[#FFF4F6]${shouldShowResults && `xl:bg-[#fff]`}`}
    >
      {/* 검색바와 취소 버튼 */}
      <div
        className={`mx-auto mt-[32px] block w-[100%] max-w-md pb-0 xl:flex xl:max-w-none xl:items-center xl:justify-center xl:gap-5 ${shouldShowResults ? `xl:mt-[60px] xl:pb-0` : `xl:mt-[60px] xl:pb-[108px]`} `}
      >
        <div className={`relative z-30 xl:h-auto`}>
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            shouldShowResults={shouldShowResults}
          />
          {isSearchFocus && (
            <RecommendCategory setSearchValue={setSearchValue} />
          )}
        </div>

        {!shouldShowResults && <HomeScreenButton className="block xl:hidden" />}
        {!shouldShowResults && <HomeScreenButton className="hidden xl:block" />}
      </div>
      {/* 필터된 결과 sideBar */}
      {/* 삼항 연산자로 수정할 수 있으면 수정 */}
      {shouldShowResults && <FilterSideBar />}
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
  );
};

export default FocusInput;
