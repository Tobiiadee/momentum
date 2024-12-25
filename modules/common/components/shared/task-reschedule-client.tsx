"use client";

import useNewTaskStore from "@/modules/store/new-task.store";
import React from "react";
import TaskReschedule from "./task-reschedule";

export default function TaskRescheduleClient() {
  const isReschedule = useNewTaskStore((state) => state.isReschedule);
  return <div className='relative'>{isReschedule && <TaskReschedule />}</div>;
}
