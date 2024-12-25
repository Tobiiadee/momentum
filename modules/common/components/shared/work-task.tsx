"use client";

import React from "react";
// import TaskitemDragPreview from "./task-item-drag-preview";
import { Accordion } from "../../ui/accordion";
import TaskItem from "./tast-item";

import TaskSkeleton from "../../ui/skeleton/task-skeleton";
import EmptyTaskModule from "./empty-state/empty-task-module";

export interface ComponentTaskProps {
  task: Task[] | undefined;
  isError: boolean;
  isLoading: boolean;
  error: Error | null;
}

export default function WorkTask({
  task,
  isError,
  isLoading,
  error,
}: ComponentTaskProps) {
  if (isLoading) {
    return (
      <div className='flex flex-col space-y-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <TaskSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>{error?.message}</div>;
  }

  return (
    <Accordion type='single' collapsible className=''>
      <div className='flex flex-col space-y-3'>
        {task?.map((task, index) => (
          <TaskItem
            key={task.task_id}
            index={index}
            dueDate={task.due_date}
            timeRange={task.time_range}
            callLink={task.call_link}
            {...task}
          />
        ))}
      </div>

      <div className='grid place-items-center h-[60vh]'>
        {isLoading && task?.length === 0 && <EmptyTaskModule module='work' />}
      </div>
    </Accordion>
  );
}
