'use client';

import { useEffect } from 'react';

import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';

import FilterSideBar from './FilterSideBar';
import HomeScreenButton from './HomeScreenButton';
import RecommendCategory from './RecommendCategory';
import SearchBar from './SearchBar';

export type FocusInputProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const FocusInput: React.FC<FocusInputProps> = ({
  searchValue,
  setSearchValue,
}) => {
  const { triggerFetch, setTriggerFetch, isFiltered } = useFilterStore();
  const { isSearchFocus, setIsSearchFocuse } = useFocusStore();
  // 검색어 상태 관리
  useEffect(() => {
    if (!triggerFetch) return;
    setIsSearchFocuse(false);
    setTriggerFetch(false);
  }, [triggerFetch]);

  return (
    <div className="w-full bg-[#FFF] text-center xl:bg-[#ffEAED]">
      {/* 검색바와 취소 버튼 */}
      <div
        className={`mx-auto mt-[32px] block w-[100%] max-w-md pb-0 xl:mt-[162px] xl:flex xl:max-w-none xl:items-center xl:justify-center xl:gap-5 ${isFiltered ? '!pb-0' : 'xl:pb-[108px]'}`}
      >
        <div className="static xl:relative">
          <SearchBar value={searchValue} onChange={setSearchValue} />
          {isSearchFocus && (
            <RecommendCategory
              className="hidden xl:block"
              setSearchValue={setSearchValue}
            />
          )}
        </div>

        {!(isFiltered || isSearchFocus) && (
          <HomeScreenButton className="block xl:hidden" />
        )}
        {!isFiltered && <HomeScreenButton className="hidden xl:block" />}
      </div>
      {/* 필터된 결과 sideBar */}
      {isFiltered && <FilterSideBar />}
    </div>
  );
};

export default FocusInput;
