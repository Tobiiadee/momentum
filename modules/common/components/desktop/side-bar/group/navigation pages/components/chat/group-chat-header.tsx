import TaskGroupImg from "@/modules/common/components/task/task-group-img";
import { Separator } from "@/modules/common/ui/separator";
import { Text } from "@/modules/common/ui/text";
import React from "react";

interface GroupChatHeaderProps {
  group_members: AddMemberType[];
  group_title: string;
}

export default function GroupChatHeader({
  group_members,
  group_title,
}: GroupChatHeaderProps) {
  return (
    <div className='absolute top-2 bg-background left-0 flex flex-col space-y-1 z-50 w-full'>
      <div className='flex items-center justify-between px-4'>
        <div className=''>
          <Text className='capitalize font-medium' variant={"h5"}>
            {group_title}
          </Text>
        </div>

        <TaskGroupImg group_members={group_members as AddMemberType[]} />
      </div>
      <Separator className='w-full' />
    </div>
  );
}
