import React from "react";
import { Text } from "../../ui/text";
import useNewTaskStore from "@/modules/store/new-task.store";
import { motion, Variants } from "framer-motion";
import { formatTimeIntl } from "@/lib/helpers/format";

const taskDateVariant: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};
const taskTimeVariant: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { delay: 0.2 } },
};

export default function TaskNew() {
  const taskDate = useNewTaskStore((state) => state.taskDate);
  const taskTimeFrom = useNewTaskStore((state) => state.taskTimeFrom);
  const taskTimeUntil = useNewTaskStore((state) => state.taskTimeUntil);

  const formatTaskTime = () => {
    if (!taskTimeFrom || !taskTimeUntil) return "";
    const timeFrom = formatTimeIntl(taskTimeFrom);
    const timeUntil = formatTimeIntl(taskTimeUntil);
    return `${timeFrom} - ${timeUntil}`;
  };

  return (
    <div className='w-full relative flex items-center justify-between bg-foreground/5 px-1.5 rounded-md py-2'>
      <div className='flex items-center space-x-2 w-[36%]'>
        <div className='border bg-foreground/10 w-4 aspect-square rounded'></div>
        <input
          disabled
          placeholder='Create new task'
          className='placeholder:text-sm text-sm placeholder:text-foreground/60 w-full bg-transparent active:border-none border-none outline-none'
        />
      </div>

      <div className='flex items-center space-x-1 overflow-hidden'>
        {!!taskDate && (
          <motion.div
            variants={taskDateVariant}
            initial='hidden'
            animate='visible'
            className='bg-background px-2 py-1 grid place-items-center rounded-md'>
            <Text variant={"p"} className='text-foreground/60 text-xs'>
              {taskDate}
            </Text>
          </motion.div>
        )}
        {!!taskTimeFrom && !!taskTimeUntil && (
          <motion.div
            variants={taskTimeVariant}
            initial='hidden'
            animate='visible'
            className='bg-background px-2 py-1 grid place-items-center rounded-md'>
            <Text variant={"p"} className='text-foreground/60 text-xs'>
              {formatTaskTime()}
            </Text>
          </motion.div>
        )}
      </div>
    </div>
  );
}
