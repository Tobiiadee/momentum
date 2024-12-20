import { create } from "zustand";



interface UserStore {
  user: UserDataType | null;
  setUser: (user: UserDataType) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
