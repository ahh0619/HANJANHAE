import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { getPopularDrinks } from '@/app/actions/filter';
import { getLiked } from '@/utils/filter/queryParamsUtils';

const useFilterLikedResults = () => {
  const searchParams = useSearchParams();
  const liked = getLiked(searchParams);
  const isLikedMode = liked === 'liked';

  const { data, isPending, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['filterDrinks', liked],
      queryFn: ({ pageParam = 1 }) => getPopularDrinks({ page: pageParam }),
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.nextPage : null,
      initialPageParam: 1,
      enabled: isLikedMode,
      staleTime: 1000 * 60 * 5,
      retry: 1,
    });

  const totalCount = data?.pages[0]?.totalCount || 0;

  return {
    likedData: data?.pages.flatMap((page) => page.likedDrinks) || [],
    isPending,
    isError,
    totalCount,
    fetchNextPage,
    hasNextPage,
  };
};

export default useFilterLikedResults;
