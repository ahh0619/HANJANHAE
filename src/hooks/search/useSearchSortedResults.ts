import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { filterKeywordSortedDrinks } from '@/app/actions/filter';
import { getKeyword, getLiked } from '@/utils/filter/queryParamsUtils';

const useSearchSortedResults = () => {
  const searchParams = useSearchParams();

  const keyword = getKeyword(searchParams);
  const liked = getLiked(searchParams);
  const isLikedMode = liked === 'liked';

  const effectiveKeyword = isLikedMode ? undefined : keyword;
  const hasValidParams = !isLikedMode && searchParams.get('keyword') !== null;

  const {
    data: SearchData,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['filterDrinks', effectiveKeyword],
    queryFn: ({ pageParam = 1 }) =>
      filterKeywordSortedDrinks({
        keyword: effectiveKeyword!,
        page: pageParam,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : null,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: hasValidParams,
  });
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
