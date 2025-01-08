"use client";

import { Text } from "@/modules/common/ui/text";
import React, { useEffect } from "react";
import UserGroupItem from "./user-group-item";
import useCustomScroll from "@/hooks/use-custom-scroll";
import { Button } from "@/modules/common/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import useUserStore from "@/modules/store/user-store";
import useGroupAction from "@/hooks/use-group-action";
import { toast } from "sonner";
import { GroupItemSkeleton } from "../../desktop/side-bar/group/group";

export default function UserGroups() {
  const { scrollLeft, scrollRight, scrollRef, showLeft, showRight } =
    useCustomScroll();

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
    <div className='flex flex-col space-y-4'>
      <Text variant={"p"} className='font-medium'>
        Your Groups
      </Text>
      <div className='flex flex-col space-y-2'>
        <div className='flex items-center'>
          <Button
            disabled={!showLeft}
            onClick={scrollLeft}
            variant={"ghost"}
            size={"sm"}
            className=''>
            <MoveLeft strokeWidth={1.5} size={20} />
          </Button>
          <Button
            disabled={!showRight}
            onClick={scrollRight}
            variant={"ghost"}
            size={"sm"}
            className=''>
            <MoveRight strokeWidth={1.5} size={20} />
          </Button>
        </div>
        <div
          id='hide-scrollbar'
          ref={scrollRef}
          className='flex items-center space-x-2 overflow-y-auto'>
          {userGroups?.map((group, index) => (
            <UserGroupItem
              key={group.list_id}
              index={index}
              id={group.list_id}
              name={group.label}
              members={group.members.map((member) => member.member_id)}
            />
          ))}

          {isLoadingAllGroupsInTable && <GroupItemSkeleton />}
        </div>
      </div>
    </div>
  );
}
