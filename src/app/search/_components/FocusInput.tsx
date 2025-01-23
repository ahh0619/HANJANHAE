'use client';

import { useEffect } from 'react';

import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';

import FilterSideBar from './FilterSideBar';
import HomeScreenButton from './HomeScreenButton';
import SearchBar from './SearchBar';
import StandByScreen from './StandByScreen';

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
    <div className="mx-auto mt-[76px] w-full max-w-md text-center">
      {/* 검색바와 취소 버튼 */}
      <SearchBar value={searchValue} onChange={setSearchValue} />

      {!(isFiltered || isSearchFocus) && <HomeScreenButton />}

      {/* 필터된 결과 sideBar */}
      {isFiltered && <FilterSideBar />}

      {!(isFiltered || isSearchFocus) && <StandByScreen />}
    </div>
  );
};

export default FocusInput;
