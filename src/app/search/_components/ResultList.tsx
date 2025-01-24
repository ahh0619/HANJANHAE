'use client';
import { useRouter } from 'next/navigation';

import ProductCard from '@/components/common/ProductCard';
import { useMultipleLike } from '@/hooks/like/useMultipleLike';
import useFilterSortedResults from '@/hooks/search/useFilterSortedResults';
import { useIntersectionObserver } from '@/hooks/search/useInterSectionObserver';
import useFilterLikedResults from '@/hooks/search/useLikedResults';
import useSearchSortedResults from '@/hooks/search/useSearchSortedResults';
import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';

import Skeleton from './Skeleton';
import TotalAndSort from './TotalAndSort';

const ResultList = ({ user }) => {
  const router = useRouter();
  const userId = user?.id || '';
  const { isFiltered } = useFilterStore();
  const { isSearchFocus } = useFocusStore();
  const {
    SearchSortData,
    totalCount: searchSortTotal,
    isLoading: sortSearchIsLoading,
    isError: sortSearchIsError,
    fetchNextPage: fetchNextSearchSortPage,
    hasNextPage: hasNextSearchSortPage,
  } = useSearchSortedResults();

  const {
    filterSortData,
    totalCount: filterSortTotal,
    isLoading: sortFilterIsLoading,
    isError: sortFilterIsError,
    fetchNextPage: fetchNextFilterSortPage,
    hasNextPage: hasNextFilterSortPage,
  } = useFilterSortedResults();

  const {
    likedData,
    totalCount: likedTotal,
    isLoading: likeIsLoading,
    isError: likeIsError,
    fetchNextPage: fetchNextLikePage,
    hasNextPage: hasNextLikePage,
  } = useFilterLikedResults();

  const isSearchActive = SearchSortData?.length > 0;
  const isFilterActive = filterSortData?.length > 0;
  const isLikedActive = likedData?.length > 0;

  // 3개 중 우선순위대로 활성 데이터 선택
  const activeData = isSearchActive
    ? SearchSortData
    : isFilterActive
      ? filterSortData
      : isLikedActive
        ? likedData
        : [];

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

  const isLoading = sortSearchIsLoading || sortFilterIsLoading || likeIsLoading;
  const isError = sortSearchIsError || sortFilterIsError || likeIsError;

  const allDrinkIds = activeData.map((item) => item.id);
  const {
    isLoading: likeLoading,
    likeMap,
    toggleItem,
  } = useMultipleLike(userId, allDrinkIds);

  const totalData = filterSortTotal || searchSortTotal || likedTotal;

  // 에러가 났을 때 error.tsx로 안가도 될 수 있다
  // -> 페이지 전체가 error.tsx로 보내는데 별 거 아닌 부분에서는 안가도 된다.
  // 페이지 레이아웃 남겨두고 다른 코드 남겨두고 결과 부분만 잠시 문제가 있습니다~
  // 표시하고 싶을 수도 있다.
  // 만약 그럴거라면 react query 이용하고 있다면,
  if (isError) {
    throw new Error('데이터를 불러올 수 없습니다.');
  }
  return (
    <>
      {/* 로딩 중일 때 Skeleton 표시 */}
      {isLoading && <Skeleton />}
      {!isLoading && activeData.length === 0 && (
        <div className="mt-8 text-center text-gray-500">
          검색 결과가 존재하지 않습니다.
        </div>
      )}

      {activeData.length > 0 && <TotalAndSort totalData={totalData} />}
      <div className="mx-[56px] my-0 grid w-full max-w-[448px] grid-cols-2 justify-items-center gap-[8px]">
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
                onToggleLike={() => toggleItem(result.id)}
                width={'100%'}
                height={'241px'}
                marginBottom={'20px'}
                imgHeight={'207px'}
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
