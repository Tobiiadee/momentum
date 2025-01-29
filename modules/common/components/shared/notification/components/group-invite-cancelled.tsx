import React from "react";
import { motion } from "framer-motion";
import { Text } from "@/modules/common/ui/text";
import { NotificationOptions } from "./group-invite-notification";
import { Separator } from "@/modules/common/ui/separator";
import { slideInVariant } from "./group-invite-user-response-notification";
import { timeAgo } from "@/lib/helpers/format";
import { CircleX } from "lucide-react";

interface GroupInviteCancelledProps {
  index: number;
  created_at: string;
  message: string;
}

export default function GroupInviteCancelled({
  index,
  created_at,
  message,
}: GroupInviteCancelledProps) {
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
          <CircleX size={22} strokeWidth={1.5} />
        </div>

        {/* Content */}
        <div className='flex flex-col -space-y-1 w-full -mt-2'>
          {/* Header */}
          <div className='flex items-center justify-between w-full'>
            <Text variant='p'>Cancelled Invite</Text>
            <div className='flex items-center space-x-2'>
              <Text variant='p' className='text-foreground/60 text-xs'>
                {created_at ? timeAgo(created_at) : "Unknown time"}
              </Text>
              <NotificationOptions />
            </div>
          </div>

          {/* Message */}
          <Text variant='p' className='text-foreground/60 text-xs'>
            {message}
          </Text>
        </div>
      </div>

      {/* Separator */}
      <Separator className='w-full' />
    </motion.div>
  );
}
