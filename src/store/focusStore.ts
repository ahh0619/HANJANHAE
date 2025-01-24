import { create } from 'zustand';

type FocusStore = {
  isSearchFocus: boolean; // 검색 포커스
  isFilterFocus: boolean; // 필터 포커스
  isSliderClicked: boolean; // 초기화 포커스 range Bar
  setIsSearchFocuse: (value: boolean) => void;
  setIsFilterFocus: (value: boolean) => void;
  setIsSliderClicked:(clicked:boolean) => void;
  resetStates: () => void;
};

const useFocusStore = create<FocusStore>((set) => ({
  isSearchFocus: false,
  isFilterFocus: false,
  isSliderClicked: false, // 초기 상태
  setIsSliderClicked: (clicked: boolean) => set({ isSliderClicked: clicked }), 
  setIsSearchFocuse: (value) => set({ isSearchFocus: value }),
  setIsFilterFocus: (value) => set({ isFilterFocus: value }),
  resetStates: () => set({ isSearchFocus: false, isFilterFocus: false }),
}));

export default useFocusStore;
