"use client";

import { formatTimeIntl } from "@/lib/helpers/format";
import { Button } from "@/modules/common/ui/button";
import Modal from "@/modules/common/ui/modal";
import { Text } from "@/modules/common/ui/text";
import useNewTaskStore from "@/modules/store/new-task.store";
import { X } from "lucide-react";
import React from "react";
import { motion, Variants } from "framer-motion";

const previewVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export default function PreviewTask() {
  const setPreviewTask = useNewTaskStore((state) => state.setPreviewTask);
  const taskTitle = useNewTaskStore((state) => state.title);
  const taskDescription = useNewTaskStore((state) => state.description);
  const taskDate = useNewTaskStore((state) => state.taskDate);
  const taskFrom = useNewTaskStore((state) => state.taskTimeFrom);
  const taskUntil = useNewTaskStore((state) => state.taskTimeUntil);
  const list = useNewTaskStore((state) => state.list);
  const callLink = useNewTaskStore((state) => state.callLink);

  const handleClosePreview = () => {
    setPreviewTask(false);
  };

  const handleSaveTask = () => {
    setPreviewTask(false);
  };

  const formatTaskTime = () => {
    if (!taskFrom || !taskUntil) return "";
    const timeFrom = formatTimeIntl(taskFrom);
    const timeUntil = formatTimeIntl(taskUntil);
    return `${timeFrom} - ${timeUntil}`;
  };

  return (
    <Modal
      onClick={handleClosePreview}
      className='bg-foreground/30 backdrop-blur-sm'>
      <motion.div
        variants={previewVariant}
        initial='hidden'
        animate='visible'
        exit={"exit"}
        className='absolute left-1/3 -translate-x-1/3 top-[5rem] bg-background w-[40vw] z-50 h-max pb-5 rounded-lg'>
        <div className='w-full flex justify-between items-center border-b py-1 pr-2 pl-4'>
          <Text variant={"p"} className='font-semibold'>
            Preview Task
          </Text>
          <Button
            onClick={handleClosePreview}
            variant={"ghost"}
            size={"sm"}
            className='rounded-full group px-[7px]'>
            <X
              strokeWidth={2}
              size={24}
              className='text-foreground/60 group-hover:text-foreground'
            />
          </Button>
        </div>
        <div className='flex flex-col space-y-6 px-4'>
          <div className='w-full grid grid-cols-2 place-items-center py-2 mt-6'>
            <div className='flex flex-col space-y-2'>
              <Text variant={"p"} className='text-foreground/60 text-xs'>
                Task Name
              </Text>
              <Text variant={"p"} className='font-semibold'>
                {taskTitle}
              </Text>
            </div>
            <div className='flex flex-col space-y-2'>
              <Text variant={"p"} className='text-foreground/60 text-xs'>
                Due Date
              </Text>
              <Text variant={"p"} className='font-semibold'>
                {taskDate}
              </Text>
            </div>
          </div>

          <div className='flex flex-col space-y-2 w-full items-center'>
            <Text variant={"p"} className='text-foreground/60 text-xs'>
              Time
            </Text>
            <Text variant={"p"} className='font-semibold'>
              {formatTaskTime()}
            </Text>
          </div>

          {taskDescription && (
            <div className='w-full flex flex-col space-y-2'>
              <Text
                variant={"p"}
                className='text-foreground/60 text-xs text-center'>
                Description
              </Text>
              <Text variant={"p"} className='text-center'>
                {taskDescription}
              </Text>
            </div>
          )}

          <div className='w-full grid grid-cols-3 place-items-center py-2 gap-4'>
            <div className='flex flex-col space-y-2 col-span-1'>
              <Text variant={"p"} className='text-foreground/60 text-xs'>
                List Category
              </Text>
              <Text variant={"p"} className='font-semibold capitalize'>
                {list}
              </Text>
            </div>
            {!!callLink && (
              <div className='flex flex-col space-y-2 col-span-2'>
                <Text variant={"p"} className='text-foreground/60 text-xs'>
                  Call Link
                </Text>
                <Text variant={"p"} className='font-semibold underline'>
                  {callLink}
                </Text>
              </div>
            )}
          </div>
        </div>

        <div className='w-full px-4 mt-8 flex justify-between'>
          <Button
            onClick={() => setPreviewTask(false)}
            variant={"outline"}
            className=''>
            <Text variant={"p"}>Edit Task</Text>
          </Button>
          <Button onClick={handleSaveTask} className=''>
            <Text variant={"p"}>Save Task</Text>
          </Button>
        </div>
      </motion.div>
    </Modal>
  );
}
