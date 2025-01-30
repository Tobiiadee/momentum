"use client";

import React from "react";
import useNewTaskStore from "@/modules/store/new-task.store";
import TaskRescheduleCalendar from "./task-reschedule-calendar";
import TaskRescheduleInputs from "../shared/task-reschedule-inputs";
import { Button } from "../../ui/button";

import { UpdateTaskType, useNewTask } from "@/hooks/use-new-task";
import useUserStore from "@/modules/store/user-store";
import { formatTimeIntl } from "@/lib/helpers/format";
import { toast } from "sonner";
import PreviewWithModal from "../shared/preview-with-modal";

export default function TaskReschedule() {
  const setIsReschedule = useNewTaskStore((state) => state.setIsReschedule);
  const taskDate = useNewTaskStore((state) => state.taskDate);
  const taskFrom = useNewTaskStore((state) => state.taskTimeFrom);
  const taskUntil = useNewTaskStore((state) => state.taskTimeUntil);
  const taskId = useNewTaskStore((state) => state.taskId);
  const reset = useNewTaskStore((state) => state.reset);
  // const isReschedule = useNewTaskStore((state) => state.isReschedule);
  const user = useUserStore((state) => state.user);

  const {
    updateTaskMutate,
    isUpdatingTask,
    isUpdateTaskError,
    updateTaskError,
    isUpdateTaskSuccess,
    refetchAllTasks,
  } = useNewTask(user?.id as string);

  const formatTaskTime = () => {
    if (!taskFrom || !taskUntil) return "";
    const timeFrom = formatTimeIntl(taskFrom);
    const timeUntil = formatTimeIntl(taskUntil);
    return `${timeFrom} - ${timeUntil}`;
  };

  const isDisabled = taskFrom === "" || taskUntil === "" || taskDate === "";

  const rescheduleHandler = () => {
    const taskUpdate: Partial<Task> = {
      time_range: formatTaskTime(),
      due_date: taskDate,
    };

    const updateObj: UpdateTaskType = {
      task_id: taskId as string,
      updatedTask: taskUpdate,
    };

    updateTaskMutate(updateObj);
    if (!isUpdatingTask && !isUpdateTaskError) {
      setIsReschedule(false);
      refetchAllTasks();
      reset();
    }
  };

  if (isUpdateTaskError) {
    toast.error(updateTaskError?.message);
  }
  if (isUpdateTaskSuccess) {
    toast.success("Task rescheduled successfully");
  }

  return (
    <PreviewWithModal
      closeModal={() => setIsReschedule(false)}
      width='w-[90vw] lg:w-[30vw]'
      title='Rechedule Task'
      ariaLabel='close rechedule task'>
      <div className='flex flex-col space-y-4'>
        <TaskRescheduleCalendar />
        <TaskRescheduleInputs />
        <div className='w-full'>
          <Button
            disabled={isDisabled}
            isLoading={isUpdatingTask}
            onClick={rescheduleHandler}
            className='w-full'>
            Save
          </Button>
        </div>
      </div>
    </PreviewWithModal>
  );
}
