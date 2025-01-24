import { timeAgo } from "@/lib/helpers/format";
import { Text } from "@/modules/common/ui/text";
import { MessageCircleReply } from "lucide-react";
import React from "react";
import { NotificationOptions } from "./group-invite-notification";
import { Separator } from "@/modules/common/ui/separator";

interface GroupInviteResponseNotificationProps {
  message: string;
  group_id?: string;
  created_at?: string;
}

export default function GroupInviteResponseNotification({
  message,
  created_at,
}: GroupInviteResponseNotificationProps) {
  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex space-x-4 items-center w-full'>
        <div className='w-10 aspect-square rounded-md bg-foreground/10 grid place-items-center'>
          <MessageCircleReply size={22} strokeWidth={1.5} />
        </div>

        <div className='flex flex-col -space-y-1 w-full'>
          <div className='flex items-center justify-between w-full'>
            <Text variant={"p"}>Invite Response</Text>
            <div className='flex items-center space-x-2'>
              <Text variant={"p"} className='text-foreground/60 text-xs'>
                {timeAgo(created_at as string)}
              </Text>
              <NotificationOptions />
            </div>
          </div>

          <Text variant={"p"} className='text-foreground/60 text-xs'>
            {message}
          </Text>
        </div>
      </div>

      <Separator className='w-full' />
    </div>
  );
}
