"use client";

import React from "react";
import CreateNewTask from "./create-new-task";
import PreviewTaskButton from "../../shared/task-main/preview-task-button";
// import useNewTaskStore from "@/modules/store/new-task.store";
import { usePathname } from "next/navigation";

export default function TaskButtons() {
  // const isTask = useNewTaskStore((state) => state.isTask);

  const pathName = usePathname();
  const hide = React.useMemo(() => pathName === "/dashboard/create-new-task", [pathName]);

  return (
    <div
      className={
        "w-screen flex justify-center items-center backdrop-blur-sm absolute left-1/2 -translate-x-1/2 bottom-0 h-16 z-30"
      }>
      {!hide ? <CreateNewTask /> : <PreviewTaskButton />}
    </div>
  );
}
