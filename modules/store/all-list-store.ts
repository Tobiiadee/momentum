import { create } from "zustand";
import { list } from "../assets/list";

// Define the union type for the array
type ListArrayType = (ListType | GroupType)[];

interface AllListStore {
  allLists: ListArrayType;
  setAllLists: (allLists: ListArrayType) => void;
  addToList: (item: ListType | GroupType) => void;
  removeFromList: (id: string) => void;
}

const useAllListStore = create<AllListStore>((set) => ({
  allLists: list,
  setAllLists: (allLists) => set(() => ({ allLists })),
  addToList: (item) =>
    set((state) => ({ allLists: [...state.allLists, item] })),
  removeFromList: (id) =>
    set((state) => ({
      allLists: state.allLists.filter((list) => list.id !== id),
    })),
}));

export default useAllListStore;
