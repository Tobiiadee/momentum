"use client";

import React from "react";
import { Text } from "@/modules/common/ui/text";
import GroupNav from "../side-bar/group/group-nav";
import { useParams } from "next/navigation";
import { MessageSquareMore, X } from "lucide-react";
import useGroupStore from "@/modules/store/group-store";
import { AnimatePresence } from "framer-motion";
import GroupChat from "../side-bar/group/navigation pages/components/chat/group-chat";
import useUserStore from "@/modules/store/user-store";
import useGroupAction from "@/hooks/use-group-action";

export default function GroupMain() {
  const { groupId } = useParams();
  const isGroupChat = useGroupStore((state) => state.isGroupChat);

  const decodeGroupId = decodeURIComponent(groupId as string);

  const user = useUserStore((state) => state.user);
  const { allGroupsInTable } = useGroupAction(user?.id as string);

  const selectedGroup = allGroupsInTable?.filter(
    (group) =>
      group.label.toLocaleLowerCase() ===
      (decodeGroupId as string).toLocaleLowerCase()
  );

  // const group_id = selectedGroup?.map((group) => group.list_id)[0];

  const members = selectedGroup?.map((group) => group.members)[0];
  // const creator_id = selectedGroup?.map((group) => group.creator_id)[0];

  const decodeURI = decodeURIComponent(groupId as string);

  return (
    <div className='relative flex flex-col space-y-4 h-max'>
      <div className='flex flex-col space-y-4'>
        <Text variant={"h4"} className='capitalize'>
          {decodeURI}
        </Text>
        <GroupNav />
      </div>
      <GroupChatButton />
      <AnimatePresence mode='wait'>
        {isGroupChat && (
          <GroupChat
            group_title={decodeURI}
            group_members={members as AddMemberType[]}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function GroupChatButton() {
  const setIsGroupChat = useGroupStore((state) => state.setIsGroupChat);
  const isGroupChat = useGroupStore((state) => state.isGroupChat);

  return (
    <div
      role='button'
      onClick={() => setIsGroupChat(!isGroupChat)}
      className='absolute bottom-6 right-6 bg-foreground rounded-full w-12 aspect-square grid place-items-center cursor-pointer'>
      {isGroupChat ? (
        <X strokeWidth={1.5} size={22} className='text-background' />
      ) : (
        <MessageSquareMore
          strokeWidth={1.5}
          size={22}
          className='text-background'
        />
      )}
    </div>
  );
}
