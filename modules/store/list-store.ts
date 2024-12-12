import { create } from "zustand";

export type ListType = {
  id: string;
  name: string;
  description?: string;
};

interface ListStoreType {
  isList: boolean;
  setIsList: (isList: boolean) => void;
  lists: ListType[] | null;
  setLists: (list: ListType | ListType[]) => void;
  emoji: string;
  setEmoji: (emoji: string) => void;
  showEmojipicker: boolean;
  setShowEmojipicker: (showEmojipicker: boolean) => void;
  deleteList: (listId: string) => void;
}

export const useListStore = create<ListStoreType>((set) => ({
  isList: false,
  setIsList: (isList) => set({ isList }),

  lists: null,
  setLists: (newItems) =>
    set((state) => ({
      lists: state.lists
        ? [...state.lists, ...(Array.isArray(newItems) ? newItems : [newItems])]
        : Array.isArray(newItems)
        ? newItems
        : [newItems],
    })),
  emoji: "",
  setEmoji: (emoji) => set({ emoji }),
  showEmojipicker: false, 
  setShowEmojipicker: (showEmojipicker) => set({ showEmojipicker }),
  deleteList: (listId) =>
    set((state) => ({
      lists: state.lists?.filter((list) => list.id !== listId) || null,
    })),
}));

export default useListStore;
