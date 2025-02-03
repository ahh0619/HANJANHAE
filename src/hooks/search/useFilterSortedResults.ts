import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { FilterParams, filterSortedDrinks } from '@/app/actions/filter';
import {
  getAlcoholStrength,
  getLiked,
  getSelectedTypes,
  getTastePreferences,
} from '@/utils/filter/queryParamsUtils';

const useFilterSortedResults = () => {
  const searchParams = useSearchParams();
  console.log(searchParams);

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
  console.log('filterParams:', filterParams); // ✅ 필터 값 확인

  const { data, isPending, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['filterDrinks', filterParams],
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

  console.log('hasNextPage:', hasNextPage);

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
