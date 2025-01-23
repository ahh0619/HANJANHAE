'use client';

import { usePathname } from 'next/navigation';
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
  useEffect(() => {
    if (pathname === '/search') {
      setKeyword('');
      resetFilters();
      setTriggerFetch(false);
      setSearchTriggerFetch(false);
      setIsSearchFocuse(false);
      setIsFiltered(false);
    }
  }, [pathname]);
  const [searchValue, setSearchValue] = useState('');
  const { isSearchFocus, setIsSearchFocuse } = useFocusStore();
  const { isModalOpen } = useModalStore();
  return (
    <>
      {!isFiltered && !isSearchFocus && <Logo />}
      <div className="mx-auto flex w-full flex-col items-center overflow-hidden px-5">
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
