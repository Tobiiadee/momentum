"use client";

import React from "react";
import Modal from "../../ui/modal";
import NewTask from "./new-task";
import useNewTaskStore from "@/modules/store/new-task.store";
import { AnimatePresence } from "framer-motion";
import useListStore from "@/modules/store/list-store";
import RemoveListModal from "../desktop/side-bar/new list/remove-list-modal";

export default function NewTaskClient() {
  const isNewTask = useNewTaskStore((state) => state.isNewTask);
  const setIsNewTask = useNewTaskStore((state) => state.setIsNewTask);
  const isDeteleList = useListStore((state) => state.isDeleteList);

  return (
    <>
      <AnimatePresence mode='wait'>
        {isDeteleList && <RemoveListModal />}
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        {isNewTask && (
          <Modal onClick={() => setIsNewTask(false)}>
            <NewTask />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
