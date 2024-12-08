import React from "react";
import { Text } from "../../ui/text";
import { Minus } from "lucide-react";
import useNewTaskStore from "@/modules/store/new-task.store";
import { Variants, motion } from "framer-motion";

const SelectTaskTimeVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const SelectedTimeVaraint: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

export default function SelectedTaskTime() {
  const taskTimeFrom = useNewTaskStore((state) => state.taskTimeFrom);
  const taskTimeUntil = useNewTaskStore((state) => state.taskTimeUntil);
  const setTaskTimeFrom = useNewTaskStore((state) => state.setTaskTimeFrom);
  const setTaskTimeUntil = useNewTaskStore((state) => state.setTaskTimeUntil);

  return (
    <>
      {!!taskTimeFrom && (
        <motion.div
          variants={SelectTaskTimeVariant}
          initial='hidden'
          animate='visible'
          className='border rounded-2xl flex items-center space-x-2 h-10 p-1'>
          <motion.div
            onClick={() => setTaskTimeFrom("")}
            variants={SelectedTimeVaraint}
            initial='hidden'
            animate='visible'
            className='w-1/2 h-full grid place-items-center bg-foreground/5 rounded-xl cursor-pointer'>
            <Text variant={"p"} className=''>
              {taskTimeFrom}
            </Text>
          </motion.div>
          {!!taskTimeUntil && (
            <motion.div
              variants={SelectedTimeVaraint}
              initial='hidden'
              animate='visible'
              className='flex space-x-2 items-center w-1/2 h-full'>
              <Minus strokeWidth={1.5} size={16} />
              <div
                onClick={() => setTaskTimeUntil("")}
                className='w-full h-full grid place-items-center bg-foreground/5 rounded-xl cursor-pointer'>
                <Text variant={"p"} className=''>
                  {taskTimeUntil}
                </Text>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </>
  );
}
