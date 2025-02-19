import { create } from 'zustand';

type SearchStore = {
  keyword: string;
  setKeyword: (value: string) => void;

};

const useSearchStore = create<SearchStore>((set) => ({
  keyword: '',
  setKeyword: (value) => set({ keyword: value }),
}));

export default useSearchStore;
