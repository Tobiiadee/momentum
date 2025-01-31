/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Text } from "@/modules/common/ui/text";
import React from "react";
import useGroupAction from "@/hooks/use-group-action";
import useUserStore from "@/modules/store/user-store";
import { useParams } from "next/navigation";
import MembersItem from "./member-item";
import ExitGroupBtn from "./exit-group-btn";
import DeleteGroupBtn from "./delete-group-btn";

export default function MembersItems() {
  const { groupId } = useParams();

  const decodeGroupId = decodeURIComponent(groupId as string);


  const user = useUserStore((state) => state.user);
  const { allGroupsInTable } = useGroupAction(user?.id as string);

  const selectedGroup = allGroupsInTable?.filter(
    (group) =>
      group.label.toLocaleLowerCase() ===
      (decodeGroupId as string).toLocaleLowerCase()
  );

  const group_id = selectedGroup?.map((group) => group.list_id)[0];

  const members = selectedGroup?.map((group) => group.members)[0];
  const creator_id = selectedGroup?.map((group) => group.creator_id)[0];

  const permission = creator_id === user?.id;

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex justify-end'>
        <div className='flex space-x-4 items-center'>
          <ExitGroupBtn group_id={group_id as string} />
          {permission && (
            <DeleteGroupBtn
              creator_id={creator_id as string}
              group_id={group_id as string}
            />
          )}
        </div>
      </div>
      <div className='w-full flex flex-col bg-foreground/10 p-4'>
        <div className='grid grid-cols-5 gap-4'>
          <Text variant={"p"} className='col-span-2 font-semibold'>
            Name
          </Text>
          <Text variant={"p"} className='font-semibold hidden md:block'>
            Date Added
          </Text>
          <Text
            variant={"p"}
            className='uppercase col-span-2 font-semibold'></Text>
        </div>
        <div className='divide-y divide-foreground/10 flex flex-col space-y-4'>
          {members?.map((member) => (
            <MembersItem
              key={member.member_id}
              creator_id={creator_id}
              group_id={group_id}
              {...member}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
