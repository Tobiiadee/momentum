"use client";

import { Text } from "@/modules/common/ui/text";
import React, { useEffect } from "react";
import GroupItem from "./group-item";
import useUserStore from "@/modules/store/user-store";
import useGroupAction from "@/hooks/use-group-action";
import { Skeleton } from "@/modules/common/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/modules/common/ui/button";
import { useRouter } from "next/navigation";

export default function Group() {
  const router = useRouter();
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
  }, [refetchAllGroupsInTable, userGroups]);

  if (isAllGroupsInTableError) {
    toast.error(allGroupsInTableError?.message);
  }

  return (
    <>
      <div className='grid grid-cols-2 gap-2 w-full'>
        {isLoadingAllGroupsInTable &&
          Array.from({ length: 2 }).map((_, index) => (
            <GroupItemSkeleton key={index} />
          ))}
      </div>
      {userGroups && userGroups.length > 0 && (
        <div className='flex flex-col space-y-4 w-full'>
          <Text variant={"h3"} className=''>
            Group
          </Text>
          <div className='grid grid-cols-2 gap-2 w-full'>
            {userGroups.slice(0, 2)?.map((group, index) => (
              <GroupItem
                key={group.list_id}
                index={index}
                id={group.list_id}
                name={group.label}
                members={group.members.map((member) => member.member_id)}
                isAdmin={group.creator_id === user?.id || group?.members.some((member) => member.role === "Admin")}
              />
            ))}
            {isLoadingAllGroupsInTable && <GroupItemSkeleton />}
          </div>

          {/* <CreateNewGroup /> */}
          {userGroups.length > 2 && (
            <div className='flex justify-end'>
              <Button
                variant={"link"}
                onClick={() => router.push("/dashboard/all-list-group")}>
                <Text variant={"p"} className='text-xs'>
                  View All Groups
                </Text>
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export function GroupItemSkeleton() {
  return <Skeleton className='w-full aspect-square rounded' />;
}
