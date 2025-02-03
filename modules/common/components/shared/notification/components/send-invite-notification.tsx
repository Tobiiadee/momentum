import { timeAgo } from "@/lib/helpers/format";
import { Text } from "@/modules/common/ui/text";
import { MessageCircleReply } from "lucide-react";
import React from "react";
import { NotificationOptions } from "./group-invite-notification";
import { Separator } from "@/modules/common/ui/separator";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
// import useUserStore from "@/modules/store/user-store";
import { fetchUsersByInviteId } from "@/modules/supabase/utils/actions";
import NameList from "../../name-list";
import { slideInVariant } from "./group-invite-user-response-notification";


export type NotificationStatusType = "accepted" | "declined";

interface GroupInviteResponseNotificationProps {
  message?: string;
  group_id?: string;
  created_at: string;
  status: NotificationStatusType;
  group_label: string;
  index: number;
  invite_id: string;
  sender_id: string;
}

export default function SendInviteNotification({
  created_at,

  group_label,
  //   message,
  index,
  invite_id,
  sender_id,
}: GroupInviteResponseNotificationProps) {
  // const user = useUserStore((state) => state.user);

  //fetch users using invite id
  const { data: recievers } = useQuery({
    queryKey: ["recievers", invite_id],
    queryFn: async () =>
      await fetchUsersByInviteId(invite_id as string, sender_id as string),
    enabled: !!invite_id,
  });

  const recieversList = recievers?.map((user) => user.username);

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
            <Text variant='p'>Sent Invite</Text>
            <div className='flex items-center space-x-2'>
              <Text variant='p' className='text-foreground/60 text-xs'>
                {timeAgo(created_at as string)}
              </Text>
              <NotificationOptions />
            </div>
          </div>

          {/* Message */}
          <div className='flex items-center'>
            <Text variant='p' className='text-foreground/60 text-xs'>
              You sent group invites from {group_label} to {recieversList && <NameList names={recieversList as []} />}
            </Text>
           
          </div>
        </div>
      </div>

      {/* Separator */}
      <Separator className='w-full' />
    </motion.div>
  );
}
