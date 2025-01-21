import React from "react";
import TaskNotification from "../components/task-notification";

export default function NavTask() {
  return (
    <div className='flex flex-col space-y-2 divide-y px-2 mt-4'>
      {Array.from({ length: 10 }).map((_, index) => (
        <TaskNotification key={index} />
      ))}
    </div>
  );
}
