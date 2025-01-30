"use client";

import useNewTaskStore from "@/modules/store/new-task.store";
import React from "react";
import TaskReschedule from "./task-reschedule";
import { AnimatePresence } from "framer-motion";

export default function TaskRescheduleClient() {
  const isReschedule = useNewTaskStore((state) => state.isReschedule);
  return (
    <div className='relative'>
      <AnimatePresence mode='wait'>
        {isReschedule && <TaskReschedule />}
      </AnimatePresence>
    </div>
  );
}
