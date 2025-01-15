'use client';
import { useEffect } from 'react';

import useSearchStore from '@/store/keywordStore';
import useSearchResults from '@/store/searchResultStore';
import { filterDrinksByKeyword } from '@/utils/filter/action';

import { SelectSorted } from './SelectSorted';

const SearchResults = () => {
  const { keyword, searchTriggerFetch, setSearchTriggerFetch } =
    useSearchStore();
  const { results, setResults } = useSearchResults();

  useEffect(() => {
    if (!searchTriggerFetch) return;
    const fetchFilteredResults = async () => {
      const filteredResults = await filterDrinksByKeyword(keyword); // 서버 액션 호출
      setResults(filteredResults);
    };

    fetchFilteredResults();
    setSearchTriggerFetch(false);
  }, [searchTriggerFetch]);
  console.log(results);
  return (
    <div className="p-4">
      {results.length > 0 && (
        <div className="flex w-full items-center justify-between">
          <span>{results.length}개의 검색결과가 있습니다.</span>{' '}
          <SelectSorted />
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        {Array.isArray(results) &&
          results.length > 0 &&
          results.map((result) => (
            <div
              key={result.id}
              className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-md"
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
      </div>
    </div>
  );
};

export default SearchResults;
