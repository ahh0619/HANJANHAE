import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import useFilterStore from '@/store/filterStore';
import { filterDrinks, FilterParams } from '@/utils/filter/action';

const useFilterLikedResults = () => {
  const {
    selectedTypes,
    alcoholStrength,
    tastePreferences,
    triggerFetch,
    setTriggerFetch,
  } = useFilterStore();

  const filterParams: FilterParams = {
    types: selectedTypes,
    alcoholStrength,
    tastePreferences,
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['filterDrinks', filterParams],
      queryFn: ({ pageParam = 1 }) =>
        filterDrinks({ ...filterParams, page: pageParam }),
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.nextPage : null,
      initialPageParam: 1,
      enabled: false,
      staleTime: 1000 * 60 * 5,
      retry: 1,
    });
  // triggerFetch true일 때 refetch 호출
  useEffect(() => {
    if (triggerFetch) {
      refetch(); // enabled false를 이용한 트리거
      setTriggerFetch(false);
    }
  }, [triggerFetch]);

  return {
    filterData: data?.pages.flatMap((page) => page.drinks) || [],
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  };
};

export default useFilterLikedResults;
