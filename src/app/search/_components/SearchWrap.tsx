'use client';

import Logo from '@/components/layout/Logo';
import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';
import useModalStore from '@/store/modalStore';

import FilterModal from './FilterModal';
import FilterSearchResults from './FilterSearchResults';
import FocusInput from './FocusInput';

const SearchWrap = () => {
  const { isFiltered } = useFilterStore();
  const { isSearchFocus } = useFocusStore();
  const { isModalOpen } = useModalStore();
  return (
    <>
      {!isFiltered && !isSearchFocus && <Logo />}
      <div className="mx-auto flex min-h-screen w-full flex-col items-center px-5">
        {/* Search Bar */}
        <FocusInput />
        {/* <FilterResults /> */}
        <FilterSearchResults />
        {isModalOpen && <FilterModal />}
      </div>
    </>
  );
};

export default SearchWrap;
