'use client';

import { useQueryClient } from '@tanstack/react-query';

import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';
import useSearchStore from '@/store/keywordStore';
import useSortStore from '@/store/selectStore';

const RecommendCategory = ({
  setSearchValue,
}: {
  setSearchValue: (val: string) => void;
}) => {
  const queryClient = useQueryClient();
  const categories = ['증류주', '모주', '막걸리'];
  const {
    searchTriggerFetch,
    keyword,
    setKeyword,
    setSearchTriggerFetch,
    resetSearchStore,
  } = useSearchStore();
  const {
    triggerFetch,
    isFiltered,
    resetFilters,
    setIsFiltered,
    setTriggerFetch,
    setValues,
  } = useFilterStore();
  const { isSearchFocus, setIsSearchFocuse, resetStates } = useFocusStore();
  const { selectedSort, setSelectedSort } = useSortStore();

  const handleCategoryClick = (category: string) => {
    queryClient.removeQueries({
      queryKey: ['filterDrinks'],
      exact: false,
    });
    setSearchValue(category);
    setKeyword(category);
    setTriggerFetch(false);
    setIsFiltered(true);
    setIsSearchFocuse(false);
    setSearchTriggerFetch(true);
    setSelectedSort('alphabetical');
  };

  return (
    <div className="relative mt-[60px] h-[475px] w-[100%] max-w-[448px]">
      <h2 className="font-title-lm mb-2 text-left text-grayscale-900">
        추천 검색어
      </h2>
      <div className="mt-[16px] flex gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className="rounded-[16px] border border-primary-200 bg-[#FFEAED] p-[8px] px-[16px] text-label-lm font-medium not-italic leading-[1.5] text-primary-200"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecommendCategory;
