"use client";

import React from "react";
import { Text } from "@/modules/common/ui/text";
import GroupNav from "../side-bar/group/group-nav";
import { useParams } from "next/navigation";
import { MessageSquareMore } from "lucide-react";

export default function GroupMain() {
  const { groupId } = useParams();

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
    </div>
  );
}

function GroupChatButton() {
  return (
    <div className='absolute bottom-6 right-6 bg-foreground rounded-full w-12 aspect-square grid place-items-center cursor-pointer'>
      <MessageSquareMore strokeWidth={1.5} size={22} className="text-background"/>
    </div>
  );
}
