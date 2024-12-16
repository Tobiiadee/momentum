import React, { useState } from "react";
import { Text } from "../../ui/text";
import { motion, Variants } from "framer-motion";
import useNewTaskStore from "@/modules/store/new-task.store";
import { cn } from "@/lib/utils";

export const timeVariant: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.02 },
  }),
};

export const timeSets = [
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "24:00",
];

export default function TaskTimeSetterFrom() {
  const [time, setTime] = useState("");
  const setTaskTimeFrom = useNewTaskStore((state) => state.setTaskTimeFrom);

  return (
    <div className="w-full h-full flex flex-col space-y-2">
      <Text variant={"p"} className='font-medium'>
        From:
      </Text>
      <div className='w-full h-full grid grid-cols-4 gap-2'>
        {timeSets.map((timeSet, index) => (
          <motion.div
            onClick={() => {
              setTaskTimeFrom(timeSet);
              setTime(timeSet);
            }}
            variants={timeVariant}
            initial='hidden'
            animate='visible'
            custom={index}
            key={index}
            className={cn(
              time === timeSet
                ? "bg-foreground text-background"
                : "bg-foreground/5 text-foreground hover:bg-foreground/10",
              "grid place-items-center px-2 py-1 rounded-xl cursor-pointer"
            )}>
            <Text variant={"p"} className='text-xs'>
              {timeSet}
            </Text>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
