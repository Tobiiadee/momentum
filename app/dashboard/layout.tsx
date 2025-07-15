import DashboardHeader from "@/modules/common/components/desktop/header/header";
import SideBar from "@/modules/common/components/desktop/side-bar/side-bar";
import NewTaskClient from "@/modules/common/components/task/new-task-client";
import Wrapper from "@/modules/common/components/shared/wrapper";
import React from "react";
// import TaskButtons from "@/modules/common/components/desktop/main/task-buttons";
// import PreviewTaskClient from "@/modules/common/components/shared/new-task/preview-task-client";
import TaskRescheduleClient from "@/modules/common/components/task/task-reschedule-client";
import EditClient from "@/modules/common/components/shared/settings/edit-client";
import MobileHeader from "@/modules/common/components/mobile/mobile-header/mobile-header";
import CreateAll from "@/modules/common/components/mobile/main/create-all";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Momentum | Dashboard",
  description: "Your Dashboard",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden h-screen min-h-screen">
      <SideBar />

      {/* <TaskButtons /> */}
      <NewTaskClient />
      {/* <PreviewTaskClient /> */}
      <EditClient />
      <TaskRescheduleClient />
      <Wrapper className="flex flex-col space-y-5">
        <DashboardHeader />
        <MobileHeader />
        {children}
      </Wrapper>
      <CreateAll />
    </div>
  );
}
