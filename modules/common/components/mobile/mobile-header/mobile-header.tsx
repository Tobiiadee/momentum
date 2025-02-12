"use client";

import React from "react";
import Logo from "../../shared/logo/logo";
import Notification from "../../desktop/header/notification";
import { Menu } from "lucide-react";
import { Button } from "@/modules/common/ui/button";
import useSidebarStore from "@/modules/store/sidebar-store";
import MobileHeaderSearch from "./mobile-header-search";
import HeaderSearch from "../../desktop/header/header-search";

export default function MobileHeader() {
  return (
    <div className='flex justify-between items-center w-full lg:hidden'>
      <Logo />
      <MobileHeaderSearch />
      <HeaderSearch />
      <div className='flex items-center space-x-2'>
        <Notification />
        <Hamburger />
      </div>
    </div>
  );
}

function Hamburger() {
  const setIsSidebarOpen = useSidebarStore((state) => state.setIsSidebarOpen);

  return (
    <Button
      onClick={() => setIsSidebarOpen(true)}
      variant={"ghost"}
      size={"sm"}
      className='active:scale-80 transition-all'>
      <Menu size={24} strokeWidth={1} className='text-foreground' />
    </Button>
  );
}
