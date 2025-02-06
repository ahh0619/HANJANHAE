import { create } from 'zustand';

type FocusStore = {
  isSearchFocus: boolean;
  isFilterFocus: boolean;
  isSliderClicked: boolean;
  setIsSearchFocuse: (value: boolean) => void;
  setIsFilterFocus: (value: boolean) => void;
  setIsSliderClicked: (clicked: boolean) => void;
  resetStates: () => void;
};

const useFocusStore = create<FocusStore>((set) => ({
  isSearchFocus: false,
  isFilterFocus: false,
  isSliderClicked: false,
  setIsSliderClicked: (clicked: boolean) => set({ isSliderClicked: clicked }),
  setIsSearchFocuse: (value) => set({ isSearchFocus: value }),
  setIsFilterFocus: (value) => set({ isFilterFocus: value }),
  resetStates: () => set({ isSearchFocus: false, isFilterFocus: false }),
}));

export default useFocusStore;
