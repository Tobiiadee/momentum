import Header from "@/modules/common/components/desktop/header/header";
import CreateNewTask from "@/modules/common/components/desktop/main/create-new-task";
import SideBar from "@/modules/common/components/desktop/side-bar/side-bar";
import Wrapper from "@/modules/common/components/shared/wrapper";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative overflow-hidden'>
      <SideBar />
      <CreateNewTask />
      <Wrapper className='flex flex-col space-y-5'>
        <Header />
        {children}
      </Wrapper>
    </div>
  );
}
