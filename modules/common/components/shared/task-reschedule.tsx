"use client";

import React from "react";
import Modal from "../../ui/modal";
import useNewTaskStore from "@/modules/store/new-task.store";
import TaskRescheduleCalendar from "./task-reschedule-calendar";
import TaskRescheduleInputs from "./task-reschedule-inputs";
import { previewVariant } from "./new-task/preview-task";
import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { Text } from "../../ui/text";
import { X } from "lucide-react";

export default function TaskReschedule() {
  const setIsReschedule = useNewTaskStore((state) => state.setIsReschedule);
  // const isReschedule = useNewTaskStore((state) => state.isReschedule);

  return (
    <Modal onClick={() => setIsReschedule(false)} className="bg-foreground/30 backdrop-blur-sm">
      <motion.div
        variants={previewVariant}
        initial='hidden'
        animate='visible'
        exit={"exit"}
        className='flex flex-col space-y-4 absolute left-1/3 -translate-x-1/3 top-[5rem] bg-background w-[30vw] z-50 h-max pb-5 rounded-lg'>
        <div className='w-full flex justify-between items-center border-b py-1 pr-2 pl-4'>
          <Text variant={"p"} className='font-semibold'>
            Rechedule Task
          </Text>
          <Button
            onClick={() => setIsReschedule(false)}
            variant={"ghost"}
            aria-label='close preview task'
            size={"sm"}
            className='rounded-full group px-[7px]'>
            <X
              strokeWidth={2}
              size={24}
              className='text-foreground/60 group-hover:text-foreground'
            />
          </Button>
        </div>
        <TaskRescheduleCalendar />
        <TaskRescheduleInputs />
      </motion.div>
    </Modal>
  );
}
