'use client';

import { useEffect, useState } from 'react';

import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';

import FilterSideBar from './FilterSideBar';
import HomeScreenButton from './HomeScreenButton';
import RecommendCategory from './RecommendCategory';
import SearchBar from './SearchBar';
import StandByScreen from './StandByScreen';

const FocusInput = () => {
  const { triggerFetch, setTriggerFetch, isFiltered } = useFilterStore();
  const { isSearchFocus, setIsSearchFocuse } = useFocusStore();
  // 검색어 상태 관리
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    if (!triggerFetch) return;
    setIsSearchFocuse(false);
    setTriggerFetch(false);
  }, [triggerFetch]);

  return (
    <div className="mx-auto mt-[76px] w-full max-w-md text-center">
      {/* 검색바와 취소 버튼 */}
      <SearchBar value={searchValue} onChange={setSearchValue} />

      {!(isFiltered || isSearchFocus) && <HomeScreenButton />}
      {isFiltered && <FilterSideBar />}

      {isSearchFocus && <RecommendCategory setSearchValue={setSearchValue} />}
      {!(isFiltered || isSearchFocus) && <StandByScreen />}
    </div>
  );
};

export default FocusInput;
