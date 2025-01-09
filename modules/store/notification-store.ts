import { create } from "zustand";

interface NotificationStore {
  isNotifications: boolean;
  setIsNotifications: (isNotifications: boolean) => void;
}

const useNotificationStore = create<NotificationStore>()((set) => ({
  isNotifications: false,
  setIsNotifications: (isNotifications: boolean) => set({ isNotifications }),
}));

export default useNotificationStore;
