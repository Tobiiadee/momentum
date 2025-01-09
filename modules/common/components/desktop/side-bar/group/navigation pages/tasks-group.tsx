"use client";

import useGroupAction from "@/hooks/use-group-action";
import { cn } from "@/lib/utils";
import DaySelector from "@/modules/common/components/shared/day-selector";
import SelectFilter from "@/modules/common/components/shared/select-filter";
import GroupTask from "@/modules/common/components/task/group-task";
import { Button } from "@/modules/common/ui/button";
import useGroupStore from "@/modules/store/group-store";
import useSortArrayStore from "@/modules/store/sort-array-store";
import useUserStore from "@/modules/store/user-store";
import { fetchTasksByListId } from "@/modules/supabase/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { RotateCw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function TasksGroup() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const { groupId } = useParams();

  // Fetch all groups and find the current group
  const { allGroupsInTable, isLoadingAllGroupsInTable } = useGroupAction(user?.id as string);
  const userGroup = allGroupsInTable?.find(
    (group) => group.label.toLowerCase() === (groupId as string).toLowerCase()
  );

  const listId = userGroup?.list_id;

  // Check if the user is a member of the group
  const isUserMember = userGroup?.members.some(
    (member) => member.member_id === user?.id
  );

  // Redirect if the user is not a member
  useEffect(() => {
    if (!isLoadingAllGroupsInTable && !isUserMember) {
      router.replace("/dashboard");
    }
  }, [isLoadingAllGroupsInTable, isUserMember, router]);

  // Fetch tasks by list_id
  const {
    data: fetchedTasksByListId,
    isLoading: isLoadingFetchedTasksByListId,
    isError: isFetchedTasksErrorByListId,
    error: fetchedTasksErrorByListId,
    refetch: refetchFetchedTasksByListId,
  } = useQuery({
    queryKey: ["tasks-by-list-id", listId],
    queryFn: async () => {
      if (!listId) throw new Error("List ID is required");
      return fetchTasksByListId(listId as string);
    },
    enabled: !!listId && isUserMember,
  });

  const setDataOnLoad = useSortArrayStore((state) => state.setSortData);
  const setGroupTitleMembers = useGroupStore((state) => state.setGroupTitleMembers);
  const sortedTasks = useSortArrayStore((state) => state.sortData);

  // Set group title and members in the store
  useEffect(() => {
    if (!isLoadingAllGroupsInTable && userGroup) {
      setGroupTitleMembers({
        group_title: userGroup.label,
        members: userGroup.members,
      });
    }
  }, [isLoadingAllGroupsInTable, userGroup, setGroupTitleMembers]);

  // Update tasks in the store when tasks are fetched
  useEffect(() => {
    if (!isLoadingFetchedTasksByListId && fetchedTasksByListId) {
      setDataOnLoad(fetchedTasksByListId);
    }
  }, [isLoadingFetchedTasksByListId, fetchedTasksByListId, setDataOnLoad]);

  return (
    <div className="flex flex-col space-y-4">
      {/* Top controls */}
      <div className="flex justify-end">
        <div className="flex space-x-2 items-center">
          <Button
            variant="ghost"
            onClick={() => refetchFetchedTasksByListId()}
            size="sm"
            className="bg-background hover:bg-background group"
          >
            <RotateCw
              strokeWidth={1.5}
              size={18}
              className={cn(
                isLoadingFetchedTasksByListId && "animate-spin",
                "text-foreground/60 group-hover:text-foreground"
              )}
            />
          </Button>
          <DaySelector />
          <SelectFilter />
        </div>
      </div>

      {/* Group tasks */}
      <div className="flex flex-col space-y-2">
        <GroupTask
          task={sortedTasks || fetchedTasksByListId || []}
          isError={isFetchedTasksErrorByListId}
          isLoading={isLoadingFetchedTasksByListId}
          error={fetchedTasksErrorByListId}
          isGroupLoading={isLoadingAllGroupsInTable}
        />
      </div>
    </div>
  );
}
