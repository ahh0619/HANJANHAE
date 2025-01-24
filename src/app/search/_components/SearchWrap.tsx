'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Logo from '@/components/layout/Logo';
import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';
import useSearchStore from '@/store/keywordStore';
import useModalStore from '@/store/modalStore';

import FilterModal from './FilterModal';
import FilterSearchResults from './FilterSearchResults';
import FocusInput from './FocusInput';
import RecommendCategory from './RecommendCategory';

const SearchWrap = () => {
  const { searchTriggerFetch, setKeyword, setSearchTriggerFetch } =
    useSearchStore();
  const {
    triggerFetch,
    resetFilters,
    setIsFiltered,
    setTriggerFetch,
    isFiltered,
  } = useFilterStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (pathname === '/search') {
      const query = searchParams.get('query'); // 'query' 파라미터 값 가져오기

      if (!query) {
        // query가 없을 때만 초기화
        setKeyword('');
        resetFilters();
        setTriggerFetch(false);
        setSearchTriggerFetch(false);
        setIsSearchFocuse(false);
        setIsFiltered(false);
        console.log('초기화 동작 실행');
      } else {
        console.log('쿼리가 존재하여 초기화하지 않음');
      }
    }
  }, [pathname, searchParams]);
  const [searchValue, setSearchValue] = useState('');
  const { isSearchFocus, setIsSearchFocuse } = useFocusStore();
  const { isModalOpen } = useModalStore();
  return (
    <>
      {!isFiltered && !isSearchFocus && <Logo />}
      <div className="html-overflow-hidden mx-auto flex w-full flex-col items-center overflow-hidden px-5">
        {/* Search Bar */}
        <FocusInput searchValue={searchValue} setSearchValue={setSearchValue} />
        {/* <FilterResults /> */}
        {isSearchFocus && <RecommendCategory setSearchValue={setSearchValue} />}
        {isFiltered && <FilterSearchResults />}
        {isModalOpen && <FilterModal />}
      </div>
    </>
  );
};

export default SearchWrap;
