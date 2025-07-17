"use client";

import React, { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
// import { Plus } from "lucide-react";
import useGroupStore from "@/modules/store/group-store";
import useSortArrayStore from "@/modules/store/sort-array-store";
import useUserStore from "@/modules/store/user-store";
import {
  fetchGroup,
  fetchTasksByListId,
  isUserMemberOfGroup,
} from "@/modules/supabase/utils/actions";
// import { Button } from "@/modules/common/ui/button";
import DaySelector from "@/modules/common/components/shared/day-selector";
// import SelectFilter from "@/modules/common/components/shared/select-filter";
import GroupTask from "@/modules/common/components/task/group-task";
import GroupDropdown from "./components/group-dropdown";

export default function TasksGroup() {
  const router = useRouter();
  const { groupId } = useParams();
  const user = useUserStore((state) => state.user);

  //fetch group
  const { data: group, isLoading: isLoadingGroup } = useQuery({
    queryKey: [groupId],
    queryFn: async () => fetchGroup(groupId as string),
  });

  const listId = group?.list_id;

  // Check if user is a member
  const isUserMember = useQuery({
    queryKey: ["is-user-member", groupId],
    queryFn: () => isUserMemberOfGroup(user?.id as string, groupId as string),
  });

  // Redirect if the user is not a member
  useEffect(() => {
    if (!isLoadingGroup && !isUserMember.data) {
      router.replace("/dashboard");
    }
  }, [isLoadingGroup, isUserMember, router]);

  // Fetch tasks
  const {
    data: fetchedTasks,
    isLoading: isLoadingTasks,
    isError: isTasksError,
    error: tasksError,
  } = useQuery({
    queryKey: ["all-tasks", listId],
    queryFn: () => fetchTasksByListId(listId as string),
    enabled: !!listId && !!isUserMember.data,
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
    if (!isLoadingGroup && group) {
      setGroupTitleMembers({
        group_title: group?.label,
        members: group?.members,
      });
    }
  }, [isLoadingGroup, group, setGroupTitleMembers]);

  // Update tasks in the store
  const setSortData = useSortArrayStore((state) => state.setSortData);
  useEffect(() => {
    if (!isLoadingTasks && validTasks) {
      setSortData(validTasks);
    }
  }, [isLoadingTasks, validTasks, setSortData]);

  // Refetch handler (debounced)
  // const handleAddTask = () => {
  //   router.push(`/dashboard/create-new-task`);
  // };

  const sortedTasks = useSortArrayStore((state) => state.sortData);

  return (
    <div className="flex flex-col space-y-4">
      {/* Top controls */}
      <div className="flex justify-end">
        <div className="flex space-x-2 items-center">
          <GroupDropdown />
          <DaySelector />
          {/* <SelectFilter /> */}
        </div>
      </div>

      {/* Group tasks */}
      <div className="flex flex-col space-y-2">
        <GroupTask
          task={sortedTasks || validTasks}
          isError={isTasksError}
          isLoading={isLoadingTasks}
          error={tasksError}
          isGroupLoading={isLoadingTasks || isLoadingGroup}
          group_label={group?.label}
        />
      </div>
    </div>
  );
}
