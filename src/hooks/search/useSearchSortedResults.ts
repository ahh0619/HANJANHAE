import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import useSearchStore from '@/store/keywordStore';
import useSortStore from '@/store/selectStore';
import { filterDrinksByKeyword } from '@/utils/filter/action';

const useSearchSortedResults = () => {
  const { keyword, searchTriggerFetch, setSearchTriggerFetch } =
    useSearchStore();
  const { selectedSort } = useSortStore();

  const {
    data: SearchData,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['SearchSortedDrinks', keyword, selectedSort === 'alphabetical'],
    queryFn: ({ pageParam = 1 }) =>
      filterDrinksByKeyword({ keyword, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : null,
    enabled: false,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  // triggerFetch true일 때 refetch 호출
  useEffect(() => {
    if (searchTriggerFetch) {
      refetch(); // enabled false를 이용한 트리거
      setSearchTriggerFetch(false);
    }
  }, [searchTriggerFetch]);

  // 전체 데이터 개수 계산
  const totalCount = SearchData?.pages[0]?.totalCount || 0;

  return {
    SearchSortData: SearchData?.pages.flatMap((page) => page.drinks) || [],
    isPending,
    isError,
    totalCount,
    fetchNextPage,
    hasNextPage,
  };
};

export default useSearchSortedResults;
