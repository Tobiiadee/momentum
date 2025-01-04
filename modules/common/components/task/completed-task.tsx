"use client";

import React, { useCallback } from "react";
// import TaskitemDragPreview from "./task-item-drag-preview";
import { Accordion } from "../../ui/accordion";
import TaskItem from "../shared/task-main/task-item";
import TaskSkeleton from "../../ui/skeleton/task-skeleton";
import { useNewTask } from "@/hooks/use-new-task";
import useUserStore from "@/modules/store/user-store";
import EmptyTaskModule from "../shared/empty-state/empty-task-module";

export default function CompletedTask() {
  const user = useUserStore((state) => state.user);
  const {
    refetchAllTasks,
    isLoadingAllTasks,
    isAllTasksError,
    allTasks,
    allTasksError,
  } = useNewTask(user?.id as string);

  const completedTask = allTasks?.filter((task) => task.completed === true);

  useCallback(() => {
    refetchAllTasks();
  }, []);

  if (isLoadingAllTasks) {
    return (
      <div className='flex flex-col space-y-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <TaskSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isAllTasksError) {
    return <div>{allTasksError?.message}</div>;
  }

  return (
    <Accordion type='single' collapsible className=''>
      <div className='flex flex-col space-y-3'>
        {completedTask?.map((task, index) => (
          <TaskItem key={task.task_id} index={index} {...task} />
        ))}
      </div>

      <div className='grid place-items-center h-[60vh]'>
        {completedTask?.length === 0 && <EmptyTaskModule module='completed' />}
      </div>
    </Accordion>
  );
}
