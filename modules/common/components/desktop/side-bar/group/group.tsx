"use client";

import { Text } from "@/modules/common/ui/text";
import React, { useEffect } from "react";
import GroupItem from "./group-item";
import useUserStore from "@/modules/store/user-store";
import useGroupAction from "@/hooks/use-group-action";
import { Skeleton } from "@/modules/common/ui/skeleton";
import { toast } from "sonner";

export default function Group() {
  // const groups = useGroupStore((state) => state.groups);
  const user = useUserStore((state) => state.user);

  const {
    allGroups,
    isLoadingAllGroups,
    isAllGroupsError,
    allGroupsError,
    refetchGroups,
  } = useGroupAction(user?.id as string);

  useEffect(() => {
    refetchGroups();
  }, [refetchGroups]);

  if (isAllGroupsError) {
    toast.error(allGroupsError?.message);
  }

  return (
    <>
      <div className='grid grid-cols-2 gap-2 w-full'>
        {isLoadingAllGroups &&
          Array.from({ length: 2 }).map((_, index) => (
            <GroupItemSkeleton key={index} />
          ))}
      </div>
      {allGroups && allGroups?.length > 0 && (
        <div className='flex flex-col space-y-4 w-full'>
          <Text variant={"h3"} className=''>
            Group
          </Text>
          <div className='grid grid-cols-2 gap-2 w-full'>
            {allGroups?.map((group) => (
              <GroupItem
                key={group.list_id}
                id={group.list_id}
                name={group.label}
                members={group.members}
              />
            ))}
          </div>

          {/* <CreateNewGroup /> */}
        </div>
      )}
    </>
  );
}

function GroupItemSkeleton() {
  return <Skeleton className='w-full aspect-square rounded' />;
}
