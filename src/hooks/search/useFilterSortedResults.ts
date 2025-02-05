import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { filterSortedDrinks } from '@/app/actions/filter';
import { FilterParams } from '@/types/search';
import {
  getAlcoholStrength,
  getLiked,
  getSelectedTypes,
  getTastePreferences,
} from '@/utils/filter/queryParamsUtils';

const useFilterSortedResults = () => {
  const searchParams = useSearchParams();

  const selectedTypes = getSelectedTypes(searchParams);
  const alcoholStrength = getAlcoholStrength(searchParams);
  const tastePreferences = getTastePreferences(searchParams);

  const liked = getLiked(searchParams); // 'liked' 또는 ''
  const isLikedMode = liked === 'liked';
  const hasValidParams =
    searchParams.get('selectedTypes') !== null ||
    searchParams.get('alcoholStrength') !== null ||
    searchParams.get('tastePreferences') !== null;

  const filterParams: FilterParams = {
    types: selectedTypes,
    alcoholStrength,
    tastePreferences,
  };
  const effectiveKeyword = isLikedMode ? undefined : filterParams;

  const { data, isPending, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['filterDrinks', effectiveKeyword],
      queryFn: ({ pageParam = 1 }) => {
        return filterSortedDrinks({ ...filterParams, page: pageParam });
      },
      getNextPageParam: (lastPage) => {
        return lastPage.hasNextPage ? lastPage.nextPage : null;
      },
      initialPageParam: 1,
      staleTime: 1000 * 60 * 5,
      retry: 1,
      enabled: hasValidParams && !isLikedMode,
    });

  return {
    filterSortData: data?.pages.flatMap((page) => page.drinks) || [],
    isPending,
    totalCount: data?.pages[0]?.totalCount || 0,
    isError,
    fetchNextPage,
    hasNextPage,
  };
};

export default useFilterSortedResults;
