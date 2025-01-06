"use client";

import React from "react";
import Modal from "../../ui/modal";
import useNewTaskStore from "@/modules/store/new-task.store";
import TaskRescheduleCalendar from "./task-reschedule-calendar";
import TaskRescheduleInputs from "../shared/task-reschedule-inputs";
import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { Text } from "../../ui/text";
import { X } from "lucide-react";
import { UpdateTaskType, useNewTask } from "@/hooks/use-new-task";
import useUserStore from "@/modules/store/user-store";
import { formatTimeIntl } from "@/lib/helpers/format";
import { toast } from "sonner";
import { previewVariant } from "../shared/new-task/preview-task";

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
    <Modal
      onClick={() => setIsReschedule(false)}
      className='bg-foreground/30 backdrop-blur-sm'>
      <motion.div
        variants={previewVariant}
        initial='hidden'
        animate='visible'
        exit={"exit"}
        className='flex flex-col space-y-4 absolute left-1/3 -translate-x-1/3 top-[5rem] bg-background w-[30vw] z-50 h-max pb-5 rounded-lg'>
        <div className='w-full flex justify-between items-center border-b py-1 pr-2 pl-4'>
          <Text variant={"p"} className='font-semibold'>
            Rechedule Task
          </Text>
          <Button
            onClick={() => setIsReschedule(false)}
            variant={"ghost"}
            aria-label='close preview task'
            size={"sm"}
            className='rounded-full group px-[7px]'>
            <X
              strokeWidth={2}
              size={24}
              className='text-foreground/60 group-hover:text-foreground'
            />
          </Button>
        </div>
        <TaskRescheduleCalendar />
        <TaskRescheduleInputs />
        <div className='px-4 w-full'>
          <Button
            disabled={isDisabled}
            isLoading={isUpdatingTask}
            onClick={rescheduleHandler}
            className='w-full'>
            Save
          </Button>
        </div>
      </motion.div>
    </Modal>
  );
}
