"use client";

import React, { useCallback } from "react";
// import TaskitemDragPreview from "./task-item-drag-preview";
// import { tasks } from "@/modules/assets/DUMMY_TASK";
import { Accordion } from "../../ui/accordion";
import TaskItem from "../shared/new-task/task-item";
import useUserStore from "@/modules/store/user-store";
import TaskSkeleton from "../../ui/skeleton/task-skeleton";
import { useNewTask } from "@/hooks/use-new-task";
import EmptyTaskModule from "../shared/empty-state/empty-task-module";
import { formatDate } from "@/lib/helpers/format";

export const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

export default function TodaysTask() {
  // const task = tasks;
  const user = useUserStore((state) => state.user);
  const {
    refetchAllTasks,
    isLoadingAllTasks,
    isAllTasksError,
    allTasks,
    allTasksError,
  } = useNewTask(user?.id as string);

  useCallback(() => {
    refetchAllTasks();
  }, [refetchAllTasks]);

  const todaysTask = allTasks?.filter(
    (task) => formatDate(task.due_date) === today
  );

  if (isLoadingAllTasks) {
    return (
      <div className='flex flex-col space-y-4'>
        {Array.from({ length: 5 }).map((_, i) => (
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
        {todaysTask?.map((task, index) => (
          <TaskItem
            key={task.task_id}
            index={index}
            callLink={task.call_link}
            {...task}
          />
        ))}
      </div>
      {todaysTask?.length === 0 && (
        <EmptyTaskModule text="You don't have any tasks today" />
      )}
    </Accordion>
  );
}
