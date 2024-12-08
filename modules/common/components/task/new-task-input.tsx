import useNewTaskStore from "@/modules/store/new-task.store";
import React, { useState } from "react";

export default function NewTaskInput() {
  const [taskTitle, setTaskTitle] = useState("");
  const setTitle = useNewTaskStore((state) => state.setTitle);
  const selectedList = useNewTaskStore((state) => state.selectedCategory);

  const elementRef = (element: HTMLInputElement) => {
    if (element && !!selectedList) element.focus();
  };

  const handerTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
    if (!taskTitle) return;
    setTitle(taskTitle);
  }

  return (
    <div
      id={selectedList?.id}
      className='flex items-center space-x-2 w-full bg-foreground/5 px-1.5 rounded-md py-2'>
      <div className='border bg-foreground/10 w-6 p-[2px] aspect-square flex items-center justify-center rounded'>
        {selectedList?.icon}
      </div>
      <input
        ref={elementRef}
        onChange={handerTaskTitle}
        value={taskTitle}
        placeholder='Create new task'
        className='placeholder:text-sm text-sm placeholder:text-foreground/60 w-full bg-transparent active:border-none border-none outline-none'
      />
    </div>
  );
}
