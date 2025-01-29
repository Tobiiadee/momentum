import { Calendar } from "@/modules/common/ui/calendar";
import { Text } from "@/modules/common/ui/text";
import useNewTaskStore from "@/modules/store/new-task.store";
import React from "react";
import { taskTimeVariant } from "./new-task-time";
import { motion } from "framer-motion";

export const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export default function NewTaskCalendar() {
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
    <div className='w-full lg:w-80 min-w-80 flex flex-col space-y-2 bg-background rounded-lg'>
      <div className='flex items-center justify-between border-b pb-2 mx-4 mt-3'>
        <Text variant={"p"} className='font-medium '>
          Choose a date for your task
        </Text>
        {!!taskDate && (
          <motion.div
            variants={taskTimeVariant}
            initial='hidden'
            animate='visible'
            className='bg-background px-2 py-1 grid place-items-center rounded-md'>
            <Text variant={"p"} className='text-foreground/60 text-xs'>
              {taskDate}
            </Text>
          </motion.div>
        )}
      </div>
      <Calendar onDayClick={handleDaySelect} />
    </div>
  );
}
