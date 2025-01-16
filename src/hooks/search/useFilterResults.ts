import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import useFilterStore from '@/store/filterStore';
import { filterDrinks, FilterParams } from '@/utils/filter/action';

const useFilterResults = () => {
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

  // useInfiniteQuery 페이지네이션 부분

  // const {
  //   data: filterData,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useQuery({
  //   queryKey: ['filterDrinks', filterParams],
  //   queryFn: async () => {
  //     const filtered = await filterDrinks(filterParams);
  //     return filtered;
  //   },
  //   enabled: false,
  //   staleTime: 1000 * 60 * 5,
  //   retry: 1,
  // });
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['filterDrinks', filterParams],
    queryFn: filterDrinks(filterParams),
    getNextPageParam: (lastPage,allPages) => lastPage.nextCursor,
    initialPageParam: 1,
  });
  // triggerFetch true일 때 refetch 호출
  useEffect(() => {
    if (triggerFetch) {
      refetch(); // enabled false를 이용한 트리거
      setTriggerFetch(false);
    }
  }, [triggerFetch]);

  return {
    filterData: filterData || [],
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  };
};

export default useFilterResults;
