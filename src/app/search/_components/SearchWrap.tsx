'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import useDisableScroll from '@/hooks/search/useDisableScroll';
import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';
import useSearchStore from '@/store/keywordStore';
import useModalStore from '@/store/modalStore';

import FilterModal from './FilterModal';
import FocusInput from './FocusInput';
import ResultList from './ResultList';
import SearchLogo from './SearchLogo';
import StandByScreen from './StandByScreen';

const SearchWrap = () => {
  const { setKeyword } = useSearchStore();
  const { resetFilters, setIsFiltered, isFiltered } = useFilterStore();
  const searchParams = useSearchParams();
  const shouldShowResults = searchParams.toString() !== '';
  const shouldHideFilterSidebar = searchParams.get('keyword') !== null;
  const [searchValue, setSearchValue] = useState('');
  const { isSearchFocus, setIsSearchFocuse } = useFocusStore();
  const { isModalOpen } = useModalStore();
  useDisableScroll(isModalOpen);
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/search') {
        setIsFiltered(false);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
      {!shouldShowResults && <SearchLogo />}
      <div className="html-overflow-hidden mx-auto mb-0 flex w-full flex-col items-center overflow-hidden px-5 xl:mb-[92px] xl:px-0">
        {/* Search Bar */}
        <FocusInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          shouldShowResults={shouldShowResults}
          shouldHideFilterSidebar={shouldHideFilterSidebar}
        />
        {/*굳이 조건문 떡칠보단 하나의 삼항연산자로 합치는걸 고려해보기 */}
        {shouldShowResults && <ResultList />}
        {/* 이 부분은 한번 체크해보기*/}
        {!shouldShowResults && <StandByScreen className="block xl:hidden" />}
        {!shouldShowResults && <StandByScreen className="hidden xl:flex" />}
        {isModalOpen && <FilterModal />}
      </div>
    </>
  );
};

export default SearchWrap;
