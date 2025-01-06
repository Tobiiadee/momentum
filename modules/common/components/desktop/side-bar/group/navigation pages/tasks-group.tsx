"use client";

import { useNewTask } from "@/hooks/use-new-task";
import DaySelector from "@/modules/common/components/shared/day-selector";
import SelectFilter from "@/modules/common/components/shared/select-filter";
import GroupTask from "@/modules/common/components/task/group-task";
import useGroupStore from "@/modules/store/group-store";
import useSortArrayStore from "@/modules/store/sort-array-store";
import useUserStore from "@/modules/store/user-store";
import { fetchGroup } from "@/modules/supabase/utils/actions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function TasksGroup() {
  const user = useUserStore((state) => state.user);
  const { groupId } = useParams();
  const {
    refetchAllTasks,
    isLoadingAllTasks,
    isAllTasksError,
    allTasks,
    allTasksError,
  } = useNewTask(user?.id as string);
  const setDataOnLoad = useSortArrayStore((state) => state.setSortData);
  const setGroupTitleMembers = useGroupStore(
    (state) => state.setGroupTitleMembers
  );

  const sortedTasks = useSortArrayStore((state) => state.sortData);

  const groupTask = allTasks?.filter(
    (task) =>
      task.list_label.toLocaleLowerCase() ===
        (groupId as string).toLocaleLowerCase() && task.type === "group"
  );

  const groupTaskListId = groupTask?.map((task) => task.list_id);
  // console.log(groupTaskListId);

  const groupTaskId = groupTaskListId?.[0] as string;

  const { data: group, isLoading: isLoadingGroup } = useQuery({
    queryKey: ["task-group", groupTaskId],
    queryFn: async () => {
      if (!groupTaskId) return null;
      const result = await fetchGroup(groupTaskId);
      return result;
    },
    enabled: !!groupTaskId, // Only run when groupTaskId exists
  });

  useEffect(() => {
    if (!isLoadingGroup && group) {
      setGroupTitleMembers({
        group_title: group.label as string,
        members: group.members as [],
      });
    }
  }, [group, isLoadingGroup, setGroupTitleMembers]);

  // const group_title = group?.label;
  // const group_members = group?.members;

  useEffect(() => {
    refetchAllTasks();
    if (!isLoadingAllTasks && groupTask) {
      setDataOnLoad(groupTask);
    }
  }, [isLoadingAllTasks]);

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
          task={sortedTasks ? sortedTasks : groupTask}
          isError={isAllTasksError}
          isLoading={isLoadingAllTasks}
          error={allTasksError}
          isGroupLoading={isLoadingGroup}
        />
      </div>
    </div>
  );
}
