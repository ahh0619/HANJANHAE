'use client';

import useFilterResults from '@/hooks/search/useFilterResults';
import { useIntersectionObserver } from '@/hooks/search/useInterSectionObserver';
import useSearchResults from '@/hooks/search/useSearchResults';
import useFilterStore from '@/store/filterStore';
import useFocusStore from '@/store/focusStore';

import { SelectSorted } from './SelectSorted';
import Skeleton from './Skeleton';

const SearchResults = () => {
  const { isFiltered, setIsFiltered } = useFilterStore();
  const { isSearchFocus, setIsSearchFocuse } = useFocusStore();
  const {
    SearchData,
    isLoading,
    isError,
    hasNextPage: hasNextSearchPage,
    fetchNextPage: fetchNextSearchPage,
  } = useSearchResults();
  const {
    filterData,
    isLoading: isLoading2,
    isError: isError2,
    fetchNextPage: fetchNextFilterPage,
    hasNextPage: hasNextFilterPage,
  } = useFilterResults();

  console.log('search', SearchData);
  console.log('filter', filterData);

  // const results = filterData.length > 0 ? filterData : SearchData;
  const isSearchActive = SearchData?.length > 0; // 검색 결과가 있는지 확인
  const activeData = isSearchActive ? SearchData : filterData; // 활성 데이터 선택
  const activeHasNextPage = isSearchActive
    ? hasNextSearchPage
    : hasNextFilterPage; // 활성 hasNextPage
  const activeFetchNextPage = isSearchActive
    ? fetchNextSearchPage
    : fetchNextFilterPage; // 활성 fetchNextPage

  const observerRef = useIntersectionObserver({
    hasNextPage: activeHasNextPage && activeData.length > 0, // 데이터가 있을 때만 동작
    fetchNextPage: activeFetchNextPage,
  });

  // 스켈레톤 깜박이는 문제 발생 -> 해결을 length가 0 일 때 작동안되게
  // 반대로 검색 결과가 없음 뜨고 데이터가 뜸.

  return (
    <div className="p-4">
      {(isLoading || isLoading2) && <Skeleton />}
      {/* 로딩 중일 때 Skeleton 표시 */}
      {isError || (isError2 && <div className="text-red-500">{isError}</div>)}
      {activeData.length > 0 && (
        <div className="flex w-full items-center justify-between">
          <span>{activeData.length}개의 검색결과가 있습니다.</span>
          <SelectSorted />
        </div>
      )}
      <div className="mx-auto grid max-w-screen-lg grid-cols-2 gap-4 px-4">
        {activeData.length > 0 &&
          activeData.map((result) => (
            <div
              key={result.id}
              className="relative w-[160px] rounded-lg border border-gray-200 bg-white p-4 shadow-md"
            >
              <img
                src={result.image || '/placeholder.png'} // 이미지 URL
                alt={result.name}
                className="h-40 w-full rounded-lg object-cover"
              />
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-900">
                  {result.name}
                </h3>
              </div>
              <button
                className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-md"
                aria-label="즐겨찾기"
              >
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="none"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>
          ))}

        <div ref={observerRef} style={{ height: '1px' }} />
      </div>
      {!isLoading && !isLoading2 && activeData.length === 0 && (
        <div className="mt-8 text-center text-gray-500">
          검색 결과가 존재하지 않습니다.
        </div>
      )}
    </div>
  );
};

export default SearchResults;
