import { timeAgo } from "@/lib/helpers/format";
import { Text } from "@/modules/common/ui/text";
import { MessageCircleReply } from "lucide-react";
import React from "react";
import { NotificationOptions } from "./group-invite-notification";
import { Separator } from "@/modules/common/ui/separator";
import { motion, Variants } from "framer-motion";

export const slideInVariant: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.2 * i,
    },
  }),
};

export type NotificationStatusType = "accepted" | "declined";

interface GroupInviteResponseNotificationProps {
  message?: string;
  group_id?: string;
  created_at?: string;
  status: NotificationStatusType;
  group_label: string;
  index: number;
}

export default function GroupInviteUserResponseNotification({
  created_at,
  status,
  group_label,
  message,
  index,
}: GroupInviteResponseNotificationProps) {
  const messageResponse = () => {
    switch (status) {
      case "accepted":
        return (
          <Text variant='p' className='text-foreground/60 text-xs'>
            You have accepted the invite from{" "}
            <span className='font-semibold'>{group_label}</span>.
          </Text>
        );
      case "declined":
        return (
          <Text variant='p'>
            You have declined the invite from{" "}
            <span className='font-semibold'>{group_label}</span>.
          </Text>
        );

      default:
        return (
          <Text variant='p' className='text-foreground/60 text-xs'>
            You have declined the invite from{" "}
            <span className='font-semibold'>{group_label}</span>.
          </Text>
        );
    }
  };

  const responseMessage =
    message !== "" ? (
      <Text variant='p' className='text-foreground/60 text-xs'>
        {message}
      </Text>
    ) : (
      messageResponse()
    );

  return (
    <motion.div
      variants={slideInVariant}
      initial='hidden'
      animate='visible'
      custom={index}
      exit={"hidden"}
      className='flex flex-col space-y-2'>
      <div className='flex space-x-4 items-center w-full'>
        {/* Icon */}
        <div className='w-10 aspect-square rounded-md bg-foreground/10 grid place-items-center'>
          <MessageCircleReply size={22} strokeWidth={1.5} />
        </div>

        {/* Content */}
        <div className='flex flex-col -space-y-1 w-full -mt-2'>
          {/* Header */}
          <div className='flex items-center justify-between w-full'>
            <Text variant='p'>Invite Response</Text>
            <div className='flex items-center space-x-2'>
              <Text variant='p' className='text-foreground/60 text-xs'>
                {created_at ? timeAgo(created_at) : "Unknown time"}
              </Text>
              <NotificationOptions />
            </div>
          </div>

          {/* Message */}
          {responseMessage}
        </div>
      </div>

      {/* Separator */}
      <Separator className='w-full' />
    </motion.div>
  );
}
