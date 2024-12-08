import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import useNewTaskStore from "@/modules/store/new-task.store";

export const inputVariant1: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};
export const inputVariant2: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

export default function TimeSetterCustom() {
  const [timeFrom, setTimeFrom] = useState("");
  const [timeUntil, setTimeUntil] = useState("");

  const setTaskTimeFrom = useNewTaskStore(state => state.setTaskTimeFrom)
  const setTaskTimeUntil = useNewTaskStore(state => state.setTaskTimeUntil)

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeUntil(e.target.value);
    setTaskTimeFrom(timeFrom);
    setTaskTimeUntil(e.target.value);
  }

  return (
    <div className='flex space-x-1 items-center '>
      <motion.input
        onChange={(e) => setTimeFrom(e.target.value)}
        variants={inputVariant1}
        type="time"
        value={timeFrom}
        initial='hidden'
        animate='visible'
        placeholder='Custom Hours (from)'
        className='placeholder:text-sm text-sm bg-foreground/5 placeholder:text-foreground/60 px-4 rounded-md h-10 w-full active:border-none border-none outline-none'
      />
      <motion.input
        onChange={(e) => handleTimeChange(e)}
        variants={inputVariant2}
        type="time"
        value={timeUntil}
        disabled={timeFrom === ""}
        initial='hidden'
        animate='visible'
        placeholder='Custom Hours (until)'
        className='placeholder:text-sm text-sm bg-foreground/5 placeholder:text-foreground/60 px-4 rounded-md h-10 w-full active:border-none border-none outline-none'
      />
    </div>
  );
}
