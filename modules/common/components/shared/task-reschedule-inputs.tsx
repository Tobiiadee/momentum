import React, { useState } from "react";
import { motion } from "framer-motion";
import { inputVariant1, inputVariant2 } from "../task/time-setter-custom";
import useNewTaskStore from "@/modules/store/new-task.store";
import { Text } from "../../ui/text";

export default function TaskRescheduleInputs() {
  const [timeFrom, setTimeFrom] = useState("");
  const [timeUntil, setTimeUntil] = useState("");

  const setTaskTimeFrom = useNewTaskStore((state) => state.setTaskTimeFrom);
  const setTaskTimeUntil = useNewTaskStore((state) => state.setTaskTimeUntil);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeUntil(e.target.value);
    setTaskTimeFrom(timeFrom);
    setTaskTimeUntil(e.target.value);
  };

  return (
    <div className='flex flex-col space-y-2 w-full'>
      <div className='flex space-x-1 items-center'>
        <motion.input
          onChange={(e) => setTimeFrom(e.target.value)}
          variants={inputVariant1}
          type='time'
          value={timeFrom}
          initial='hidden'
          animate='visible'
          placeholder='Custom Hours (from)'
          className='placeholder:text-sm text-sm bg-foreground/5 placeholder:text-foreground/60 px-4 rounded-md h-10 w-full active:border-none border-none outline-none'
        />
        <motion.input
          onChange={(e) => handleTimeChange(e)}
          variants={inputVariant2}
          type='time'
          value={timeUntil}
          disabled={timeFrom === ""}
          initial='hidden'
          animate='visible'
          placeholder='Custom Hours (until)'
          className='placeholder:text-sm text-sm bg-foreground/5 placeholder:text-foreground/60 px-4 rounded-md h-10 w-full active:border-none border-none outline-none'
        />
      </div>
      <div className="w-full px-4">
        <Text variant={"p"} className='text-xs text-foreground/60 text-center'>
          This is a 24-hour clock, so you can set the time from 10:00 to 17:00
          or from 10:00 to 23:59.
        </Text>
      </div>
    </div>
  );
}
