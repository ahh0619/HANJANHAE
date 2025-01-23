'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { fetchLikesByUser } from '@/app/actions/like';
import ProductCard from '@/components/common/ProductCard';
import { useAuthStore } from '@/store/authStore';

import SkeletonPage from './SkeletonPage';

const LikesContent = () => {
  const { user } = useAuthStore();

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
    return <SkeletonPage />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log('lieksdata: ', likesData);

  return (
    <div>
      {likesData.pages[0].data.length > 0 ? (
        <div className="grid w-full grid-cols-2 justify-items-center gap-[8px]">
          {likesData.pages
            .flatMap((page) => page.data)
            .map((like) => (
              <ProductCard
                key={like.id}
                id={like.drink_id}
                name={like.drinks.name}
                imageUrl={like.drinks.image}
                userId={like.user_id}
                likeStatus={true}
                width={'163px'}
                height={'241px'}
                marginBottom={'20px'}
                imgHeight={'207px'}
              />
            ))}

          <div
            ref={observerRef}
            className="col-span-2 flex h-6 items-center justify-center"
          >
            {isFetchingNextPage && (
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-grayscale-300 border-t-grayscale-600"></div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-[160px] flex w-full flex-col items-center">
          <img src="/Character.svg" />
          <p className="mt-[36px] h-[22px] text-title-mb text-grayscale-500">
            좋아요 한 전통주가 없습니다
          </p>
        </div>
      )}
    </div>
  );
};

export default LikesContent;
