import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { filterKeywordSortedDrinks } from '@/app/actions/filter';
import { getKeyword, getLiked } from '@/utils/filter/queryParamsUtils';

const useSearchSortedResults = () => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const keyword = getKeyword(searchParams);
  const liked = getLiked(searchParams); // 'liked' 또는 ''
  const isLikedMode = liked === 'liked';
  const hasValidParams = searchParams.get('keyword') !== null;

  const {
    data: SearchData,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['filterDrinks', keyword],
    queryFn: ({ pageParam = 1 }) =>
      filterKeywordSortedDrinks({ keyword, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : null,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: hasValidParams && !isLikedMode, // ✅ sort=liked일 때 비활성화
  });

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
