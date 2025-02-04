import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { filterKeywordSortedDrinks } from '@/app/actions/filter';
import { getKeyword, getLiked } from '@/utils/filter/queryParamsUtils';

const useSearchSortedResults = () => {
  const searchParams = useSearchParams();

  // URL에서 keyword와 sort 값을 가져옵니다.
  const keyword = getKeyword(searchParams); // 예: "막걸리"
  const liked = getLiked(searchParams); // "liked" 또는 ""
  const isLikedMode = liked === 'liked';

  // liked 모드라면 검색 쿼리에서 keyword를 무시하도록 합니다.
  // 즉, liked 모드에서는 effectiveKeyword가 undefined가 되어, 검색 쿼리는 활성화되지 않습니다.
  const effectiveKeyword = isLikedMode ? undefined : keyword;

  // 검색 모드일 때만 유효한 파라미터로 판단합니다.
  const hasValidParams = !isLikedMode && searchParams.get('keyword') !== null;

  const {
    data: SearchData,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    // effectiveKeyword가 undefined이면, 쿼리 키에 포함되지 않으므로 별개의 쿼리가 실행되지 않습니다.
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
    // liked 모드일 때는 이 쿼리를 실행하지 않습니다.
    enabled: hasValidParams,
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
