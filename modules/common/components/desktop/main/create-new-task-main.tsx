"use client";

import useNewTaskStore from "@/modules/store/new-task.store";
import React from "react";
import NewTaskInputs from "../../shared/new-task/new-task-inputs";
import NewTaskCalendar from "../../shared/new-task/new-task-calendar";
import NewTaskTime from "../../shared/new-task/new-task-time";
import NewTaskAvailableList from "../../shared/new-task/new-task-available-list";
import CallLinks from "../../shared/new-task/call-links";
import NewTaskFile from "../../shared/new-task/new-task-file";
import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";

export default function CreateNewTaskMain() {
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
        <NewTaskFile />
      </div>
      <div className='w-full flex justify-start'>
        <Button onClick={() => setPreviewTask(true)} disabled={!isValid}>
          <Text variant={"p"}>Preview Task</Text>
        </Button>
      </div>
    </div>
  );
}
