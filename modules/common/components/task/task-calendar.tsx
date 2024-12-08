import React from "react";
import { Calendar } from "../../ui/calendar";
import useNewTaskStore from "@/modules/store/new-task.store";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function TaskCalendar() {
  const setTaskDate = useNewTaskStore((state) => state.setTaskDate);

  const handleDaySelect = (day: Date | undefined) => {
    const date = new Date(day as Date);
    const dayDate = date.getDate();
    const month = date.getMonth();
    const taskDate = ` ${dayDate} ${months[month]}`;
    setTaskDate(taskDate);
  };

  return (
    <div>
      <Calendar onDayClick={handleDaySelect} className='w-full' />
    </div>
  );
}
