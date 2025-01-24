import CreateNewTaskMain from "@/modules/common/components/desktop/main/create-new-task-main";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Momentum | Create New Task",
  description: "Create a new task.",
};

export default function Index() {
  return (
    <div className='w-full overflow-y-auto'>
      <CreateNewTaskMain />
    </div>
  );
}
