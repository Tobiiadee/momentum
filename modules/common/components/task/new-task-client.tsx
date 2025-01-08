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

export default function NewTaskClient() {
  const isNewTask = useNewTaskStore((state) => state.isNewTask);
  const setIsNewTask = useNewTaskStore((state) => state.setIsNewTask);
  const isDeteleList = useListStore((state) => state.isDeleteList);
  const isDeleteGroup = useGroupStore((state) => state.isDeleteGroup);
  const isAddMember = useGroupStore((state) => state.isAddMember);

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
      </AnimatePresence>
    </>
  );
}
