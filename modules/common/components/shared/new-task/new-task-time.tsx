import React from "react";
import TimeSetter from "../../task/time-setter";
import { Text } from "@/modules/common/ui/text";
import useNewTaskStore from "@/modules/store/new-task.store";
import { formatTimeIntl } from "@/lib/helpers/format";
import { motion, Variants } from "framer-motion";
import { Button } from "@/modules/common/ui/button";
import { ArrowBigLeft } from "lucide-react";

const taskTimeVariant: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { delay: 0.2 } },
};

export default function NewTaskTime() {
  const taskTimeFrom = useNewTaskStore((state) => state.taskTimeFrom);
  const taskTimeUntil = useNewTaskStore((state) => state.taskTimeUntil);
  const setTaskTimeFrom = useNewTaskStore((state) => state.setTaskTimeFrom);


  const formatTaskTime = () => {
    if (!taskTimeFrom || !taskTimeUntil) return "";
    const timeFrom = formatTimeIntl(taskTimeFrom);
    const timeUntil = formatTimeIntl(taskTimeUntil);
    return `${timeFrom} - ${timeUntil}`;
  };

  return (
    <div className='flex flex-col space-y-4 w-full bg-background py-4 px-4 rounded-lg'>
      <div className='flex justify-between items-center border-b pb-2'>
        <Text variant={"p"} className='font-medium'>
          Set Time
        </Text>
        <div className='flex space-x-2'>
          {!!taskTimeUntil && (
            <Button onClick={() => setTaskTimeFrom("")} variant={"ghost"} size={"icon"} className=''>
              <ArrowBigLeft strokeWidth={1.5} size={16} />
            </Button>
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

      <TimeSetter />
    </div>
  );
}
