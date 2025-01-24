import { create } from 'zustand';

type FilterStore = {
  selectedTypes: string[]; // 선택된 술 타입
  alcoholStrength: [number, number]; // 선택된 도수 값
  tastePreferences: Record<string, number>; // 선택된 맛 카테고리 값 (단맛, 신맛 등)
  triggerFetch: boolean; // API 요청 필터 트리거
  isFiltered: boolean; // 필터 이후 UI 변경
  setSelectedTypes: (types: string[]) => void;
  setAlcoholStrength: (strength: [number, number] | null) => void;
  setTastePreferences: (category: string, level: number) => void;
  resetFilters: () => void; // 초기화 기능
  setTriggerFetch: (trigger: boolean) => void; // 트리거 상태 변경
  setIsFiltered: (value: boolean) => void; // 트리거 상태 변경

  // range 범위 타입
  values: number[] | null;
  setValues: (values: number[]) => void;

  // 삭제 타입
  removeSelectedType: (type: string) => void;
  removeAlcoholStrength: () => void;
  removeTastePreference: (key: string) => void;
};

const useFilterStore = create<FilterStore>((set) => ({
  selectedTypes: [],
  alcoholStrength: [0, 100],
  tastePreferences: {},
  triggerFetch: false,
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
  setTriggerFetch: (trigger) => set({ triggerFetch: trigger }),
  setIsFiltered: (value) => set({ isFiltered: value }),
  // range 범위 함수
  values: [1, 3],
  setValues: (values) => set({ values }),

  // 삭제 함수
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
