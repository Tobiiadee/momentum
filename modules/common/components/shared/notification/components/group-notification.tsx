"use client";

import { Text } from "@/modules/common/ui/text";
import { LayoutList, UserCog, Users } from "lucide-react";
import React from "react";
import GroupInviteNotification, {
  NotificationOptions,
} from "./group-invite-notification";
import { Separator } from "@/modules/common/ui/separator";
import useUserStore from "@/modules/store/user-store";
import useNotifications from "@/hooks/use-notification";
import { timeAgo } from "@/lib/helpers/format";

export default function GroupNotification() {
  const user = useUserStore((state) => state.user);

  const notifications = useNotifications(user?.id as string);

  const groupInvites = notifications?.filter(
    (notification) => notification.type === "group_invite"
  );

  const senderNotifications =
  user?.id === notifications?.[0]?.sender_id
    ? notifications?.filter((notification) => notification.type === "sender_notification")
    : [];

  return (
    <div className='flex flex-col space-y-2'>
      {senderNotifications.map((notification, index) => (
        <SendInviteNotification
          created_at={notification.created_at}
          inviteId={notification.invite_id}
          group_id={notification.req_id}
          key={index}
          message={notification.message}
        />
      ))}
      {/* <GetInviteNotification /> */}
      <GroupTaskNotification />
      <MemberAddedNotification />
      {groupInvites.map((notification, index) => (
        <GroupInviteNotification
          created_at={notification.created_at}
          inviteId={notification.invite_id}
          group_id={notification.req_id}
          key={index}
          message={notification.message}
        />
      ))}
    </div>
  );
}

interface SendInviteNotificationProps {
  message: string;
  group_id?: string;
  created_at?: string;
  inviteId: string;
}

export function SendInviteNotification({
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

// function GetInviteNotification() {
//   return (
//     <div className='flex flex-col space-y-2'>
//       <div className='flex space-x-4 items-center w-full'>
//         <div className='w-10 aspect-square rounded-md bg-foreground/10 grid place-items-center'>
//           <UserPlus size={22} strokeWidth={1.5} />
//         </div>

//         <div className='flex flex-col -space-y-1 w-full'>
//           <div className='flex items-center justify-between w-full'>
//             <Text variant={"p"}>Invite Notification</Text>
//             <div className='flex items-center space-x-2'>
//               <Text variant={"p"} className='text-foreground/60 text-xs'>
//                 8hrs ago
//               </Text>
//               <NotificationOptions />
//             </div>
//           </div>

//           <Text variant={"p"} className='text-foreground/60 text-xs'>
//             You got an invite from this user.
//           </Text>
//         </div>
//       </div>

//       <Separator className='w-full' />
//     </div>
//   );
// }

function GroupTaskNotification() {
  //This component will need the group info and the task notification type to be passed in as a prop\
  //Notification type will be either add, remove, update, or complete

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex space-x-4 items-center w-full'>
        <div className='w-10 aspect-square rounded-md bg-foreground/10 grid place-items-center'>
          <LayoutList size={22} strokeWidth={1.5} />
        </div>

        <div className='flex flex-col -space-y-1 w-full'>
          <div className='flex items-center justify-between w-full'>
            <Text variant={"p"}>Group Task</Text>
            <div className='flex items-center space-x-2'>
              <Text variant={"p"} className='text-foreground/60 text-xs'>
                8hrs ago
              </Text>
              <NotificationOptions />
            </div>
          </div>

          <Text variant={"p"} className='text-foreground/60 text-xs'>
            A task has been added to this group
          </Text>
        </div>
      </div>

      <Separator className='w-full' />
    </div>
  );
}

function MemberAddedNotification() {
  //This component will need the group title to be passed as props

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex space-x-4 items-center w-full'>
        <div className='w-10 aspect-square rounded-md bg-foreground/10 grid place-items-center'>
          <Users size={22} strokeWidth={1.5} />
        </div>

        <div className='flex flex-col -space-y-1 w-full'>
          <div className='flex items-center justify-between w-full'>
            <Text variant={"p"}>Group Name</Text>
            <div className='flex items-center space-x-2'>
              <Text variant={"p"} className='text-foreground/60 text-xs'>
                8hrs ago
              </Text>
              <NotificationOptions />
            </div>
          </div>

          <Text variant={"p"} className='text-foreground/60 text-xs'>
            A member was added to this group
          </Text>
        </div>
      </div>

      <Separator className='w-full' />
    </div>
  );
}
