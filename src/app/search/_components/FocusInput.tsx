'use client';

import { useEffect, useState } from 'react';

import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';

import FilterModal from './FilterModal';
import RecommendCategory from './RecommendCategory';
import SearchBar from './SearchBar';

const FocusInput = () => {
  const { triggerFetch, setTriggerFetch } = useFilterStore();
  const { isSearchFocus, setIsSearchFocuse } = useFocusStore();
  // 검색어 상태 관리
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (!triggerFetch) return;
    setIsSearchFocuse(false);
    setTriggerFetch(false);
  }, [triggerFetch]);

  return (
    <div className="mx-auto mt-4 w-full max-w-md text-center">
      {/* 검색바와 취소 버튼 */}
      <SearchBar value={searchValue} onChange={setSearchValue} />
      {isSearchFocus ? null : <FilterModal />}
      {/* 추천 검색어 (포커스가 있을 때만 표시) */}
      {isSearchFocus && <RecommendCategory setSearchValue={setSearchValue} />}
    </div>
  );
};

export default FocusInput;
