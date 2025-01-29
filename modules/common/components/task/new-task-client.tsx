"use client";

import React from "react";
import Modal from "../../ui/modal";
import NewTask from "./new-task";
import useNewTaskStore from "@/modules/store/new-task.store";
import { AnimatePresence } from "framer-motion";
import useListStore from "@/modules/store/list-store";
import RemoveListModal from "../desktop/side-bar/new list/remove-list-modal";
import NotificationModal from "../shared/notification/notification-modal";
import useNotificationStore from "@/modules/store/notification-store";
import useGroupStore from "@/modules/store/group-store";
import RemoveGroupModal from "../desktop/side-bar/group/remove-group-modal";
import AddMemberModal from "../desktop/side-bar/group/navigation pages/components/add-member-modal";
import { useSearchStore } from "@/modules/store/search-store";
import SearchModal from "../desktop/header/search-modal";
import useUserStore from "@/modules/store/user-store";
import DeleteAccountModal from "../shared/settings/delete-account-modal";
import SideBarMobile from "../mobile/side-bar/side-bar-mobile";
import useSidebarStore from "@/modules/store/sidebar-store";

export default function NewTaskClient() {
  const isNewTask = useNewTaskStore((state) => state.isNewTask);
  const setIsNewTask = useNewTaskStore((state) => state.setIsNewTask);
  const isDeteleList = useListStore((state) => state.isDeleteList);
  const isDeleteGroup = useGroupStore((state) => state.isDeleteGroup);
  const isAddMember = useGroupStore((state) => state.isAddMember);
  const isSearch = useSearchStore((state) => state.isSearch);
  const isDeleteAccount = useUserStore((state) => state.isDeleteAccount);

  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  const isNotifications = useNotificationStore(
    (state) => state.isNotifications
  );

  return (
    <>
      <AnimatePresence mode='wait'>
        {isDeteleList && <RemoveListModal />}
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        {isDeleteGroup && <RemoveGroupModal />}
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        {isNewTask && (
          <Modal onClick={() => setIsNewTask(false)}>
            <NewTask />
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence mode='wait'>
        {isNotifications && <NotificationModal />}
        {isAddMember && <AddMemberModal />}
        {isSearch && <SearchModal />}

        {isSidebarOpen && <SideBarMobile />}

        {isDeleteAccount && <DeleteAccountModal />}
      </AnimatePresence>
    </>
  );
}
