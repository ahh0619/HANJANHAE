import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import useSearchStore from '@/store/keywordStore';
import { filterDrinksByKeyword } from '@/utils/filter/action';

const useSearchResults = () => {
  const { keyword, searchTriggerFetch, setSearchTriggerFetch } =
    useSearchStore();

  const {
    data: SearchData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['SearchDrinks', keyword],
    queryFn: async () => {
      if (keyword === '') {
        return [];
      }
      const filtered = await filterDrinksByKeyword(keyword);
      return filtered;
    },
    enabled: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  // triggerFetch true일 때 refetch 호출
  useEffect(() => {
    if (searchTriggerFetch) {
      refetch(); // enabled false를 이용한 트리거
      setSearchTriggerFetch(false);
    }
  }, [searchTriggerFetch]);

  return {
    SearchData: SearchData || [],
    isLoading,
    isError,
  };
};

export default useSearchResults;
