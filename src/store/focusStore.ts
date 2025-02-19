import { create } from 'zustand';

type FocusStore = {
  isSearchFocus: boolean;
  isSliderClicked: boolean;
  setIsSearchFocuse: (value: boolean) => void;
  setIsSliderClicked: (clicked: boolean) => void;
};

const useFocusStore = create<FocusStore>((set) => ({
  isSearchFocus: false,
  isSliderClicked: false,
  setIsSliderClicked: (clicked: boolean) => set({ isSliderClicked: clicked }),
  setIsSearchFocuse: (value) => set({ isSearchFocus: value }),
}));

export default useFocusStore;
