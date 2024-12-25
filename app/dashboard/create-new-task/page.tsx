"use client";

import CallLinks from "@/modules/common/components/shared/new-task/call-links";
import NewTaskAvailableList from "@/modules/common/components/shared/new-task/new-task-available-list";
import NewTaskCalendar from "@/modules/common/components/shared/new-task/new-task-calendar";
import NewTaskInputs from "@/modules/common/components/shared/new-task/new-task-inputs";
import NewTaskTime from "@/modules/common/components/shared/new-task/new-task-time";
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
      <div className='flex items-center justify-between'>
        <CallLinks />
      </div>
      <div className='w-full flex justify-start'>
        <Button onClick={() => setPreviewTask(true)} disabled={!isValid}>
          <Text variant={"p"}>Preview Task</Text>
        </Button>
      </div>
    </div>
  );
}
