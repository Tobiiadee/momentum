"use client";

import React, { useCallback } from "react";
// import TaskitemDragPreview from "./task-item-drag-preview";
import { Accordion } from "../../ui/accordion";
import TaskItem from "../shared/new-task/task-item";
import TaskSkeleton from "../../ui/skeleton/task-skeleton";
import useUserStore from "@/modules/store/user-store";
import EmptyTaskModule from "../shared/empty-state/empty-task-module";
import { useQuery } from "@tanstack/react-query";
import { fetchCompletedTasks } from "@/modules/supabase/utils/actions";

export default function CompletedTask() {
  const user = useUserStore((state) => state.user);

  const {
    data: completedTask,
    refetch: refetchCompletedTasks,
    isLoading: isLoadingCompletedTasks,
    isError: isCompletedTasksError,
    error: completedTasksError,
  } = useQuery({
    queryKey: ["completed-task", user?.id as string],
    queryFn: async () => fetchCompletedTasks(user?.id as string),
  });

  useCallback(() => {
    refetchCompletedTasks();
  }, [refetchCompletedTasks]);

  if (isLoadingCompletedTasks) {
    return <TaskSkeleton />;
  }

  if (isCompletedTasksError) {
    return <div>{completedTasksError?.message}</div>;
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
