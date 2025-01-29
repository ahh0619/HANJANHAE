'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { fetchLikesByUser } from '@/app/actions/like';
import Skeleton from '@/app/search/_components/Skeleton';
import ProductCard from '@/components/common/ProductCard';
import { useMultipleDrinkLike } from '@/hooks/like/useMultipleDrinkLike';
import { useAuthStore } from '@/store/authStore';

const LikesContent = () => {
  const { user } = useAuthStore();
  const userId = user?.id || '';

  const {
    data: likesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['likes', user?.id],
    queryFn: ({ pageParam = 1 }) =>
      fetchLikesByUser({ userId: user.id, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: undefined,
    enabled: !!user,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
  });

  const allLikes = likesData?.pages.flatMap((page) => page.data) || [];
  const allDrinkIds = allLikes.map((item) => item.drink_id);

  const { isLoading, likeMap, handleToggleLike } = useMultipleDrinkLike({
    userId,
    drinkIds: allDrinkIds,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isPending) {
    return <Skeleton hasMargin={false} />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {likesData.pages[0].data.length > 0 ? (
        <div className="mx-[56px] my-0 grid w-full max-w-[448px] grid-cols-2 justify-items-center gap-[8px] xl:w-[1200px] xl:max-w-none xl:grid-cols-5 xl:gap-x-[20px] xl:gap-y-[56px]">
          {allLikes.map((like) => {
            const isLiked = likeMap[like.drink_id] || false;
            return (
              <ProductCard
                key={like.id}
                id={like.drink_id}
                name={like.drinks.name}
                imageUrl={like.drinks.image}
                isLiked={isLiked}
                onToggleLike={() => handleToggleLike(like.drink_id)}
                scenario="like"
              />
            );
          })}

          {/* 무한 스크롤 감지용 */}
          <div
            ref={observerRef}
            className="col-span-2 flex h-6 items-center justify-center xl:col-span-5"
          >
            {isFetchingNextPage && (
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-grayscale-300 border-t-grayscale-600"></div>
            )}
          </div>
        </div>
      ) : (
        <div className="my-auto flex w-full flex-col items-center justify-center xl:mt-[0px] xl:h-lvh">
          <div className="flex items-center">
            <img
              src="/assets/icons/pinkHeart.svg"
              className="hidden xl:block"
            />
            <img
              src="/assets/icons/hotpinkHeart.svg"
              className="hidden xl:block"
            />
            <img src="/Character.svg" />
            <img
              src="/assets/icons/hotpinkHeart.svg"
              className="hidden xl:block"
            />
            <img
              src="/assets/icons/pinkHeart.svg"
              className="hidden xl:block"
            />
          </div>
          <p className="mt-[36px] h-[22px] text-title-mb text-grayscale-500">
            좋아요 한 전통주가 없습니다
          </p>
        </div>
      )}
    </>
  );
};

export default LikesContent;
