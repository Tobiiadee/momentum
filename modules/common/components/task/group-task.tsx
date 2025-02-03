"use client";

import { Accordion } from "../../ui/accordion";
import TaskItem from "../shared/new-task/task-item";
import TaskSkeleton from "../../ui/skeleton/task-skeleton";
import EmptyTaskModule from "../shared/empty-state/empty-task-module";
import { ComponentTaskProps } from "./work-task";

export default function GroupTask({
  task,
  isError,
  isLoading,
  error,
  isGroupLoading,
  group_label,
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
            isLoadingGroup={isGroupLoading}
            {...task}
          />
        ))}
      </div>

      {task?.length === 0 && <EmptyTaskModule module={group_label as string} />}
    </Accordion>
  );
}
