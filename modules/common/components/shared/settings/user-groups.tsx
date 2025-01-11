"use client";

import React, { useEffect } from "react";
import { Text } from "@/modules/common/ui/text";
import { Button } from "@/modules/common/ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { toast } from "sonner";
import UserGroupItem from "./user-group-item";
import { GroupItemSkeleton } from "../../desktop/side-bar/group/group";
import useCustomScroll from "@/hooks/use-custom-scroll";
import useUserStore from "@/modules/store/user-store";
import useGroupAction from "@/hooks/use-group-action";
import { capitalize } from "@/lib/helpers/helpers";

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

  // Filter user groups
  const userGroups =
    allGroupsInTable?.filter((group) =>
      group.members.some((member) => member.member_id === user?.id)
    ) || [];

  useEffect(() => {
    refetchAllGroupsInTable();
  }, [refetchAllGroupsInTable]);

  useEffect(() => {
    if (isAllGroupsInTableError) {
      toast.error(allGroupsInTableError?.message || "Failed to fetch groups.");
    }
  }, [isAllGroupsInTableError, allGroupsInTableError]);

  return (
    <div className='flex flex-col space-y-4'>
      <Text variant='p' className='font-medium'>
        Your Groups
      </Text>

      <div className='flex flex-col space-y-2'>
        {isLoadingAllGroupsInTable ? (
          <div className='flex items-center space-x-2 overflow-y-auto'>
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <GroupItemSkeleton key={idx} />
              ))}
          </div>
        ) : userGroups.length > 0 ? (
          <>
            <div className='flex items-center justify-between'>
              <Button
                disabled={!showLeft}
                onClick={scrollLeft}
                variant='ghost'
                size='sm'
                aria-label='Scroll left'>
                <MoveLeft strokeWidth={1.5} size={20} />
              </Button>
              <Button
                disabled={!showRight}
                onClick={scrollRight}
                variant='ghost'
                size='sm'
                aria-label='Scroll right'>
                <MoveRight strokeWidth={1.5} size={20} />
              </Button>
            </div>
            <div
              id='hide-scrollbar'
              ref={scrollRef}
              className='flex items-center space-x-2 overflow-y-auto'>
              {userGroups.map((group, index) => (
                <UserGroupItem
                  key={group.list_id}
                  index={index}
                  id={group.list_id}
                  name={group.label}
                  members={group.members.map((member) => member.member_id)}
                  isAdmin={
                    user?.id === group.creator_id ||
                    group.members.some(
                      (member) =>
                        member.member_id === user?.id &&
                        capitalize(member.role) === "Admin"
                    )
                  }
                />
              ))}
            </div>
          </>
        ) : (
          <Text variant='p' className='text-sm text-muted'>
            You are not a member of any group.
          </Text>
        )}
      </div>
    </div>
  );
}
