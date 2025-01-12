import { create } from 'zustand';

type FilterStore = {
  selectedTypes: string[]; // 선택된 술 타입
  alcoholStrength: number | null; // 선택된 도수 값
  tastePreferences: Record<string, number>; // 선택된 맛 카테고리 값 (단맛, 신맛 등)
  triggerFetch: boolean; // API 요청 트리거
  setSelectedTypes: (types: string[]) => void;
  setAlcoholStrength: (strength: number) => void;
  setTastePreferences: (category: string, level: number) => void;
  resetFilters: () => void; // 초기화 기능
  setTriggerFetch: (trigger: boolean) => void; // 트리거 상태 변경
};

const useFilterStore = create<FilterStore>((set) => ({
  selectedTypes: [],
  alcoholStrength: null,
  tastePreferences: {},
  triggerFetch: false,
  setSelectedTypes: (types) => set({ selectedTypes: types }),
  setAlcoholStrength: (strength) => set({ alcoholStrength: strength }),
  setTastePreferences: (category, level) =>
    set((state) => ({
      tastePreferences: { ...state.tastePreferences, [category]: level },
    })),
  resetFilters: () =>
    set({
      selectedTypes: [],
      alcoholStrength: null,
      tastePreferences: {},
    }),
  setTriggerFetch: (trigger) => set({ triggerFetch: trigger }),
}));

export default useFilterStore;
