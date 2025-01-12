import { create } from "zustand";

interface SearchStore {
  search: string;
  setSearch: (search: string) => void;
  isSearch: boolean;
  setIsSearch: (isSearch: boolean) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
  isSearch: false,
  setIsSearch: (isSearch: boolean) => set({ isSearch }),
}));
