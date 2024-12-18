"use client";

import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import useNewTaskStore from "@/modules/store/new-task.store";
import { Plus } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { NewTaskVariant } from "../../desktop/main/create-new-task";

export default function PreviewTaskButton() {
  const setPreviewTask = useNewTaskStore((state) => state.setPreviewTask);
  const isValid = useNewTaskStore((state) => state.isValid());

  return (
    <motion.div
      variants={NewTaskVariant}
      initial='hidden'
      animate='visible'
      className='w-[30%] h-12'>
      <Button
        onClick={() => setPreviewTask(true)}
        disabled={!isValid}
        variant={"ghost"}
        className='w-full h-full flex justify-center rounded-3xl space-x-4 bg-foreground text-background hover:text-background hover:bg-foreground/95 active:bg-foreground/90 transition-all duration-300'>
        <div className='flex items-center space-x-2 '>
          <Plus strokeWidth={2} size={20} />
          <Text variant={"p"} className='font-medium'>
            Preview Task
          </Text>
        </div>
      </Button>
    </motion.div>
  );
}
