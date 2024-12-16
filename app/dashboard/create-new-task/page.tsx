"use client";

import CallLinks from "@/modules/common/components/shared/new-task/call-links";
import NewTaskAvailableList from "@/modules/common/components/shared/new-task/new-task-available-list";
import NewTaskCalendar from "@/modules/common/components/shared/new-task/new-task-calendar";
import NewTaskInputs from "@/modules/common/components/shared/new-task/new-task-inputs";
import NewTaskTime from "@/modules/common/components/shared/new-task/new-task-time";
import React from "react";

export default function Index() {
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
      <div className="flex items-center justify-between">
        <CallLinks/>
      </div>
    </div>
  );
}
