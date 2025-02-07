import { create } from 'zustand';

type SearchStore = {
  keyword: string;
  searchTriggerFetch: boolean;
  setKeyword: (value: string) => void;
  setSearchTriggerFetch: (trigger: boolean) => void;
  resetSearchStore: () => void;
};

const useSearchStore = create<SearchStore>((set) => ({
  keyword: '',
  searchTriggerFetch: false,
  setKeyword: (value) => set({ keyword: value }),
  setSearchTriggerFetch: (trigger) => set({ searchTriggerFetch: trigger }),
  resetSearchStore: () => set({ keyword: '', searchTriggerFetch: false }),
}));

export default useSearchStore;
