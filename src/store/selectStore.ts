import { create } from 'zustand';

type SortStore = {
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
};

// 변하는 값 alphabetical , liked
const useSortStore = create<SortStore>((set) => ({
  selectedSort: 'alphabetical',
  setSelectedSort: (sort) => set({ selectedSort: sort }),
}));

export default useSortStore;
