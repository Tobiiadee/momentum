"use client";

import React from "react";
// import TaskitemDragPreview from "./task-item-drag-preview";
import { tasks } from "@/modules/assets/DUMMY_TASK";
import { Accordion } from "../../ui/accordion";
import TaskItem from "./tast-item";



export default function CompletedTask() {
  const task = tasks.filter((task) => task.completed);

  return (
    <Accordion type='single' collapsible className=''>
      <div className='flex flex-col space-y-3'>
        {task.map((task, index) => (
          <TaskItem key={index} index={index} {...task} />
        ))}
      </div>
    </Accordion>
  );
}




