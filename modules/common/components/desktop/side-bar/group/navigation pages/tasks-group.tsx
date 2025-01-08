"use client";

import useGroupAction from "@/hooks/use-group-action";
import DaySelector from "@/modules/common/components/shared/day-selector";
import SelectFilter from "@/modules/common/components/shared/select-filter";
import GroupTask from "@/modules/common/components/task/group-task";
import useGroupStore from "@/modules/store/group-store";
import useSortArrayStore from "@/modules/store/sort-array-store";
import useUserStore from "@/modules/store/user-store";
import { fetchTasksByListId } from "@/modules/supabase/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function TasksGroup() {
  const user = useUserStore((state) => state.user);

  const { groupId } = useParams();
  const { allGroupsInTable, isLoadingAllGroupsInTable } = useGroupAction(
    user?.id as string
  );

  const userGroup = allGroupsInTable?.find(
    (group) =>
      group.label.toLowerCase() === (groupId as string).toLocaleLowerCase()
  );

  const listId = userGroup?.list_id;

  //Check if user is a member of the group
  const isUserMember = userGroup?.members.some(
    (member) => member.member_id === user?.id
  );

  //fetch task by list_id
  const {
    data: fetchedTasksByListId,
    isLoading: isLoadingFetchedTasksByListId,
    isError: isFetchedTasksErrorByListId,
    error: fetchedTasksErrorByListId,
    refetch: refetchFetchedTasksByListId,
  } = useQuery({
    queryKey: ["tasks-by-list-id", listId],
    queryFn: async () => {
      if (!isUserMember) {
        window.location.replace("/dashboard");
        throw new Error("User is not a member of the group");
      }
      if (!listId) throw new Error("List ID is required");
      return fetchTasksByListId(listId as string);
    },
    enabled: !!listId,
  });

  const setDataOnLoad = useSortArrayStore((state) => state.setSortData);

  const setGroupTitleMembers = useGroupStore(
    (state) => state.setGroupTitleMembers
  );

  const sortedTasks = useSortArrayStore((state) => state.sortData);

  useEffect(() => {
    if (!isLoadingAllGroupsInTable && allGroupsInTable) {
      setGroupTitleMembers({
        group_title: userGroup?.label as string,
        members: userGroup?.members as [],
      });
    }
  }, [
    allGroupsInTable,
    isLoadingAllGroupsInTable,
    setGroupTitleMembers,
    userGroup,
  ]);

  // const group_title = group?.label;
  // const group_members = group?.members;

  useEffect(() => {
    refetchFetchedTasksByListId();
    if (!isLoadingFetchedTasksByListId) {
      setDataOnLoad(fetchedTasksByListId as []);
    }
  }, [isLoadingFetchedTasksByListId, refetchFetchedTasksByListId]);

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex justify-end'>
        <div className='flex space-x-2 items-center'>
          <DaySelector />
          <SelectFilter />
        </div>
      </div>

      {/* TODO: Add group tasks */}
      <div className='flex flex-col space-y-2'>
        <GroupTask
          task={sortedTasks ? sortedTasks : fetchedTasksByListId}
          isError={isFetchedTasksErrorByListId}
          isLoading={isLoadingFetchedTasksByListId}
          error={fetchedTasksErrorByListId}
          isGroupLoading={isLoadingAllGroupsInTable}
        />
      </div>
    </div>
  );
}
