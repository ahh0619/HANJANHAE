'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import ProductCard from '@/components/common/ProductCard';
import { useAuthStore } from '@/store/authStore';
import { fetchLikesByUser } from '@/utils/like/action';

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

  return (
    <div>
      <div className="grid grid-cols-2 justify-items-center gap-4">
        {likesData.pages
          .flatMap((page) => page.data)
          .map((like) => (
            <ProductCard
              key={like.id}
              id={like.drink_id}
              name={like.drinks.name}
              imageUrl={like.drinks.image}
              userId={like.user_id}
            />
          ))}
      </div>

      <div
        ref={observerRef}
        className="mb-5 mt-4 flex h-12 items-center justify-center bg-gray-200"
      >
        {isFetchingNextPage ? (
          <p className="text-gray-700">Loading more...</p>
        ) : (
          <p className="text-gray-700">Scroll down</p>
        )}
      </div>
    </div>
  );
};

export default LikesContent;
