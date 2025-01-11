"use client";

import React, { useEffect, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { RotateCw } from "lucide-react";

import useGroupAction from "@/hooks/use-group-action";
import useGroupStore from "@/modules/store/group-store";
import useSortArrayStore from "@/modules/store/sort-array-store";
import useUserStore from "@/modules/store/user-store";
import { fetchTasksByListId } from "@/modules/supabase/utils/actions";

import { Button } from "@/modules/common/ui/button";
import DaySelector from "@/modules/common/components/shared/day-selector";
import SelectFilter from "@/modules/common/components/shared/select-filter";
import GroupTask from "@/modules/common/components/task/group-task";

import { cn } from "@/lib/utils";

export default function TasksGroup() {
  const router = useRouter();
  const { groupId } = useParams();
  const user = useUserStore((state) => state.user);

  const decodedGroupId = decodeURIComponent(groupId as string);

  // Fetch groups
  const { allGroupsInTable, isLoadingAllGroupsInTable } = useGroupAction(
    user?.id as string
  );

  // Memoize the user group to avoid recalculations
  const userGroup = useMemo(
    () =>
      allGroupsInTable?.find(
        (group) => group.label.toLowerCase() === decodedGroupId.toLowerCase()
      ),
    [allGroupsInTable, decodedGroupId]
  );

  const listId = userGroup?.list_id;

  // Check if user is a member
  const isUserMember = useMemo(
    () => userGroup?.members.some((member) => member.member_id === user?.id),
    [userGroup, user?.id]
  );

  // Redirect if the user is not a member
  useEffect(() => {
    if (!isLoadingAllGroupsInTable && !isUserMember) {
      router.replace("/dashboard");
    }
  }, [isLoadingAllGroupsInTable, isUserMember, router]);

  // Fetch tasks
  const {
    data: fetchedTasks,
    isLoading: isLoadingTasks,
    isError: isTasksError,
    error: tasksError,
    refetch: refetchTasks,
  } = useQuery({
    queryKey: ["all-tasks", listId],
    queryFn: () => fetchTasksByListId(listId as string),
    enabled: !!listId && isUserMember,
  });

  // Filter tasks (memoized)
  const validTasks = useMemo(
    () => fetchedTasks?.filter((task) => !task.is_deleted) || [],
    [fetchedTasks]
  );

  // Update group title and members in the store
  const setGroupTitleMembers = useGroupStore(
    (state) => state.setGroupTitleMembers
  );
  useEffect(() => {
    if (!isLoadingAllGroupsInTable && userGroup) {
      setGroupTitleMembers({
        group_title: userGroup.label,
        members: userGroup.members,
      });
    }
  }, [isLoadingAllGroupsInTable, userGroup, setGroupTitleMembers]);

  // Update tasks in the store
  const setSortData = useSortArrayStore((state) => state.setSortData);
  useEffect(() => {
    if (!isLoadingTasks && validTasks) {
      setSortData(validTasks);
    }
  }, [isLoadingTasks, validTasks, setSortData]);

  // Refetch handler (debounced)
  const handleRefetch = useCallback(() => {
    refetchTasks();
  }, [refetchTasks]);

  const sortedTasks = useSortArrayStore((state) => state.sortData);

  return (
    <div className='flex flex-col space-y-4'>
      {/* Top controls */}
      <div className='flex justify-end'>
        <div className='flex space-x-2 items-center'>
          <Button
            variant='ghost'
            onClick={handleRefetch}
            size='sm'
            className='bg-background hover:bg-background group'>
            <RotateCw
              strokeWidth={1.5}
              size={18}
              className={cn(
                isLoadingTasks && "animate-spin",
                "text-foreground/60 group-hover:text-foreground"
              )}
            />
          </Button>
          <DaySelector />
          <SelectFilter />
        </div>
      </div>

      {/* Group tasks */}
      <div className='flex flex-col space-y-2'>
        <GroupTask
          task={sortedTasks || validTasks}
          isError={isTasksError}
          isLoading={isLoadingTasks}
          error={tasksError}
          isGroupLoading={isLoadingTasks || isLoadingAllGroupsInTable}
        />
      </div>
    </div>
  );
}
