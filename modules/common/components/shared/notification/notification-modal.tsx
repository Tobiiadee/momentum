"use client";

import Modal from "@/modules/common/ui/modal";
import useNotificationStore from "@/modules/store/notification-store";
import React from "react";
import { motion, Variants } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/modules/common/ui/button";
import { Text } from "@/modules/common/ui/text";
import NotificationNav from "./notification-nav";

const slideInAnim: Variants = {
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  hidden: {
    x: 200,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    x: 500,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function NotificationModal() {
  const setIsNotifications = useNotificationStore(
    (state) => state.setIsNotifications
  );

  return (
    <Modal
      onClick={() => setIsNotifications(false)}
      className='bg-foreground/30'>
      <motion.div
        variants={slideInAnim}
        initial='hidden'
        animate='visible'
        exit={"exit"}
        className='h-[95vh] w-[25rem] min-h-[10rem] bg-background flex flex-col space-y-4 shadow-md absolute right-4 top-4 z-50 pt-0 pb-5 rounded-l-lg'>
        <div className='w-full flex justify-between items-center border-b py-1 pr-2 pl-4'>
          <Text variant={"p"} className='font-semibold capitalize'>
            Notifications
          </Text>
          <Button
            onClick={() => setIsNotifications(false)}
            variant={"ghost"}
            aria-label={"notification close"}
            size={"sm"}
            className='rounded-full group px-[7px]'>
            <X
              strokeWidth={2}
              size={24}
              className='text-foreground/60 group-hover:text-foreground'
            />
          </Button>
        </div>

        <NotificationNav />
      </motion.div>
    </Modal>
  );
}
