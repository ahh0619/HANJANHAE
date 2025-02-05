'use client';

import { useEffect, useState } from 'react';

import { fetchUser } from '@/app/actions/auth';
import ProductCard from '@/components/common/ProductCard';
import { useMultipleDrinkLike } from '@/hooks/like/useMultipleDrinkLike';
import useFilterSortedResults from '@/hooks/search/useFilterSortedResults';
import { useIntersectionObserver } from '@/hooks/search/useInterSectionObserver';
import useFilterLikedResults from '@/hooks/search/useLikedResults';
import useSearchSortedResults from '@/hooks/search/useSearchSortedResults';
import { UserType } from '@/types/Auth';

import Skeleton from './Skeleton';
import TotalAndSort from './TotalAndSort';

const ResultList = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUser();
      setUser(user);
    };
    getUser();
  }, []);
  const userId = user?.id || '';

  const {
    SearchSortData,
    totalCount: searchSortTotal,
    isPending: sortSearchIsLoading,
    isError: sortSearchIsError,
    fetchNextPage: fetchNextSearchSortPage,
    hasNextPage: hasNextSearchSortPage,
  } = useSearchSortedResults();

  const {
    filterSortData,
    totalCount: filterSortTotal,
    isPending: sortFilterIsLoading,
    isError: sortFilterIsError,
    fetchNextPage: fetchNextFilterSortPage,
    hasNextPage: hasNextFilterSortPage,
  } = useFilterSortedResults();
  const {
    likedData,
    totalCount: likedTotal,
    isPending: likeIsLoading,
    isError: likeIsError,
    fetchNextPage: fetchNextLikePage,
    hasNextPage: hasNextLikePage,
  } = useFilterLikedResults();
  const isSearchActive = SearchSortData?.length > 0;
  const isFilterActive = filterSortData?.length > 0;
  const isLikedActive = likedData?.length > 0;

  // type any뜨는거 해결해야 함.
  const cleanData = (data: any[]) =>
    data.filter((item) => typeof item.id === 'string');

  const activeData = Array.from(
    new Map(
      [
        ...cleanData(
          filterSortData && filterSortData.length > 0
            ? filterSortData
            : (SearchSortData ?? []),
        ),
        ...cleanData(
          Array.isArray(likedData) && likedData.length > 0 ? likedData : [],
        ),
      ].map((item) => [item.id, item]), // id를 key로 하여 중복 제거
    ).values(),
  );
  // 활성 hasNextPage와 fetchNextPage도 동적으로 선택
  const activeHasNextPage = isSearchActive
    ? hasNextSearchSortPage
    : isFilterActive
      ? hasNextFilterSortPage
      : isLikedActive
        ? hasNextLikePage
        : false;

  const activeFetchNextPage = isSearchActive
    ? fetchNextSearchSortPage
    : isFilterActive
      ? fetchNextFilterSortPage
      : isLikedActive
        ? fetchNextLikePage
        : () => {};

  const observerRef = useIntersectionObserver({
    hasNextPage: activeHasNextPage && activeData.length > 0, // 데이터가 있을 때만 동작
    fetchNextPage: activeFetchNextPage,
  });

  const isPending =
    filterSortData && filterSortData.length > 0
      ? sortFilterIsLoading
      : likedData && likedData.length > 0
        ? likeIsLoading
        : sortSearchIsLoading;
  const isError = sortSearchIsError || sortFilterIsError || likeIsError;

  const allDrinkIds = activeData.map((item) => item.id);

  const {
    isLoading: likeLoading,
    likeMap,
    handleToggleLike,
  } = useMultipleDrinkLike({ userId, drinkIds: allDrinkIds });

  const totalData = filterSortTotal || searchSortTotal || likedTotal;

  // 에러가 났을 때 error.tsx로 안가도 될 수 있다
  // -> 페이지 전체가 error.tsx로 보내는데 별 거 아닌 부분에서는 안가도 된다.
  // 페이지 레이아웃 남겨두고 다른 코드 남겨두고 결과 부분만 잠시 문제가 있습니다~
  // 표시하고 싶을 수도 있다.
  // 만약 그럴거라면 react query 이용하고 있다면,
  if (isPending) return <Skeleton />;

  if (isError) {
    throw new Error('데이터를 불러올 수 없습니다.');
  }

  return (
    <>
      {/* 로딩 중일 때 Skeleton 표시 */}
      {!isPending && activeData.length === 0 && (
        <div className="mt-8 h-[60px] text-center text-gray-500 xl:h-auto">
          검색 결과가 존재하지 않습니다.
        </div>
      )}

      {activeData.length > 0 && <TotalAndSort totalData={totalData} />}
      <div className="mx-[56px] my-0 mb-0 mt-[12px] grid w-full max-w-[448px] grid-cols-2 justify-items-center gap-[8px] xl:mx-[40px] xl:mt-[16px] xl:w-[1200px] xl:max-w-none xl:grid-cols-5 xl:gap-x-[20px] xl:gap-y-[56px]">
        {activeData.length > 0 &&
          activeData.map((result) => {
            const isLiked = likeMap[result.id] || false;
            return (
              <ProductCard
                key={result.id}
                id={result.id}
                name={result.name}
                imageUrl={result.image}
                isLiked={isLiked}
                onToggleLike={() => handleToggleLike(result.id)}
                scenario="search"
              />
            );
          })}

        {/* 무한 스크롤 감지용 */}
        <div ref={observerRef} style={{ height: '1px' }} />
      </div>
    </>
  );
};

export default ResultList;
