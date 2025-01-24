import { timeAgo } from "@/lib/helpers/format";
import { Text } from "@/modules/common/ui/text";
import { UserCog } from "lucide-react";
import React from "react";
import { NotificationOptions } from "./group-invite-notification";
import { Separator } from "@/modules/common/ui/separator";

interface SendInviteNotificationProps {
  message: string;
  group_id?: string;
  created_at?: string;
  inviteId: string;
}

export default function SendInviteNotification({
  message,
  created_at,
}: SendInviteNotificationProps) {
  //This component will need the user info to be passed in as a prop

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex space-x-4 items-center w-full'>
        <div className='w-10 aspect-square rounded-md bg-foreground/10 grid place-items-center'>
          <UserCog size={22} strokeWidth={1.5} />
        </div>

        <div className='flex flex-col -space-y-1 w-full'>
          <div className='flex items-center justify-between w-full'>
            <Text variant={"p"}>Sent Invite Notification</Text>
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
