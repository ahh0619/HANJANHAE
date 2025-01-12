import { create } from 'zustand';

import { Database } from '@/types/supabase';

type Drink = Database['public']['Tables']['drinks']['Row'];

type SearchResultStore = {
  results: Drink[]; // 상태관리 할 데이터
  setResults: (newResults: Drink[]) => void; // 데이터 설정
  clearSearchResults: () => void; // 데이터 초기화
};

const useSearchResults = create<SearchResultStore>((set) => ({
  results: [],
  setResults: (newResults: Drink[]) => set({ results: newResults }),
  clearSearchResults: () => set({ results: [] }),
}));

export default useSearchResults;
