import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { filterDrinksByKeyword } from '@/app/actions/filter';
import useSearchStore from '@/store/keywordStore';

const useSearchResults = () => {
  const { keyword, searchTriggerFetch, setSearchTriggerFetch } =
    useSearchStore();

  const {
    data: SearchData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['SearchDrinks', keyword],
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
    SearchData: SearchData?.pages.flatMap((page) => page.drinks) || [],
    isLoading,
    isError,
    totalCount,
    fetchNextPage,
    hasNextPage,
  };
};

export default useSearchResults;

// const {
//   data: SearchData,
//   isLoading,
//   isError,
//   refetch,
// } = useQuery({
//   queryKey: ['SearchDrinks', keyword],
//   queryFn: async () => {
//     if (keyword === '') {
//       return [];
//     }
//     const filtered = await filterDrinksByKeyword(keyword);
//     return filtered;
//   },
//   enabled: false,
//   staleTime: 1000 * 60 * 5,
//   retry: 1,
// });
