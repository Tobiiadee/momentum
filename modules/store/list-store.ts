import { create } from "zustand";

export type ListType = {
  id: string;
  name: string;
  description?: string;
};

type deleteObj = {
  list_Id: string;
  list_label: string;
};

interface ListStoreType {
  isList: boolean;
  setIsList: (isList: boolean) => void;
  lists: ListType[] | null;
  setLists: (list: ListType | ListType[]) => void;
  svgImage: string;
  setSvgImage: (emoji: string) => void;
  showEmojipicker: boolean;
  setShowEmojipicker: (showEmojipicker: boolean) => void;
  isDeleteList: boolean;
  deleteList: (listId: string) => void;
  setIsDeleteList: (isDeleteList: boolean) => void;
  deleteObject: deleteObj | null;
  setDeleteObject: (listObj: deleteObj) => void;
  reset: () => void;
}

export const useListStore = create<ListStoreType>((set) => ({
  isList: false,
  setIsList: (isList) => set({ isList }),
  isDeleteList: false,
  setIsDeleteList: (isDeleteList) => set({ isDeleteList }),
  lists: null,
  setLists: (newItems) =>
    set((state) => ({
      lists: state.lists
        ? [...state.lists, ...(Array.isArray(newItems) ? newItems : [newItems])]
        : Array.isArray(newItems)
        ? newItems
        : [newItems],
    })),
  svgImage: "",
  setSvgImage: (svgImage) => set({ svgImage }),
  showEmojipicker: false,
  setShowEmojipicker: (showEmojipicker) => set({ showEmojipicker }),
  deleteList: (listId) =>
    set((state) => ({
      lists: state.lists?.filter((list) => list.id !== listId) || null,
    })),
  deleteObject: null,
  setDeleteObject: (listObj) =>
    set((state) => ({
      deleteObject: listObj,
    })),
  reset: () =>
    set({
      isList: false,
      lists: null,
      svgImage: "",
      showEmojipicker: false,
    }),
}));

export default useListStore;
