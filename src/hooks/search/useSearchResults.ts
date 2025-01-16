import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import useSearchStore from '@/store/keywordStore';
import { filterDrinksByKeyword } from '@/utils/filter/action';

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

  return {
    SearchData: SearchData?.pages.flatMap((page) => page.drinks) || [],
    isLoading,
    isError,
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
