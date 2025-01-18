import { create } from 'zustand';

type FocusStore = {
  isSearchFocus: boolean; // 검색 포커스
  isFilterFocus: boolean; // 필터 포커스
  setIsSearchFocuse: (value: boolean) => void;
  setIsFilterFocus: (value: boolean) => void;
  resetStates: () => void;
};

const useFocusStore = create<FocusStore>((set) => ({
  isSearchFocus: false,
  isFilterFocus: false,
  setIsSearchFocuse: (value) => set({ isSearchFocus: value }),
  setIsFilterFocus: (value) => set({ isFilterFocus: value }),
  resetStates: () => set({ isSearchFocus: false, isFilterFocus: false }),
}));

export default useFocusStore;
