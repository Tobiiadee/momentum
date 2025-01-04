"use client";

import CallLinks from "@/modules/common/components/shared/task-main/call-links";
import NewTaskAvailableList from "@/modules/common/components/shared/task-main/new-task-available-list";
import NewTaskCalendar from "@/modules/common/components/shared/task-main/new-task-calendar";
import NewTaskFile from "@/modules/common/components/shared/task-main/new-task-file";
import NewTaskInputs from "@/modules/common/components/shared/task-main/new-task-inputs";
import NewTaskTime from "@/modules/common/components/shared/task-main/new-task-time";
import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import useNewTaskStore from "@/modules/store/new-task.store";
import React from "react";

export default function Index() {
  const setPreviewTask = useNewTaskStore((state) => state.setPreviewTask);
  const isValid = useNewTaskStore((state) => state.isValid());

  return (
    <div className='pb-20 flex flex-col space-y-4 w-full pr-4 overflow-y-auto'>
      <div className='flex space-x-4'>
        <NewTaskInputs />
        <NewTaskCalendar />
      </div>
      <div className='flex space-x-4'>
        <NewTaskTime />
        <NewTaskAvailableList />
      </div>
      <div className='grid grid-cols-3 gap-4 w-full'>
        <CallLinks />
        <NewTaskFile/>
      </div>
      <div className='w-full flex justify-start'>
        <Button onClick={() => setPreviewTask(true)} disabled={!isValid}>
          <Text variant={"p"}>Preview Task</Text>
        </Button>
      </div>
    </div>
  );
}
