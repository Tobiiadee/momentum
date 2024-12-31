import { create } from "zustand";

interface SettingsStore {
  editMyProfile: boolean;
  setEditMyProfile: (value: boolean) => void;
  editPersonalInfo: boolean;
  setEditPersonalInfo: (value: boolean) => void;
}

const useSettingsStore = create<SettingsStore>((set) => ({
  editMyProfile: false,
  setEditMyProfile: (editMyProfile) => set({ editMyProfile }),
  editPersonalInfo: false,
  setEditPersonalInfo: (editPersonalInfo) => set({ editPersonalInfo }),
}));

export default useSettingsStore;
