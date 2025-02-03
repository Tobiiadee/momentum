"use client";

import { Text } from "@/modules/common/ui/text";
import React, { useEffect } from "react";
import useUserStore from "@/modules/store/user-store";
import useGroupAction from "@/hooks/use-group-action";
import { Skeleton } from "@/modules/common/ui/skeleton";
import { toast } from "sonner";

import GroupItem from "../side-bar/group/group-item";
import EmptyTaskModule from "../../shared/empty-state/empty-task-module";
import { capitalize } from "@/lib/helpers/helpers";

export default function AllGroupsMain() {
  const user = useUserStore((state) => state.user);

  const {
    allGroupsInTable,
    isLoadingAllGroupsInTable,
    isAllGroupsInTableError,
    allGroupsInTableError,
    refetchAllGroupsInTable,
  } = useGroupAction(user?.id as string);

  // Filter groups where the user is a member
  const userGroups = allGroupsInTable?.filter((group) =>
    group.members.some((member) => member.member_id === user?.id)
  );

  useEffect(() => {
    refetchAllGroupsInTable();
  }, [refetchAllGroupsInTable]);

  if (isAllGroupsInTableError) {
    toast.error(allGroupsInTableError?.message);
  }

  return (
    <div className='flex flex-col space-y-4 w-full'>
      <Text variant={"h3"} className=''>
        Group
      </Text>
      {userGroups?.length === 0 && (
        <div className='w-full '>
          <EmptyTaskModule
            height='h-full'
            text="Your haven't created any group yet"
          />
        </div>
      )}

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full'>
        {isLoadingAllGroupsInTable &&
          Array.from({ length: 3 }).map((_, index) => (
            <GroupItemSkeleton key={index} />
          ))}
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
        {userGroups?.map((group, index) => (
          <GroupItem
            key={group.list_id}
            index={index}
            id={group.list_id}
            name={group.label}
            members={group.members.map((member) => member.member_id)}
            isAdmin={
              user?.id === group.creator_id ||
              group?.members.some(
                (member) =>
                  member.member_id === user?.id &&
                  capitalize(member.role) === "Admin"
              )
            }
          />
        ))}
        {isLoadingAllGroupsInTable && <GroupItemSkeleton />}
      </div>
    </div>
  );
}

function GroupItemSkeleton() {
  return <Skeleton className='w-full aspect-square rounded' />;
}
