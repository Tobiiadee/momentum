"use client";

import React from "react";
import Modal from "../../ui/modal";
import NewTask from "./new-task";
import useNewTaskStore from "@/modules/store/new-task.store";
import { AnimatePresence } from "framer-motion";

export default function NewTaskClient() {
  const isNewTask = useNewTaskStore((state) => state.isNewTask);
  const setIsNewTask = useNewTaskStore((state) => state.setIsNewTask);

  return (
    <>
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
