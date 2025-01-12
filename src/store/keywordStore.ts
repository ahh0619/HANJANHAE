import { create } from 'zustand';

type SearchStore = {
  keyword: string; // 검색한 입력 값
  searchTriggerFetch: boolean; // 검색 필터 트리거
  setKeyword: (value: string) => void;
  setSearchTriggerFetch: (trigger: boolean) => void;
};

const useSearchStore = create<SearchStore>((set) => ({
  keyword: '',
  searchTriggerFetch: false,
  setKeyword: (value) => set({ keyword: value }),
  setSearchTriggerFetch: (trigger) => set({ searchTriggerFetch: trigger }),
}));

export default useSearchStore;
