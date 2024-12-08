import React, { useState } from "react";
import { Text } from "../../ui/text";
import { motion } from "framer-motion";
import { timeSets, timeVariant } from "./task-time-setter-from";
import useNewTaskStore from "@/modules/store/new-task.store";
import { cn } from "@/lib/utils";

export default function TaskTimeSetterUntill() {
    const [time, setTime] = useState("")
  const setTaskTimeUntil = useNewTaskStore((state) => state.setTaskTimeUntil);

  return (
    <div className='w-full h-full grid grid-cols-4 gap-2'>
      {timeSets.map((timeSet, index) => (
        <motion.div
          onClick={() => {setTaskTimeUntil(timeSet); setTime(timeSet)}}
          variants={timeVariant}
          initial='hidden'
          animate='visible'
          custom={index}
          key={index}
          className={cn(time === timeSet ? "bg-foreground text-background" : "bg-foreground/5 text-foreground hover:bg-foreground/10", 'grid place-items-center px-2 py-1 rounded-xl cursor-pointer')}>
          <Text variant={"p"} className='text-xs'>
            {timeSet}
          </Text>
        </motion.div>
      ))}
    </div>
  );
}
