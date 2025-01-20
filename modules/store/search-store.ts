import { create } from "zustand";

interface SearchStore {
  search: string;
  setSearch: (search: string) => void;
  isSearch: boolean;
  setIsSearch: (isSearch: boolean) => void;
  searchResults: SearchReturnType;
  setSearchResults: (searchResults: SearchReturnType) => void;
  isSearchResultsLoading: boolean;
  setIsSearchResultsLoading: (isSearchResultsLoading: boolean) => void;
  isSearchResults: boolean;
  setIsSearchResults: (isSearchResults: boolean) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
  isSearch: false,
  setIsSearch: (isSearch: boolean) => set({ isSearch }),
  searchResults: {
    tasks: [],
    files: [],
    people: [],
  },
  setSearchResults: (searchResults: SearchReturnType) => set({ searchResults }),
  isSearchResultsLoading: false,
  setIsSearchResultsLoading: (isSearchResultsLoading: boolean) =>
    set({ isSearchResultsLoading }),
  isSearchResults: false,
  setIsSearchResults: (isSearchResults: boolean) => set({ isSearchResults }),
}));
