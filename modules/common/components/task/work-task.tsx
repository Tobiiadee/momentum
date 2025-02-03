"use client";

import React from "react";
// import TaskitemDragPreview from "./task-item-drag-preview";
import { Accordion } from "../../ui/accordion";
import TaskItem from "../shared/new-task/task-item";

import TaskSkeleton from "../../ui/skeleton/task-skeleton";
import EmptyTaskModule from "../shared/empty-state/empty-task-module";

export interface ComponentTaskProps {
  task: Task[] | undefined;
  isError: boolean;
  isLoading: boolean;
  error: Error | null;
  group_members?: MemberType[];
  group_title?: string;
  isGroupLoading?: boolean;
  group_label?: string;
}

export default function WorkTask({
  task,
  isError,
  isLoading,
  error,
}: ComponentTaskProps) {
  if (isLoading) {
    return <TaskSkeleton />;
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
            callLink={task.call_link}
            {...task}
          />
        ))}
      </div>

      {task?.length === 0 && <EmptyTaskModule module='work' />}
    </Accordion>
  );
}
