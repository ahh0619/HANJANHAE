import { create } from 'zustand';

type FilterStore = {
  selectedTypes: string[];
  alcoholStrength: [number, number];
  tastePreferences: Record<string, number>;
  isFiltered: boolean;
  setSelectedTypes: (types: string[]) => void;
  setAlcoholStrength: (strength: [number, number] | null) => void;
  setTastePreferences: (category: string, level: number) => void;
  resetFilters: () => void;
  setIsFiltered: (value: boolean) => void;

  values: number[] | null;
  setValues: (values: number[]) => void;

  removeSelectedType: (type: string) => void;
  removeAlcoholStrength: () => void;
  removeTastePreference: (key: string) => void;
};

const useFilterStore = create<FilterStore>((set) => ({
  selectedTypes: [],
  alcoholStrength: [0, 100],
  tastePreferences: {},
  isFiltered: false,
  setSelectedTypes: (types) => set({ selectedTypes: types }),
  setAlcoholStrength: (strength) => set({ alcoholStrength: strength }),
  setTastePreferences: (category, level) =>
    set((state) => ({
      tastePreferences: { ...state.tastePreferences, [category]: level },
    })),
  resetFilters: () =>
    set({
      selectedTypes: [],
      alcoholStrength: [0, 100],
      tastePreferences: {},
    }),
  setIsFiltered: (value) => set({ isFiltered: value }),
  values: [1, 3],
  setValues: (values) => set({ values }),

  removeSelectedType: (type: string) =>
    set((state) => ({
      selectedTypes: state.selectedTypes.filter((item) => item !== type),
    })),
  removeAlcoholStrength: () =>
    set(() => ({
      alcoholStrength: [0, 100],
    })),
  removeTastePreference: (key: string) =>
    set((state) => {
      const { [key]: _, ...rest } = state.tastePreferences;
      return { tastePreferences: rest };
    }),
}));

export default useFilterStore;
