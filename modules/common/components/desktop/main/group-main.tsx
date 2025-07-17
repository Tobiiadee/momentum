"use client";

import React from "react";
import { Text } from "@/modules/common/ui/text";
import GroupNav from "../side-bar/group/group-nav";
import { useParams } from "next/navigation";
// import { MessageSquareMore, X } from "lucide-react";
import useGroupStore from "@/modules/store/group-store";
import { AnimatePresence } from "framer-motion";
import GroupChat from "../side-bar/group/navigation pages/components/chat/group-chat";
import { useQuery } from "@tanstack/react-query";
import { fetchGroup } from "@/modules/supabase/utils/actions";

export default function GroupMain() {
  const { groupId } = useParams();
  const isGroupChat = useGroupStore((state) => state.isGroupChat);

  const { data: group } = useQuery({
    queryKey: [groupId],
    queryFn: async () => fetchGroup(groupId as string),
  });

  return (
  <div className='relative flex flex-col space-y-4 h-max max-h-screen'>
      <div className='flex flex-col space-y-4'>
        <Text variant={"h4"} className='capitalize text-primary'>
          {group?.label}
        </Text>
        <GroupNav />
      </div>
      {/* <GroupChatButton /> */}
      <AnimatePresence mode='wait'>
        {isGroupChat && (
          <GroupChat
            group_title={group?.label as string}
            group_members={group?.members as AddMemberType[]}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// function GroupChatButton() {
//   const setIsGroupChat = useGroupStore((state) => state.setIsGroupChat);
//   const isGroupChat = useGroupStore((state) => state.isGroupChat);

//   return (
//     <div
//       role='button'
//       onClick={() => setIsGroupChat(!isGroupChat)}
//       className='absolute bottom-20 right-6 bg-foreground rounded-full w-12 aspect-square grid place-items-center cursor-pointer'>
//       {isGroupChat ? (
//         <X strokeWidth={1.5} size={22} className='text-background' />
//       ) : (
//         <MessageSquareMore
//           strokeWidth={1.5}
//           size={22}
//           className='text-background'
//         />
//       )}
//     </div>
//   );
// }
