import Header from "@/modules/common/components/desktop/header/header";
import SideBar from "@/modules/common/components/desktop/side-bar/side-bar";
import NewTaskClient from "@/modules/common/components/task/new-task-client";
import Wrapper from "@/modules/common/components/shared/wrapper";
import React from "react";
import TaskButtons from "@/modules/common/components/desktop/main/task-buttons";
import PreviewTaskClient from "@/modules/common/components/shared/new-task/preview-task-client";
// import CreateNewTask from "@/modules/common/components/desktop/main/create-new-task";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative overflow-hidden'>
      <SideBar />
      <TaskButtons />
      <NewTaskClient />
      <PreviewTaskClient />
      <Wrapper className='flex flex-col space-y-5'>
        <Header />
        {children}
      </Wrapper>
    </div>
  );
}
