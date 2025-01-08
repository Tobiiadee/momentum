"use client";

import { Button } from "@/modules/common/ui/button";
import useNotificationStore from "@/modules/store/notification-store";
import { BellRing } from "lucide-react";
import React from "react";

export default function Notification() {
  const setIsNotifications = useNotificationStore(
    (state) => state.setIsNotifications
  );

  return (
    <div>
      <Button
        onClick={() => setIsNotifications(true)}
        variant={"ghost"}
        className='relative border border-transparent hover:border-border transition group rounded-full py-1 px-[9px]'>
        <BellRing
          strokeWidth={1.5}
          size={20}
          className='group-active:scale-95 transition-all'
        />

        <div className='absolute bg-red-600 rounded-full top-0.5 right-1 w-2 h-2 z-20' />
      </Button>
    </div>
  );
}
