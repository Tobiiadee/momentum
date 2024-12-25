import { create } from "zustand";

interface SortArrayStore {
  sortData: Task[];
  setSortData: (sortData: Task[]) => void;
}

const useSortArrayStore = create<SortArrayStore>((set) => ({
  sortData: [],
  setSortData: (sortData) => set(() => ({ sortData })),
}));

export default useSortArrayStore;
