import { create } from "zustand";

interface UserStore {
  user: UserDataType | null;
  setUser: (user: UserDataType) => void;
  isForgotPassword: boolean;
  setIsForgotPassword: (value: boolean) => void;
  userConfirmation: boolean;
  setUserConfirmation: (value: boolean) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isForgotPassword: false,
  setIsForgotPassword: (isForgotPassword) => set({ isForgotPassword }),
  userConfirmation: false,
  setUserConfirmation: (userConfirmation) => set({ userConfirmation }),
}));

export default useUserStore;
