import React from "react";
import TaskTimeSetterFrom from "./task-time-setter-from";
import TaskTimeSetterUntill from "./task-time-setter-until";
import TimeSetterCustom from "./time-setter-custom";
import useNewTaskStore from "@/modules/store/new-task.store";

export default function TimeSetter() {
  const taskTimeFrom = useNewTaskStore((state) => state.taskTimeFrom);

  return (
    <div className='flex flex-col space-y-2 w-full'>
      {!!taskTimeFrom ? <TaskTimeSetterUntill /> : <TaskTimeSetterFrom />}
      <TimeSetterCustom />
    </div>
  );
}
