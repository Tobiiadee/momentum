import { create } from "zustand";

type SignInDataType = {
  username: string;
  email: string;
  password: string;
};

interface UserStore {
  user: UserDataType | null;
  setUser: (user: UserDataType) => void;
  isForgotPassword: boolean;
  setIsForgotPassword: (value: boolean) => void;
  userConfirmation: boolean;
  setUserConfirmation: (value: boolean) => void;
  signInData: SignInDataType | null;
  setSignInData: (value: SignInDataType) => void;
  isDeleteAccount: boolean;
  setIsDeleteAccount: (value: boolean) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isForgotPassword: false,
  setIsForgotPassword: (isForgotPassword) => set({ isForgotPassword }),
  userConfirmation: false,
  setUserConfirmation: (userConfirmation) => set({ userConfirmation }),
  signInData: null,
  setSignInData: (signInData) => set({ signInData }),
  isDeleteAccount: false,
  setIsDeleteAccount: (isDeleteAccount) => set({ isDeleteAccount }),
}));

export default useUserStore;
