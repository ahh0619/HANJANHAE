import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { filterDrinks, FilterParams } from '@/app/actions/filter';
import useFilterStore from '@/store/filterStore';

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

  // 전체 데이터 개수 계산
  const totalCount = data?.pages[0]?.totalCount || 0;

  return {
    filterData: data?.pages.flatMap((page) => page.drinks) || [],
    isLoading,
    totalCount,
    isError,
    fetchNextPage,
    hasNextPage,
  };
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

export default useFilterResults;
