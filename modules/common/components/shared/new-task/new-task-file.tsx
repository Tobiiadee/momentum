"use client";

import { Text } from "@/modules/common/ui/text";
import React from "react";
import AddFile from "./add-file";
import useNewTaskStore from "@/modules/store/new-task.store";
import MoreFiles, { AddFileButton } from "./more-files";

export default function NewTaskFile() {
  const taskFile = useNewTaskStore((state) => state.taskFile);

  return (
    <div className='lg:col-span-1  w-full bg-background px-4 py-4 rounded-md flex flex-col space-y-4'>
      <div className='flex items-center justify-between border-b pb-1'>
        <Text variant={"p"} className='font-medium '>
          Add a file
        </Text>
        {taskFile?.length > 0 && <AddFileButton />}
      </div>
      {taskFile?.length > 0 ? <MoreFiles /> : <AddFile />}
    </div>
  );
}
