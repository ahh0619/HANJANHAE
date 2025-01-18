import { create } from 'zustand';

import { Database } from '@/types/supabase';

type Drink = Database['public']['Tables']['drinks']['Row'];

type ResultStore = {
  results: Drink[]; // 상태관리 할 데이터
  setResults: (newResults: Drink[]) => void; // 데이터 설정
  clearResults: () => void; // 데이터 초기화
};

const useResults = create<ResultStore>((set) => ({
  results: [],
  setResults: (newResults: Drink[]) => set({ results: newResults }),
  clearResults: () => set({ results: [] }),
}));

export default useResults;
