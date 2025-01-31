"use client";

import React from "react";
import Logo from "../../shared/logo/logo";
import Notification from "../../desktop/header/notification";
// import AdminProfile from "../../desktop/header/admin-profile";
import { ArrowRightFromLine } from "lucide-react";
import { Button } from "@/modules/common/ui/button";
import useSidebarStore from "@/modules/store/sidebar-store";
import HeaderSearch from "../../desktop/header/header-search";

export default function MobileHeader() {
  return (
    <div className='flex justify-between items-center w-full lg:hidden'>
      <Logo />
      <HeaderSearch />
      <div className='flex items-center space-x-2'>
        <Notification />
        {/* <AdminProfile /> */}
        <Hamburger />
      </div>
    </div>
  );
}

function Hamburger() {
  //   const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);

  return (
    <Button
      onClick={() => setIsSidebarOpen(true)}
      variant={"ghost"}
      size={"sm"}
      className='rounded border border-transparent active:border-border transition-all'>
      <ArrowRightFromLine size={24} strokeWidth={1.3} />
    </Button>
  );
}
