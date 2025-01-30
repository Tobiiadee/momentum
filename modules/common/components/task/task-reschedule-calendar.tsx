"use client";

import React from "react";
import { Calendar } from "../../ui/calendar";
import useNewTaskStore from "@/modules/store/new-task.store";
import { months } from "../shared/new-task/new-task-calendar";
import { taskTimeVariant } from "../shared/new-task/new-task-time";
import { Text } from "../../ui/text";
import { motion } from "framer-motion";

export default function TaskRescheduleCalendar() {
  const setTaskDate = useNewTaskStore((state) => state.setTaskDate);
  const taskDate = useNewTaskStore((state) => state.taskDate);

  const handleDaySelect = (day: Date | undefined) => {
    const date = new Date(day as Date);
    const dayDate = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const taskDate = ` ${dayDate} ${months[month]}, ${year}`;
    setTaskDate(taskDate);
  };

  return (
    <div className=''>
      {!!taskDate && (
        <motion.div
          variants={taskTimeVariant}
          initial='hidden'
          animate='visible'
          className='bg-background py-1 grid place-items-center rounded-md'>
          <Text variant={"p"} className='text-foreground/60 text-xs'>
            {taskDate}
          </Text>
        </motion.div>
      )}
      <Calendar onDayClick={handleDaySelect} />
    </div>
  );
}
