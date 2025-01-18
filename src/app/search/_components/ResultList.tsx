'use client';

import ProductCard from '@/components/common/ProductCard';
import useFilterSortedResults from '@/hooks/search/useFilterSortedResults';
import { useIntersectionObserver } from '@/hooks/search/useInterSectionObserver';
import useFilterLikedResults from '@/hooks/search/useLikedResults';
import useSearchSortedResults from '@/hooks/search/useSearchSortedResults';

import { SelectSorted } from './SelectSorted';

const ResultList = ({ user }) => {
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
  console.log('liked', likedTotal);
  console.log('filterSortData', filterSortData);
  console.log('searchSortData', SearchSortData);

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

  return (
    <>
      {/* {(sortSearchIsLoading || sortFilterIsLoading) && <Skeleton />} */}
      {/* 로딩 중일 때 Skeleton 표시 */}
      {sortSearchIsLoading ||
        (sortFilterIsLoading && (
          <div className="text-red-500">
            {sortSearchIsLoading || sortFilterIsLoading}
          </div>
        ))}
      {activeData.length > 0 && (
        <div className="flex w-full items-center justify-between">
          <span>
            {filterSortTotal || searchSortTotal || likedTotal}개의 검색결과가
            있습니다.
          </span>
          <SelectSorted />
        </div>
      )}
      <div className="grid w-full grid-cols-2 justify-items-center gap-[8px]">
        {activeData.length > 0 &&
          activeData.map((result) => (
            <ProductCard
              key={result.id}
              id={result.id}
              name={result.name}
              imageUrl={result.image}
              userId={user ? user.id : null}
              width={'163px'}
              height={'241px'}
              marginBottom={'20px'}
              imgHeight={'207px'}
            />
          ))}

        <div ref={observerRef} style={{ height: '1px' }} />
      </div>
      {!sortSearchIsLoading &&
        !sortFilterIsLoading &&
        activeData.length === 0 && (
          <div className="mt-8 text-center text-gray-500">
            검색 결과가 존재하지 않습니다.
          </div>
        )}
    </>
  );
};

export default ResultList;
