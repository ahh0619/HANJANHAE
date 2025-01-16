import { create } from "zustand";

type SelectSort =  {
  filters: string[];
  sort: string | null;
  setFilters: (filters: string[]) => void;
  setSort: (sort: string | null) => void;
}

const useSelectStore = create<SelectSort>((set) => ({
  filters: [],
  sort: null,
  setFilters: (filters) => set({ filters }),
  setSort: (sort) => set({ sort }),
}));